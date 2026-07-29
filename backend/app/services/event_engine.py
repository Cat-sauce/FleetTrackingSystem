from collections import deque
from datetime import datetime

#continuously analyzes that telemetry, detects abnormal conditions, manages active alerts, and maintains a history of all fleet events.

# Latest events
events = deque(maxlen=100)

# Active alerts
active_alerts = {}


def push(vehicle, level, title, message):

    key = (vehicle, title)

    if key in active_alerts:
        return

    priority = {
    "Engine Temperature": "critical",
    "OBD Fault": "high",
    "Low Fuel": "medium",
    "Overspeed": "medium"
    }.get(title, "low")
    
    now = datetime.now()

    alert = {

    "vehicle": vehicle,

    "level": level,

    "priority": priority,

    "title": title,

    "message": message,

    "time": now.strftime("%H:%M:%S"),

    "started_at": now.timestamp()

}

    active_alerts[key] = alert
    events.appendleft(alert)

def clear(vehicle, title, message="Vehicle returned to normal"):

    print(f"CLEAR -> {vehicle} | {title}")

    key = (vehicle, title)

    if key in active_alerts:
        active_alerts.pop(key, None)

        events.appendleft({
            "vehicle": vehicle,
            "level": "success",
            "title": f"{title} Cleared",
            "message": message,
            "time": datetime.now().strftime("%H:%M:%S")
        })

def get_active_alerts():

    return list(active_alerts.values())

def get_events():

    return list(events)