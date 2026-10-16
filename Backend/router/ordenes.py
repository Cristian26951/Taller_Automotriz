from fastapi import APIRouter, HTTPException
from models import OrdenServicio, UpdateOrdenServicio
from database import (obtener_ordenes, obtener_orden, obtener_por_placa, crear_orden, actualizar_orden, eliminar_orden)

router = APIRouter(prefix="/api/ordenes", tags=["Órdenes de Servicio"])

@router.get("")
async def listar():
    return await obtener_ordenes()

@router.get("/{id}")
async def detalle(id: str):
    orden = await obtener_orden(id)
    if not orden:
        raise HTTPException(404, "Orden no encontrada")
    return orden

@router.post("")
async def crear(orden: OrdenServicio):
    if await obtener_por_placa(orden.placa_vehiculo):
        raise HTTPException(400, "Ya existe una orden para esa placa")
    return await crear_orden(orden.model_dump())

@router.put("/{id}")
async def actualizar(id: str, datos: UpdateOrdenServicio):
    if not await obtener_orden(id):
        raise HTTPException(404, "Orden no encontrada")
    cambios = {k: v for k, v in datos.model_dump().items() if v is not None}
    return await actualizar_orden(id, cambios)

@router.delete("/{id}")
async def eliminar(id: str):
    if not await eliminar_orden(id):
        raise HTTPException(404, "Orden no encontrada")
    return {"mensaje": "Orden eliminada correctamente"}