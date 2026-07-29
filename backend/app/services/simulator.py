import random
from datetime import timedelta
#simulator scripts for generating data
from config import (
    ROAD_TYPES,
    WEATHER,
    OBD_CODES,
    DEPOTS,
    ENGINE,
    DRIVER_BEHAVIOUR,
    ROUTES
)

##______________________________________________________________
def create_trip(trip_number):                                   #Trip assignment
    """
    Creates metadata for one trip.
    """

    route_id = random.choice(list(ROUTES.keys()))

    road_type = random.choice(list(ROAD_TYPES.keys()))

    weather = random.choices(
        list(WEATHER.keys()),
        weights=WEATHER.values()
    )[0]

    route = ROUTES[route_id]

    return {

    "trip_id": f"T{trip_number:05}",

    "route_id": route_id,

    "road_type": road_type,

    "weather": weather,

    "start": route["start"],

    "end": route["end"]

}

##______________________________________________________________
def initialize_vehicle(depot):                                  #Initialize starting values of the truck 
    """
    Initializes vehicle state at the start of a trip.
    """

    lat, lon = DEPOTS[depot]

    return {

        "latitude": lat,

        "longitude": lon,

        "speed": random.randint(25, 40),

        "fuel": random.randint(80, 100),

        "odometer": random.randint(10000, 80000),

        "rpm": ENGINE["idle_rpm"],

        "engine_temp": ENGINE["normal_temp"],

        "obd_code": "None",

        "fault_timer": 0,

        "current_route": None,

        "route_progress": 0.0,
        
        "gps_step": 1.0

    }

#_______________________________________________________________
def update_speed(state, road_type):                             #DYnamic speed updation
    """
    Simulates realistic speed changes.
    """

    limits = ROAD_TYPES[road_type]

    state["speed"] += random.randint(-5, 5)

    state["speed"] = max(
        limits["min_speed"],
        min(state["speed"], limits["max_speed"])
    )

#_______________________________________________________________
def update_location(state):

    from app.services.route_manager import get_route

    route = get_route(state["current_route"])

    state["route_progress"] += state["gps_step"]

    idx = min(
        int(state["route_progress"]),
        len(route) - 1
    )

    state["latitude"] = route[idx][0]
    state["longitude"] = route[idx][1]
#_______________________________________________________________
def update_fuel(state, road_type):                              #Fuel level updation
    """
    Simulates fuel consumption.
    """

    rate = ENGINE["fuel_consumption_per_min"]

    if road_type == "City":
        rate *= 1.2

    elif road_type == "Highway":
        rate *= 0.9

    fuel_used = random.uniform(
    rate * 0.8,
    rate * 1.2
    )

    fuel_used /= 12

    state["fuel"] -= fuel_used

    state["fuel"] = max(0, state["fuel"])

#_______________________________________________________________
def update_rpm(state):                                          #RPM based on the speed

    state["rpm"] = int(
        900 + state["speed"] * 25
    )

#_______________________________________________________________
def update_engine_temperature(state):                           #Engine temperature based on the speed

    temp = 80 + state["speed"] * 0.25

    state["engine_temp"] = round(
        temp + random.uniform(-2, 2),
        1
    )

#_______________________________________________________________
def simulate_driver_behaviour(weather):                         #Driver behaviour based on different aspects

    harsh = random.random() < (
        DRIVER_BEHAVIOUR["harsh_brake"] / 100
    )

    rapid = random.random() < (
        DRIVER_BEHAVIOUR["rapid_acceleration"] / 100
    )

    idle = 0

    if random.random() < (
        DRIVER_BEHAVIOUR["idle_probability"] / 100
    ):
        idle = random.randint(30,180)

    if weather == "Rain":

        harsh = harsh or random.random() < 0.15

    return harsh, rapid, idle

#________________________________________________________________
def update_obd(state):                                           #OBD codes generation   
    """
    Simulates persistent engine faults.
    """

    if state["fault_timer"] > 0:
        state["fault_timer"] -= 1
        return

    state["obd_code"] = "None"

    if random.random() < 0.03:
        state["obd_code"] = random.choices(
            list(OBD_CODES.keys())[1:],
            weights=list(OBD_CODES.values())[1:]
        )[0]

        state["fault_timer"] = random.randint(5, 15)

    if random.random() < 0.03:

        state["obd_code"] = random.choices(
            list(OBD_CODES.keys())[1:],
            weights=list(OBD_CODES.values())[1:]
        )[0]

        state["fault_timer"] = random.randint(5,15)

    else:

        state["obd_code"] = "None"

#________________________________________________________________
def update_odometer(state):                                      #Odometer updation
    """
    Update odometer based on speed.
    Assumes one telemetry reading per minute.
    """

    distance = state["speed"] * (5 / 3600)  # km travelled in one minute

    state["odometer"] += distance

#___________________________________________________________________
def reset_trip_location(state, route_id):

    from app.services.route_manager import get_route

    route = get_route(route_id)

    state["current_route"] = route_id

    state["route_progress"] = 0.0

    state["latitude"] = route[0][0]
    state["longitude"] = route[0][1]