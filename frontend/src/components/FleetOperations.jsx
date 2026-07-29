import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip
} from "recharts";

import TopFuelConsumers from "./TopFuelConsumers";

export default function FleetOperations({ data }) {

    if (!data) return null;

    return (

        <div
            style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "24px"
            }}
        >

            {/* Trips per Route */}

            <div className="analytics-chart-card">

                <div className="chart-header">

                    <h3>Trips per Route</h3>

                    <p>Fleet route utilization</p>

                </div>

                <div
                    style={{
                        height: 1,
                        background: "#2f3741",
                        marginBottom: "18px"
                    }}
                />

                <ResponsiveContainer width="100%" height={340}>

                    <BarChart data={data.route_distribution}>

                        <CartesianGrid strokeDasharray="3 3" />

                        <XAxis dataKey="route" />

                        <YAxis />

                        <Tooltip />

                        <Bar
                            dataKey="count"
                            fill="#3b82f6"
                            radius={[8,8,0,0]}
                        />

                    </BarChart>

                </ResponsiveContainer>

            </div>

            {/* Fuel */}

            <TopFuelConsumers
                data={data.top_fuel_consumers}
            />

        </div>

    );

}