from typing import Optional

from fastapi import FastAPI

import asyncio
from bleak import discover
from bleak import BleakClient

from pycycling.cycling_speed_cadence_service import CyclingSpeedCadenceService

import json

app = FastAPI()

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


class BicycleSensorResponse:
    lastResponse = None
    def pageHandler(self, data):
        ## TODO: if this data is to be actually useful
        ## this class needs to accumulate data over time
        ## and do some time based math to derive speed and
        ## cadence
        ## RPM is probably (rev2 - rev1)/(t2 - t1)
        ## Speed probably needs wheel size -- something like
        ## ((cwr2 - cwr1) * rollout)/(t2 - t1) where rollout
        ## needs to be defined by user input (or default to 700x23?)
        print(data)
        self.lastResponse = data


async def readSpeedCadence(address):
    async with BleakClient(address) as client:
        responseHandler = BicycleSensorResponse()
        await client.is_connected()
        trainer = CyclingSpeedCadenceService(client)
        trainer.set_csc_measurement_handler(responseHandler.pageHandler)
        await trainer.enable_csc_measurement_notifications()
        await asyncio.sleep(5.0)
        await trainer.disable_csc_measurement_notifications()
        return responseHandler.lastResponse


@app.get("/")
def read_root():
    return {"Hello": "World"}


# @app.get("/items/{item_id}")
# def read_item(item_id: int, q: Optional[str] = None):
#     return {"item_id": item_id, "q": q}


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
        apiResponse = SensorResponse(bluetoothResponse[0], bluetoothResponse[1], bluetoothResponse[2], bluetoothResponse[3])
        print(apiResponse)
        return apiResponse
    except Exception as e:
        ## TODO: fix me, should return 4xx or 5xx status code
        #return 'failed to get speed and cadence data'
        return e

# TO RUN: uvicorn main:app --reload
