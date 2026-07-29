export default function AnalyticsTables({ data }) {

    return (

        <div
            className="analytics-insights-grid"
            style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "24px",
                marginTop: "20px",
                alignItems: "stretch"
            }}
        >

            {/* ================= Top Speed ================= */}

            <div className="insight-card">

                <div className="insight-card-header">

                    <div className="insight-card-title">
                        🚀 Top Speed Vehicles
                    </div>

                    <div className="insight-card-subtitle">
                        Highest recorded vehicle speeds
                    </div>

                </div>

                <div className="insight-divider"></div>

                <table style={{ width: "100%" }}>

                    <thead>

                        <tr>

                            <th>Vehicle</th>
                            <th>Speed</th>
                            <th>Route</th>

                        </tr>

                    </thead>

                    <tbody>

                        {data.top_speed.map((v) => (

                            <tr key={v.vehicle_id}>

                                <td>{v.vehicle_id}</td>

                                <td>
    <span className="speed-badge">
        {v.speed} km/h
    </span>
</td>

                                <td>
    <span className="route-badge">
        {v.route_id}
    </span>
</td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

            {/* ================= Highest Engine Temperature ================= */}

            <div className="insight-card">

                <div className="insight-card-header">

                    <div className="insight-card-title">
                        🌡 Highest Engine Temperature
                    </div>

                    <div className="insight-card-subtitle">
                        Vehicles operating at the highest temperatures
                    </div>

                </div>

                <div className="insight-divider"></div>

                <table style={{ width: "100%" }}>

                    <thead>

                        <tr>

                            <th>Vehicle</th>
                            <th>Temp</th>
                            <th>Driver</th>

                        </tr>

                    </thead>

                    <tbody>

                        {data.highest_temp.map((v) => (

                            <tr key={v.vehicle_id}>

                                <td>{v.vehicle_id}</td>

                                <td>

    <span
        className={`temp-badge ${
            v.engine_temp > 100
                ? "danger"
                : v.engine_temp > 90
                ? "warning"
                : "safe"
        }`}
    >
        {v.engine_temp.toFixed(1)}°C
    </span>

</td>

                                <td>{v.driver}</td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

            {/* ================= Fault Prone Vehicles ================= */}

            <div className="insight-card">

                <div className="insight-card-header">

                    <div className="insight-card-title">
                        ⚠️ Fault Prone Vehicles
                    </div>

                    <div className="insight-card-subtitle">
                        Vehicles reporting the highest number of faults
                    </div>

                </div>

                <div className="insight-divider"></div>

                <table style={{ width: "100%" }}>

                    <thead>

                        <tr>

                            <th>Vehicle</th>
                            <th>Faults</th>
                            <th>OBD Code</th>

                        </tr>

                    </thead>

                    <tbody>

                        {data.fault_prone_vehicles.map((v) => (

                            <tr key={v.vehicle_id}>

                                <td>{v.vehicle_id}</td>

                                <td>{v.fault_count}</td>

                                <td>

                                    <a
                                        href={`https://www.obd-codes.com/${v.latest_fault.toLowerCase()}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{
                                            color: "#3b82f6",
                                            textDecoration: "none",
                                            fontWeight: "600"
                                        }}
                                    >
                                        {v.latest_fault}
                                    </a>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

            {/* ================= Fleet Health Summary ================= */}

            <div className="insight-card">

                <div className="insight-card-header">

                    <div className="insight-card-title">
                        ❤️ Fleet Health Summary
                    </div>

                    <div className="insight-card-subtitle">
                        Overall health score of the fleet
                    </div>

                </div>

                <div className="insight-divider"></div>

                <table style={{ width: "100%" }}>

                    <thead>

                        <tr>

                            <th>Vehicle</th>
                            <th>Score</th>
                            <th>Status</th>

                        </tr>

                    </thead>

                    <tbody>

                        {data.vehicle_health
                            .slice(0, 10)
                            .map((v) => (

                                <tr key={v.vehicle_id}>

                                    <td>{v.vehicle_id}</td>

                                    <td>{v.score}%</td>

                                    <td>{v.status}</td>

                                </tr>

                            ))}

                    </tbody>

                </table>

            </div>

        </div>

    );

}