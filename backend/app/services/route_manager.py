import json
from pathlib import Path
#Geotag location on roads
BASE_DIR = Path(__file__).resolve().parents[2]

ROUTE_FILE = BASE_DIR / "data" / "road_network.json"

with open(ROUTE_FILE) as f:
    ROUTES = json.load(f)

def get_route(route_id):
    return ROUTES[route_id]