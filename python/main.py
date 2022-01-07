from typing import Optional

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

import asyncio
from bleak import discover
from bleak import BleakClient

from pycycling.cycling_speed_cadence_service import CyclingSpeedCadenceService
from pycycling.tacx_trainer_control import TacxTrainerControl

import json

app = FastAPI()

origins = [
    "https://members.onepeloton.com",
    "http://localhost",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class BluetoothDevice:
    def __init__(self, name, address):
        self.name = name
        self.address = address


class SensorResponse:
    def __init__(self, cwr, lwet, cr, et):
        self.cumulative_wheel_revs = cwr
        self.last_wheel_event_time = lwet
        self.cumulative_crank_revs = cr
        self.last_crank_event_time = et


class SetResistanceResponse:
    # I'm sure there's better syntax for this, but I don't know python
    def __init__(self, a, b, c, d, e, f, g, h, i , j, k):
        self.update_event_count = a
        self.instantaneous_cadence = b
        self.accumulated_power = c
        self.instantaneous_power = d
        self.trainer_status = e
        self.target_power_limits = f
        self.fe_state = g
        self.lap_toggle = h
        self.power_calibration_required = i
        self.resistance_calibration_required = j
        self.user_configuration_required = k


class BicycleSensorResponse:
    cadenceResponse = None
    feResponse = None
    trainerResponse = None
    def cadenceHandler(self, data):
        ## TODO: if this data is to be actually useful
        ## this class needs to accumulate data over time
        ## and do some time based math to derive speed and
        ## cadence
        ## RPM is probably (rev2 - rev1)/(t2 - t1)
        ## Speed probably needs wheel size -- something like
        ## ((cwr2 - cwr1) * rollout)/(t2 - t1) where rollout
        ## needs to be defined by user input (or default to 700x23?)
        print('cadence handler --')
        print(data)
        self.cadenceResponse = data
    def feHandler(self, data):
        print('fe handler --')
        print(data)
        self.feResponse = data
    def trainerHandler(self, data):
        print('trainer handler --')
        print(data)
        self.trainerHandler = data


async def readSpeedCadence(address):
    async with BleakClient(address) as client:
        responseHandler = BicycleSensorResponse()
        await client.is_connected()
        trainer = CyclingSpeedCadenceService(client)
        trainer.set_csc_measurement_handler(responseHandler.cadenceHandler)
        await trainer.enable_csc_measurement_notifications()
        await asyncio.sleep(5.0)
        await trainer.disable_csc_measurement_notifications()
        return responseHandler.lastResponse

# TODO: create a method that can do this by setting power instead of basic reistance
async def setTrainerResistance(address, resistance):
    async with BleakClient(address) as client:
        responseHandler = BicycleSensorResponse()
        await client.is_connected()
        trainer = TacxTrainerControl(client)
        # r = (resistance / 100) * 300
        # await trainer.set_target_power(r)
        # return []
        trainer.set_specific_trainer_data_page_handler(responseHandler.trainerHandler)
        trainer.set_general_fe_data_page_handler(responseHandler.feHandler)
        await trainer.enable_fec_notifications()
        await trainer.set_basic_resistance(resistance)
        await asyncio.sleep(5.0)
        await trainer.disable_fec_notifications()
        return responseHandler.trainerHandler
        

@app.get("/discover")
async def read_root():  
    devices = await discover()
    foundDevices = [];
    print(devices)
    for d in devices:
        bTDev = BluetoothDevice(d.name, d.address)
        foundDevices.append(bTDev)
    return foundDevices


@app.get("/sensor/speedAndCadence/{bluetoothAddress}")
async def read_item(bluetoothAddress: str):
    # loop = asyncio.get_event_loop()
    # loop.run_until_complete(readSpeedCadence(bluetoothAddress))
    try:
        bluetoothResponse = await readSpeedCadence(bluetoothAddress)
        print(bluetoothResponse)
        apiResponse = SensorResponse(*bluetoothResponse)
        print(apiResponse)
        return apiResponse
    except Exception as e:
        ## TODO: fix me, should return 4xx or 5xx status code
        #return 'failed to get speed and cadence data'
        return e


@app.post("/trainer/{bluetoothAddress}/resistance/{resistance}")
async def read_item(bluetoothAddress: str, resistance: int):
    print("setting trainer " + bluetoothAddress + " to " + str(resistance))
    try:
        bluetoothResponse = await setTrainerResistance(bluetoothAddress, resistance)
        apiResponse = SetResistanceResponse(*bluetoothResponse)
        print('resistance api response')
        print(apiResponse)
        return apiResponse
    except Exception as e:
        ## TODO: fix me, should return 4xx or 5xx status code
        #return 'failed to get speed and cadence data'
        return e

# TO RUN: uvicorn main:app --reload
