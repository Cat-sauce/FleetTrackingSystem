from fastapi import HTTPException
from fastapi import APIRouter
from app.services.event_engine import push,clear
from app.services.replay_engine import engine
import numpy as np
#Frontend makes data requests that are fulfilled
router = APIRouter()

fault_state = {}

CRITICAL_OBD_CODES = {
    "P0300",   # Random Misfire
    "P0301",   # Cylinder 1 Misfire
    "P0302",   # Cylinder 2 Misfire
    "P0303",   # Cylinder 3 Misfire
    "P0304"    # Cylinder 4 Misfire
}

@router.get("/vehicles")            #FastAPI path operation deoder, function below should handle HTTP GET requests made to vehicles endpoint
def get_vehicles():

    latest = engine.get_current_frame().copy()

    latest = latest.replace({np.nan: None})

    # ----------------------------
    # Generate Events
    # ----------------------------

    for _, row in latest.iterrows():

        if row["speed"] > 90:
            level = "danger" if row["speed"] > 120 else "warning"
            push(
                row["vehicle_id"],
                level,
                "Overspeed",
                f'{row["speed"]:.1f} km/h'
            )
        else:
            clear(
                row["vehicle_id"],
                "Overspeed",
                f"Speed back to {row['speed']} km/h"
            )

        if row["fuel_level"] < 15:
            level = "danger" if row["fuel_level"] < 5 else "warning"

            push(
    row["vehicle_id"],
    level,
    "Low Fuel",
    f'{row["fuel_level"]:.1f}%'
)
        else:
            clear(
                row["vehicle_id"],
                "Low Fuel",
                f"Fuel restored to {row['fuel_level']:.1f}%"
            )

        key = (row["vehicle_id"], "Engine Temperature")
        temp = row["engine_temp"]
        if temp > 110:
            fault_state[key] = 0
            push(
                row["vehicle_id"],
                "danger",
                "Engine Temperature",
                f"{temp:.1f} °C"
            )
        elif temp > 102:
            fault_state[key] = 0
            push(
                row["vehicle_id"],
                "warning",
                "Engine Temperature",
                f"{temp:.1f} °C"
            )
        else:
            fault_state[key] = fault_state.get(key, 0) + 1
            if fault_state[key] >= 5:
                clear(
                    row["vehicle_id"],
                    "Engine Temperature",
                    f"Temperature back to {temp:.1f} °C"
                )
        
        obd = row["obd_code"]

        if (
            obd is not None
            and str(obd).lower() != "nan"
            and obd != ""
        ):
            level = (
    "danger"
    if str(obd) in CRITICAL_OBD_CODES
    else "warning"
)

            push(
    row["vehicle_id"],
    level,
    "OBD Fault",
    str(obd)
)
        else:
            clear(
                row["vehicle_id"],
                "OBD Fault",
                "Fault cleared"
            )

    latest = latest.drop(
        columns=[
            "trip_distance",
            "fuel_consumed",
            "trip_avg_speed"
        ],
        errors="ignore"
    )

    latest = latest.replace({np.nan: None})

    latest["timestamp"] = latest["timestamp"].astype(str)

    return latest.to_dict(orient="records")

@router.get("/vehicles/{vehicle_id}")
def get_vehicle(vehicle_id: str):
    current = engine.get_current_frame().copy()
    current = current.replace({np.nan: None})
    vehicle = current[
        current["vehicle_id"] == vehicle_id
    ]
    if vehicle.empty:
        raise HTTPException(
            status_code=404,
            detail="Vehicle not found"
        )
    row = vehicle.iloc[0]
    print(current.columns.tolist())
    return {
    "vehicle": str(row["vehicle_id"]),
    "driver": str(row["driver"]),
    "route": str(row["route_id"]),

    "speed": int(row["speed"]),
    "fuel": float(row["fuel_level"]),
    "engine_temp": float(row["engine_temp"]),
    "rpm": int(row["rpm"]),

    "obd_code": None if row["obd_code"] is None else str(row["obd_code"]),

    "latitude": float(row["latitude"]),
    "longitude": float(row["longitude"]),

    "timestamp": str(row["timestamp"])
}