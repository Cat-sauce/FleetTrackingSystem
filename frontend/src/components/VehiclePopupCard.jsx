import "../styles/VehiclePopupCard.css";

export default function VehiclePopupCard({
    vehicle,
    onClose
}) {

    if (!vehicle) return null;

    function getStatus() {

        if (vehicle.engine_temp > 102 || vehicle.obd_code)
            return "Critical";

        if (vehicle.speed > 90 || vehicle.fuel_level < 15)
            return "Warning";

        return "Healthy";
    }

    return (

        <div className="vehicle-popup-card">

            <button
                className="popup-close"
                onClick={onClose}
            >
                ×
            </button>

            <div className="popup-header">

                <div>

                    <h2>{vehicle.vehicle_id}</h2>

                    <p>{vehicle.driver}</p>

                </div>

                <span className={`popup-status ${getStatus().toLowerCase()}`}>
                    {getStatus()}
                </span>

            </div>

            <div className="popup-section">

                <div className="popup-item">

                    <span>📍 Destination</span>

                    <strong>{vehicle.destination_city}</strong>

                </div>

                <div className="popup-item">

                    <span>⚡ Speed</span>

                    <strong>{vehicle.speed} km/h</strong>

                </div>

                <div className="popup-item">

                    <span>🌡 Engine</span>

                    <strong>{vehicle.engine_temp.toFixed(1)}°C</strong>

                </div>

                <div className="popup-item">

                    <span>⛽ Fuel</span>

                    <strong>{vehicle.fuel_level.toFixed(1)}%</strong>

                </div>

                <div className="popup-item">

                    <span>🌦 Weather</span>

                    <strong>{vehicle.weather}</strong>

                </div>

                <div className="popup-item">

                    <span>🛣 Route</span>

                    <strong>{vehicle.route_id}</strong>

                </div>

            </div>

        </div>

    );

}