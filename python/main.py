from typing import Optional

from fastapi import FastAPI

import asyncio
from bleak import discover

import json

app = FastAPI()

class BluetoothDevice:
    def __init__(self, name, address):
        self.name = name
        self.address = address


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/items/{item_id}")
def read_item(item_id: int, q: Optional[str] = None):
    return {"item_id": item_id, "q": q}


@app.get("/discover")
async def read_root():
    devices = await discover()
    devs = [];
    print(devices)
    for d in devices:
        bd = BluetoothDevice(d.name, d.address)
        devs.append(bd)
    return devs