from pydantic import BaseModel;
from typing import Optional

class OrdenServicio(BaseModel):
    placa_vehiculo: str
    descripcion_falla: str
    costo_estimado: float
    reparado: bool = False

class UpdateOrdenServicio(BaseModel):
    placa_vehiculo: Optional[str] = None
    descripcion_falla: Optional[str] = None
    costo_estimado: Optional[float] = None
    reparado: Optional[bool] = None