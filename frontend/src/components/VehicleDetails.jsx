import "../styles/VehicleDetails.css";

export default function VehicleDetails({ vehicle }) {

    if (!vehicle) {

        return (
            <div className="vehicle-details-card empty">

                <h2>No Vehicle Selected</h2>

                <p>Select a vehicle from the map or table.</p>

            </div>
        );

    }

    return (

        <div className="vehicle-details-card">

            <div className="vehicle-top">

                <div>

                    <h2>{vehicle.vehicle_id}</h2>

                    <p>{vehicle.driver}</p>

                </div>

                <div className="vehicle-status">

                    {vehicle.engine_temp > 102 || vehicle.obd_code
                        ? "🔴 Critical"
                        : vehicle.speed > 90 || vehicle.fuel_level < 15
                        ? "🟡 Warning"
                        : "🟢 Healthy"}

                </div>

            </div>

            <div className="details-grid">

                <div className="detail-box">
                    <span>Route</span>
                    <strong>{vehicle.route_id}</strong>
                </div>

                <div className="detail-box">
                    <span>Destination</span>
                    <strong>{vehicle.destination_city}</strong>
                </div>

                <div className="detail-box">
                    <span>Weather</span>
                    <strong>{vehicle.weather}</strong>
                </div>

                <div className="detail-box">
                    <span>RPM</span>
                    <strong>{vehicle.rpm}</strong>
                </div>

            </div>

            <div className="telemetry">

                <div className="telemetry-item">

                    <div className="telemetry-header">

                        <span>Fuel</span>

                        <strong>{vehicle.fuel_level.toFixed(1)}%</strong>

                    </div>

                    <div className="progress">

                        <div
                            className="progress-fill fuel"
                            style={{
                                width: `${vehicle.fuel_level}%`
                            }}
                        />

                    </div>

                </div>

                <div className="telemetry-item">

                    <div className="telemetry-header">

                        <span>Engine Temp</span>

                        <strong>{vehicle.engine_temp.toFixed(1)}°C</strong>

                    </div>

                    <div className="progress">

                        <div
                            className="progress-fill temp"
                            style={{
                                width: `${Math.min(vehicle.engine_temp,120)/120*100}%`
                            }}
                        />

                    </div>

                </div>

                <div className="telemetry-item">

                    <div className="telemetry-header">

                        <span>Speed</span>

                        <strong>{vehicle.speed} km/h</strong>

                    </div>

                    <div className="progress">

                        <div
                            className="progress-fill speed"
                            style={{
                                width: `${Math.min(vehicle.speed,120)/120*100}%`
                            }}
                        />

                    </div>

                </div>

            </div>

            <div className="obd-box">

                <span>OBD Code</span>

                <strong>

                    {vehicle.obd_code || "No Active Fault"}

                </strong>

            </div>

        </div>

    );

}