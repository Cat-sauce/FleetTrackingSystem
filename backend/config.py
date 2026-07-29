"""
config.py
-----------
Stores all configuration constants used across the Fleet Tracking
simulation project.
"""
import random

# fleet data configuration

# ==========================================================
# Fleet Configuration
# ==========================================================

NUM_VEHICLES = 50

MIN_TRIPS_PER_VEHICLE = 4
MAX_TRIPS_PER_VEHICLE = 6

MIN_READINGS_PER_TRIP = 360
MAX_READINGS_PER_TRIP = 720


# ==========================================================
# Vehicle IDs
# ==========================================================

VEHICLES = [
    f"V{str(i).zfill(3)}"
    for i in range(1, NUM_VEHICLES + 1)
]

DRIVERS = [
    f"Driver_{i}"
    for i in range(1, NUM_VEHICLES + 1)
]

# ==========================================================
# Route Information
# ==========================================================

ROUTES = {

    "R01": {
        "name": "Delhi → Gurugram",
        "start": "Delhi",
        "end": "Gurugram"
    },

    "R02": {
        "name": "Delhi → Noida",
        "start": "Delhi",
        "end": "Noida"
    },

    "R03": {
        "name": "Delhi → Ghaziabad",
        "start": "Delhi",
        "end": "Ghaziabad"
    },

    "R04": {
        "name": "Delhi → Faridabad",
        "start": "Delhi",
        "end": "Faridabad"
    },

    "R05": {
        "name": "Delhi → Sonipat",
        "start": "Delhi",
        "end": "Sonipat"
    }

}

# ==========================================================
# Road Types
# ==========================================================

ROAD_TYPES = {

    "Highway": {
        "min_speed": 60,
        "max_speed": 90
    },

    "City": {
        "min_speed": 20,
        "max_speed": 50
    },

    "Rural": {
        "min_speed": 40,
        "max_speed": 70
    }

}

# ==========================================================
# Weather Conditions
# ==========================================================

WEATHER = {

    "Sunny": 45,

    "Cloudy": 25,

    "Rain": 20,

    "Fog": 10

}

random.choices(
    list(WEATHER.keys()),
    weights=WEATHER.values()
)

# ==========================================================
# OBD Diagnostic Codes
# ==========================================================

OBD_CODES = {

    "None": 85,

    "P0171": 5,

    "P0300": 4,

    "P0420": 3,

    "P0455": 3

}

# ==========================================================
# Fleet Depots
# ==========================================================

DEPOTS = {

    "Delhi": (28.6139, 77.2090),

    "Gurugram": (28.4595, 77.0266),

    "Noida": (28.5355, 77.3910),

    "Ghaziabad": (28.6692, 77.4538),

    "Faridabad": (28.4089, 77.3178),

    "Sonipat": (28.9931, 77.0151)

}

# ==========================================================
# Engine Parameters
# ==========================================================

ENGINE = {

    "idle_rpm": 900,

    "normal_temp": 88,

    "high_temp": 105,

    "fuel_consumption_per_min": 0.12

}

# ==========================================================
# Driver Behaviour Probabilities
# ==========================================================

DRIVER_BEHAVIOUR = {

    "harsh_brake": 6,

    "rapid_acceleration": 8,

    "idle_probability": 10

}

# ==========================================================
# Vehicle State
# ==========================================================

IGNITION = [

    "ON",

    "OFF"

]

