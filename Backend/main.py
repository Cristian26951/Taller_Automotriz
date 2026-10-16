from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from decouple import config
from router.ordenes import router as ordenes_router

app = FastAPI(title="API Taller Automotriz")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[config("FRONTEND_URL")],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(ordenes_router)

@app.get("/")
def inicio():
    return {"mensaje": "API Taller Automotriz funcionando"}