import "../styles/map.css";
import {
    MapContainer,
    TileLayer,
    Popup
} from "react-leaflet";
import "../styles/fleetMap.css";
import AnimatedMarker from "./AnimatedMarker";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const truckIcon = new L.DivIcon({
    html: `
<div class="truck-marker">
    <img
        src="pngkey.com-location-sign-png-4993945.png"
        style="width:48px;height:60px;"
    />
</div>
`,
    className: "",
    iconSize: [48, 48],
    iconAnchor: [24, 42],
    popupAnchor: [0, -36]
});

export default function LiveMap({ vehicles }) {

    if (!vehicles.length) {
        return (
            <div className="map-loading">
                Loading Live Fleet...
            </div>
        );
    }

    return (

        <div className="map-card">

            {/* HEADER */}

            <div className="map-header">

                <div>

                    <div className="map-title">
                        Fleet Live Operations
                    </div>

                    <div className="map-subtitle">
                        Real-time telemetry across the fleet
                    </div>

                </div>

                <div className="map-pill-group">

                    <div className="status-pill status-green">
                        GPS Synced
                    </div>

                    <div className="status-pill status-blue">
                        {vehicles.length} Vehicles
                    </div>

                    <div className="status-pill status-purple">
                        LIVE
                    </div>

                </div>

            </div>

            {/* MAP */}

            <div className="map-wrapper">

                {/* Floating Fleet Card */}

                <div className="fleet-overlay">

                    <div className="overlay-title">
                        Vehicles Reporting
                    </div>

                    <div className="overlay-number">
                        {vehicles.length}
                    </div>

                    <div className="overlay-sub">
                        Live GPS Feed
                    </div>

                </div>

                <MapContainer
                    className="fleet-map"
                    center={[28.6139, 77.2090]}
                    zoom={10}
                >

                    <TileLayer
                        url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
                        attribution="&copy; Stadia Maps"
                    />

                    {vehicles.map(vehicle => (

                        <AnimatedMarker
                            key={vehicle.vehicle_id}
                            position={[
                                vehicle.latitude,
                                vehicle.longitude
                            ]}
                            icon={truckIcon}
                        >

                            <Popup className="fleet-popup">

                                <div className="popup-title">
                                    {vehicle.vehicle_id}
                                </div>

                                <div className="popup-driver">
                                    {vehicle.driver}
                                </div>

                                <div className="popup-divider"></div>

                                <div className="popup-row">
                                    <span>Speed</span>
                                    <strong>{vehicle.speed} km/h</strong>
                                </div>

                                <div className="popup-row">
                                    <span>Fuel</span>
                                    <strong>{vehicle.fuel_level}%</strong>
                                </div>

                                <div className="popup-row">
                                    <span>Engine</span>
                                    <strong>{vehicle.engine_temp}°C</strong>
                                </div>

                                <div className="popup-row">
                                    <span>Destination</span>
                                    <strong>{vehicle.destination_city}</strong>
                                </div>

                                <div className="popup-row">
                                    <span>Weather</span>
                                    <strong>{vehicle.weather}</strong>
                                </div>

                            </Popup>

                        </AnimatedMarker>

                    ))}

                </MapContainer>

            </div>

        </div>

    );

}