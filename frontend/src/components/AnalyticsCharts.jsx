import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid
} from "recharts";

const COLORS = [
    "#22c55e",
    "#eab308",
    "#ef4444",
    "#3b82f6",
    "#8b5cf6",
    "#f97316",
    "#06b6d4",
    "#ec4899"
];

const obdDescriptions = {
    P0171: "System Too Lean (Bank 1)",
    P0300: "Random Misfire Detected",
    P0420: "Catalyst Efficiency Below Threshold",
    P0455: "EVAP System Leak",
    P0500: "Vehicle Speed Sensor Fault",
    P0128: "Coolant Temperature Below Thermostat",
    P0101: "Mass Air Flow Sensor Performance",
    P0113: "Intake Air Temperature Sensor High",
    P0201: "Injector Circuit Cylinder 1",
    P0700: "Transmission Control System Fault"
};

export default function AnalyticsCharts({ data }) {

    if (!data) return null;
    const faultColorMap = {};
    data.fault_distribution.forEach((item, index) => {
    faultColorMap[item.fault] = COLORS[index % COLORS.length];
    });

    const statusColorMap = {};
    data.status_distribution.forEach((item, index) => {
    statusColorMap[item.status] = COLORS[index % COLORS.length];

    });

    return (

        <div className="analytics-chart-grid">

            {/* Vehicle Status */}

            <div className="analytics-chart-card">

                <div className="chart-header">

                    <h3>Vehicle Status</h3>

                    <p>Fleet health distribution</p>

                </div>

                <div
    style={{
        height:1,
        background:"#2f3741",
        marginBottom:"18px"
    }}
/>

                <ResponsiveContainer width="100%" height={340}>

                    <PieChart>

                        <Pie
                            data={data.status_distribution}
                            dataKey="count"
                            nameKey="status"
                            outerRadius={105}
                            label
                            
                            strokeWidth={1}
                        >

                            {data.status_distribution.map((entry, index) => (

                                <Cell
    key={index}
    fill={statusColorMap[entry.status]}
/>

                            ))}

                        </Pie>

                        <Tooltip />

                        <Legend />

                    </PieChart>

                </ResponsiveContainer>

            </div>


            <div className="analytics-chart-card">   

                <div className="chart-header">

                    <h3>Fault Distribution</h3>

                    <p>OBD fault codes detected</p>

                </div>

                <div
    style={{
        height:1,
        background:"#2f3741",
        marginBottom:"18px"
    }}
/>

                <ResponsiveContainer width="100%" height={340}>

                    <PieChart>

                        <Pie
                            data={data.fault_distribution}
                            dataKey="count"
                            nameKey="fault"
                            outerRadius={105}
                            label
                        >

                            {data.fault_distribution.map((entry, index) => (

                                <Cell
    key={index}
    fill={faultColorMap[entry.fault]}
/>

                            ))}

                        </Pie>

                        <Tooltip />

                    </PieChart>

                </ResponsiveContainer>

                {/* Clickable OBD Legend */}

            

            </div>

            <div
                    style={{
                        marginTop: "20px",
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
                        gap: "12px"
                    }}
                >

                    {data.fault_distribution
                        .filter(item => item.fault !== "None")
                        .map((item, index) => (

                            <div
                                key={item.fault}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "12px",
                                    background: "#1d232a",
                                    padding: "12px 16px",
                                    borderRadius: "10px",
                                    border: "1px solid #2f3741"
                                }}
                            >

                                <div
                                    style={{
                                        width: 14,
                                        height: 14,
                                        borderRadius: "50%",
                                        background:
                                            faultColorMap[item.fault]
                                    }}
                                />

                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "column"
                                    }}
                                >

                                    <a
                                        href={`https://www.obd-codes.com/${item.fault.toLowerCase()}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{
                                            color: "#60a5fa",
                                            fontWeight: 700,
                                            textDecoration: "none",
                                            fontSize: "15px"
                                        }}
                                    >
                                        {item.fault}
                                    </a>

                                    <span
                                        style={{
                                            color: "#cbd5e1",
                                            fontSize: "13px"
                                        }}
                                    >
                                        {
                                            obdDescriptions[item.fault] ||
                                            "Click to view complete diagnostic information."
                                        }
                                    </span>

                                </div>

                            </div>

                        ))}

                </div>

        </div>

    );

}