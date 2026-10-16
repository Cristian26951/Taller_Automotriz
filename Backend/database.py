from motor.motor_asyncio import AsyncIOMotorClient
from decouple import config
from bson import ObjectId

client = AsyncIOMotorClient(config("MONGO_URL"))
db = client.taller_db
coleccion = db.ordenes

def serializar(o) -> dict:
    return {
        "id": str(o["_id"]),
        "placa_vehiculo": o["placa_vehiculo"],
        "descripcion_falla": o["descripcion_falla"],
        "costo_estimado": o["costo_estimado"],
        "reparado": o["reparado"],
    }

async def obtener_ordenes():
    return [serializar(o) async for o in coleccion.find()]

async def obtener_orden(id: str):
    if not ObjectId.is_valid(id):
        return None
    o = await coleccion.find_one({"_id": ObjectId(id)})
    return serializar(o) if o else None

async def obtener_por_placa(placa: str):
    return await coleccion.find_one({"placa_vehiculo": placa})

async def crear_orden(datos: dict):
    r = await coleccion.insert_one(datos)
    return await obtener_orden(str(r.inserted_id))

async def actualizar_orden(id: str, datos: dict):
    if not ObjectId.is_valid(id):
        return None
    await coleccion.update_one({"_id": ObjectId(id)}, {"$set": datos})
    return await obtener_orden(id)

async def eliminar_orden(id: str):
    if not ObjectId.is_valid(id):
        return False
    r = await coleccion.delete_one({"_id": ObjectId(id)})
    return r.deleted_count == 1