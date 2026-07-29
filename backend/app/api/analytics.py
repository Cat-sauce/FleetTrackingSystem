from fastapi import APIRouter
import traceback
from app.services.data_loader import load_data
from app.services.replay_engine import engine
from app.utils.metrics import fleet_metrics

router = APIRouter()
FULL_DATA = load_data()

STABLE_METRICS = fleet_metrics(FULL_DATA)
print("analytics.py loaded")
@router.get("/analytics/overview")  #FastAPI end points, Get requests
def overview():

    try:

        current = engine.get_current_frame()

        live = fleet_metrics(current)
        live["driver_ratings"] = STABLE_METRICS["driver_ratings"]
        live["vehicle_health"] = STABLE_METRICS["vehicle_health"]
        live["top_fuel_consumers"] = STABLE_METRICS["top_fuel_consumers"]
        live["fault_prone_vehicles"] = STABLE_METRICS["fault_prone_vehicles"]

        return live

    except Exception:

        traceback.print_exc()

        raise

@router.get("/analytics/dashboard")
def dashboard():
    print("Dashboard endpoint called")
    current = engine.get_current_frame()
    return {
               "vehicles": len(current),
            "trips": STABLE_METRICS["trips"],
            "avg_speed": current["speed"].mean(),
            "active_faults": current["obd_code"].fillna("None").ne("None").sum(),
            "fuel_remaining": current["fuel_level"].mean(),
            "avg_engine_temp": current["engine_temp"].mean()
        }