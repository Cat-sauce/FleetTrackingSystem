import "../styles/VehicleTable.css";

export default function VehicleTable({

    vehicles,

    selectedVehicleId,

    setSelectedVehicle,

    getStatus

}) {

    function fuelColor(fuel){
        if(fuel < 15) return "#ef4444";
        if(fuel < 35) return "#f59e0b";
        return "#10b981";
    }

    function tempColor(temp){
        if(temp > 102) return "#ef4444";
        if(temp > 95) return "#f59e0b";
        return "#3b82f6";
    }

    return (

        <div className="vehicle-table-card">

            <div className="vehicle-table-header">

                <div>

                    <h2>Live Fleet Vehicles</h2>

                    <p>
                        Live telemetry from connected vehicles
                    </p>

                </div>

                <span className="vehicle-count">

                    {vehicles.length} Vehicles

                </span>

            </div>

            <table className="vehicle-table">

                <thead>

                    <tr>

                        <th>Vehicle</th>
                        <th>Status</th>
                        <th>Speed</th>
                        <th>Fuel</th>
                        <th>Engine</th>

                    </tr>

                </thead>

                <tbody>

                    {vehicles.map(vehicle => (

                        <tr

                            key={vehicle.vehicle_id}

                            onClick={() =>
                                setSelectedVehicle(vehicle.vehicle_id)
                            }

                            className={
                                selectedVehicleId === vehicle.vehicle_id
                                    ? "active-row"
                                    : ""
                            }

                        >

                            <td>

                                <div className="vehicle-info">

                                    <div>

                                        <div className="vehicle-id">

                                            {vehicle.vehicle_id}

                                        </div>

                                        <div className="vehicle-driver">

                                            {vehicle.driver}

                                        </div>

                                    </div>

                                </div>

                            </td>

                            <td>

                                <span className={`status-pill ${getStatus(vehicle).toLowerCase()}`}>

                                    {getStatus(vehicle)}

                                </span>

                            </td>

                            <td>

                                <div className="speed-cell">

                                    {vehicle.speed}

                                    <small>km/h</small>

                                </div>

                            </td>

                            <td>

                                <div className="progress-cell">

                                    <div className="progress-track">

                                        <div
                                            className="progress-fill"
                                            style={{
                                                width:`${vehicle.fuel_level}%`,
                                                background:fuelColor(vehicle.fuel_level)
                                            }}
                                        />

                                    </div>

                                    <span>

                                        {vehicle.fuel_level.toFixed(0)}%

                                    </span>

                                </div>

                            </td>

                            <td>

                                <div className="progress-cell">

                                    <div className="progress-track">

                                        <div
                                            className="progress-fill"
                                            style={{
                                                width:`${Math.min(vehicle.engine_temp,120)/120*100}%`,
                                                background:tempColor(vehicle.engine_temp)
                                            }}
                                        />

                                    </div>

                                    <span>

                                        {vehicle.engine_temp.toFixed(1)}°

                                    </span>

                                </div>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );

}