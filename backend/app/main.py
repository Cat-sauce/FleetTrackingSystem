from app.services.replay_engine import engine
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.events import router as events_router
from app.api.vehicles import router as vehicle_router
from app.api.analytics import router as analytics_router
from app.api.health import router as health_router
#imports all the functions in one place and renders them for FastAPI
app = FastAPI()

origins = [
    "http://localhost:5173",
    "https://fleet-tracking-system-lyart.vercel.app",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def startup():

    engine.start()
app.include_router(events_router)
app.include_router(health_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(vehicle_router)
app.include_router(analytics_router)

@app.get("/")
def home():
    return {"status":"Backend Running"}
