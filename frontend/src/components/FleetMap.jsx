import MarkerClusterGroup from "react-leaflet-cluster";
import "react-leaflet-cluster/dist/assets/MarkerCluster.css";
import "react-leaflet-cluster/dist/assets/MarkerCluster.Default.css";
import "../styles/FleetMap.css";
import "leaflet/dist/leaflet.css";
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    useMap
} from "react-leaflet";

import { useEffect } from "react";

import L from "leaflet";

const truckIcon = new L.DivIcon({
    html: `
        <div class="truck-marker">
            <div class="pulse-ring"></div>
            <div class="truck-icon">
                🚚
            </div>
        </div>
    `,
    className: "",
    iconSize: [46,46],
    iconAnchor: [23,46],
    popupAnchor: [0,-42]
});
const selectedTruckIcon = new L.DivIcon({

    html:`

    <div class="truck-marker selected-marker">

        <div class="pulse-ring selected-ring"></div>

        <div class="truck-icon selected-truck">

            🚚

        </div>

    </div>

    `,

    className:"",

    iconSize:[52,52],

    iconAnchor:[26,52]

});
function FlyToVehicle({ vehicles, selectedVehicleId }) {

    const map = useMap();

    useEffect(() => {

        if (!selectedVehicleId) return;

        const vehicle = vehicles.find(
            v => v.vehicle_id === selectedVehicleId
        );

        if (!vehicle) return;

        map.flyTo(
            [vehicle.latitude, vehicle.longitude],
            10,
            {
                duration: 1.5
            }
        );

    }, [selectedVehicleId, vehicles]);

    return null;
}

export default function FleetMap({

    vehicles,
    selectedVehicle,
    onVehicleSelect,
    healthyCount,
    warningCount,
    criticalCount

}) {


    const moving =
        vehicles.filter(v => v.speed > 0).length;

    const idle =
        vehicles.length - moving;
    const warning = vehicles.filter(
    v =>
        (v.engine_temp >= 95 && v.engine_temp < 110) ||
        v.speed > 90 ||
        v.fuel_level < 15
).length;

const critical = vehicles.filter(
    v =>
        v.engine_temp >= 110 ||
        (v.obd_code && v.obd_code !== "None")
).length;

    return (

        <div className="fleet-map-card">

            <div className="fleet-status-card">

                <div className="fleet-title-row">

    <div>

        <h3>Fleet Status</h3>

        <p>Live Vehicle Monitoring</p>

    </div>

    <span className="live-pill">
        ● LIVE
    </span>

</div>

    <div className="fleet-total">

        {vehicles.length}

    </div>

    <div className="fleet-total-label">

        Connected Vehicles

    </div>

    <div className="fleet-divider" />

    <div className="fleet-grid">

    <div className="fleet-stat">

        <div className="fleet-icon moving">
            🚚
        </div>

        <div>

            <strong>{moving}</strong>

            <small>Moving</small>

        </div>

    </div>

    <div className="fleet-stat">

        <div className="fleet-icon idle">
            🅿
        </div>

        <div>

            <strong>{idle}</strong>

            <small>Idle</small>

        </div>

    </div>

    <div className="fleet-stat">

        <div className="fleet-icon warning">
            ⚠
        </div>

        <div>
            <strong>{warningCount}</strong>
            <small>Warning</small>
        </div>

    </div>

    <div className="fleet-stat">

        <div className="fleet-icon critical">
            🔴
        </div>

        <div>

            <strong>{critical}</strong>

            <small>Critical</small>

        </div>

    </div>

</div>

</div>
            <div className="fleet-legend">

    <div className="legend-title">

        Fleet Health

    </div>

    <div className="legend-item">

        <span className="legend-green"/>

        Healthy

    </div>

    <div className="legend-item">

        <span className="legend-yellow"/>

        Warning

    </div>

    <div className="legend-item">

        <span className="legend-red"/>

        Critical

    </div>

</div>

            <MapContainer
    center={[28.61,77.20]}
    zoom={6}
    className="fleet-map"
    preferCanvas={true}
    zoomControl={false}
>
    <TileLayer
    url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
/>
<FlyToVehicle
    vehicles={vehicles}
    selectedVehicle={selectedVehicle}
/>
<MarkerClusterGroup
    chunkedLoading
    showCoverageOnHover={false}
    spiderfyOnMaxZoom={true}
    maxClusterRadius={45}
>

    {vehicles.map(vehicle => (

        <Marker

            key={vehicle.vehicle_id}

            icon={
    selectedVehicle === vehicle.vehicle_id
        ? selectedTruckIcon
        : truckIcon
}

            position={[
                vehicle.latitude,
                vehicle.longitude
            ]}

            eventHandlers={{
    click: () => onVehicleSelect(vehicle.vehicle_id)
}}

        >

            <Popup className="fleet-popup">

                <div className="popup-title">

                    {vehicle.vehicle_id}

                </div>

                <div className="popup-driver">

                    {vehicle.driver}

                </div>

                <div className="popup-divider"/>

                <div className="popup-row">

                    <span>⚡ Speed</span>

    <strong>{vehicle.speed} km/h</strong>

                </div>

                <div className="popup-row">

                    <span>⛽ Fuel</span>

    <strong>{vehicle.fuel_level.toFixed(1)}%</strong>

                </div>

                <div className="popup-row">

                    <span>🌡 Engine</span>

    <strong>{vehicle.engine_temp.toFixed(1)}°C</strong>

                </div>

                <div className="popup-row">

                    <span>📍 Destination</span>

    <strong>{vehicle.destination_city}</strong>

                </div>

                <div className="popup-row">

                    <span>☀ Weather</span>

    <strong>{vehicle.weather}</strong>

                </div>

            </Popup>

        </Marker>

    ))}

</MarkerClusterGroup>
</MapContainer>

        </div>

    );

}
