import json
import openrouteservice
from pathlib import Path

#Routes management unsing openrouteservice

API_KEY = "eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6IjhlOGExYzRlODQ5NDRmMDk4MTcxZGZhY2JhMjY3NDUyIiwiaCI6Im11cm11cjY0In0="

client = openrouteservice.Client(key=API_KEY)

# ============================================
# Cities (lon, lat)
# ============================================

CITIES = {

    "Delhi": (77.2090, 28.6139),

    "Gurugram": (77.0266, 28.4595),

    "Noida": (77.3910, 28.5355),

    "Ghaziabad": (77.4538, 28.6692),

    "Faridabad": (77.3178, 28.4089),

    "Sonipat": (77.0151, 28.9931)

}

# ============================================
# Routes
# ============================================

ROUTES = {

    "R01": ("Delhi", "Gurugram"),

    "R02": ("Delhi", "Noida"),

    "R03": ("Delhi", "Ghaziabad"),

    "R04": ("Delhi", "Faridabad"),

    "R05": ("Delhi", "Sonipat")

}

road_network = {}

print("=" * 60)
print("Downloading Road Geometry...")
print("=" * 60)

for route_id, (start, end) in ROUTES.items():

    print(f"{route_id} : {start} -> {end}")

    coords = [
        CITIES[start],
        CITIES[end]
    ]

    route = client.directions(
        coordinates=coords,
        profile="driving-car",
        format="geojson"
    )

    geometry = route["features"][0]["geometry"]["coordinates"]

    # Convert [lon,lat] → [lat,lon]

    points = []

    for lon, lat in geometry:

        points.append([lat, lon])

    road_network[route_id] = points

# ============================================
# Save
# ============================================

output = Path("data") / "road_network.json"

with open(output, "w") as f:

    json.dump(road_network, f, indent=4)

print()
print("=" * 60)
print("Road network generated successfully!")
print(f"Saved to : {output}")
print("=" * 60)

for route in road_network:

    print(route, ":", len(road_network[route]), "GPS points")