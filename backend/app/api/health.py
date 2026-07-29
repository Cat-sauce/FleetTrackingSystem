from fastapi import APIRouter
from app.services.event_engine import get_active_alerts

router = APIRouter()

@router.get("/health")
def fleet_health():

    alerts = get_active_alerts()

    vehicles = set()

    warning = set()

    critical = set()

    for alert in alerts:

        vehicles.add(alert["vehicle"])

        if alert["level"] == "danger":
            critical.add(alert["vehicle"])
        else:
            warning.add(alert["vehicle"])

    TOTAL_VEHICLES = 50

    affected = warning | critical

    healthy = TOTAL_VEHICLES - len(affected)

    score = round(
        healthy / TOTAL_VEHICLES * 100,
        1
    )

    return {

        "fleet_health": score,

        "healthy": healthy,

        "warning": len(warning),

        "critical": len(critical),

        "active_faults": len(alerts)

    }