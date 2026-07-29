import random
from datetime import datetime, timedelta
from pathlib import Path
#Generates the data
from app.services.route_manager import get_route

import pandas as pd

from app.services.simulator import reset_trip_location

from app.services.simulator import update_odometer

BASE_DIR = Path(__file__).resolve().parent
DATA_PATH = BASE_DIR / "data" / "vehicle_data.csv"

from config import (                                    #Import class parameters
    VEHICLES,
    DRIVERS,
    MIN_TRIPS_PER_VEHICLE,
    MAX_TRIPS_PER_VEHICLE,
    MIN_READINGS_PER_TRIP,
    MAX_READINGS_PER_TRIP,
)

from app.services.simulator import (                                 #Simulation data import
    create_trip,
    initialize_vehicle,
    update_speed,
    update_location,
    update_fuel,
    update_rpm,
    update_engine_temperature,
    simulate_driver_behaviour,
    update_obd,
    update_odometer,
    reset_trip_location,
)

def generate_dataset():

    records = []

    start_time = datetime.now().replace(
        second=0,
        microsecond=0
    )

    global_trip_number = 1

    for vehicle, driver in zip(VEHICLES, DRIVERS):

        # Initialize vehicle ONCE
        first_trip = create_trip(global_trip_number)

        state = initialize_vehicle(first_trip["start"])

        trips = random.randint(
            MIN_TRIPS_PER_VEHICLE,
            MAX_TRIPS_PER_VEHICLE
        )

        vehicle_start = start_time

        for _ in range(trips):

            trip = create_trip(global_trip_number)
            global_trip_number += 1

            # Reset only GPS for a new trip
            reset_trip_location(state, trip["route_id"])

            readings = random.randint(
                MIN_READINGS_PER_TRIP,
                MAX_READINGS_PER_TRIP
            )

            route = get_route(trip["route_id"])

            state["gps_step"] = (len(route) - 1) / readings

            # Trip statistics
            trip_start_odometer = state["odometer"]
            trip_start_fuel = state["fuel"]
            speed_sum = 0

            for minute in range(readings):

                for reading in range(readings):

                    timestamp = vehicle_start + timedelta(seconds=minute * 5)

                update_speed(state, trip["road_type"])
                update_odometer(state)
                update_location(state)
                update_fuel(state, trip["road_type"])
                update_rpm(state)
                update_engine_temperature(state)
                update_obd(state)

                harsh, rapid, idle = simulate_driver_behaviour(
                    trip["weather"]
                )

                speed_sum += state["speed"]

                records.append({

                    "timestamp": timestamp,

                    "start_city": trip["start"],

                    "destination_city": trip["end"],

                    "vehicle_id": vehicle,

                    "driver": driver,

                    "trip_id": trip["trip_id"],

                    "route_id": trip["route_id"],

                    "latitude": round(state["latitude"], 6),

                    "longitude": round(state["longitude"], 6),

                    "speed": state["speed"],

                    "fuel_level": round(state["fuel"], 2),

                    "engine_temp": state["engine_temp"],

                    "rpm": state["rpm"],

                    "odometer": round(state["odometer"], 2),

                    "ignition": "ON",

                    "obd_code": state["obd_code"],

                    "harsh_brake": harsh,

                    "rapid_acceleration": rapid,

                    "idle_time": idle,

                    "weather": trip["weather"],

                    "road_type": trip["road_type"],

                    # Trip summary fields
                    "trip_distance": None,
                    "fuel_consumed": None,
                    "trip_avg_speed": None,
                    "refueled": False

                })

            # -----------------------------
            # End of Trip
            # -----------------------------

            trip_distance = state["odometer"] - trip_start_odometer

            fuel_used = trip_start_fuel - state["fuel"]

            avg_speed = speed_sum / readings

            records[-1]["ignition"] = "OFF"

            records[-1]["trip_distance"] = round(
                trip_distance, 2
            )

            records[-1]["fuel_consumed"] = round(
                fuel_used, 2
            )

            records[-1]["trip_avg_speed"] = round(
                avg_speed, 1
            )

            # Refuel if needed
            if state["fuel"] < 15:

                state["fuel"] = 100

                records[-1]["refueled"] = True

            vehicle_start = timestamp + timedelta(
                minutes=random.randint(20, 90)
            )

    df = pd.DataFrame(records)

    df.to_csv(DATA_PATH, index=False)

    return df

if __name__ == "__main__":                              #Entry point

    df = generate_dataset()

    print(df.head())

    print()

    print("="*60)

    print(f"Total Records : {len(df)}")

    print(f"Vehicles      : {df['vehicle_id'].nunique()}")

    print(f"Trips         : {df['trip_id'].nunique()}")

    print("="*60)

    print("\nDataset generated successfully!")