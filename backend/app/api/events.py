from fastapi import APIRouter
from app.services.event_engine import (
    get_events,
    get_active_alerts
)   

router = APIRouter()

@router.get("/events")
def events():
    return get_events()


@router.get("/events/active")
def active_events():
    return get_active_alerts()