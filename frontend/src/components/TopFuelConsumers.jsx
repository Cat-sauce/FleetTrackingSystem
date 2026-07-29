import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid
} from "recharts";

export default function TopFuelConsumers({ data }) {

    if (!data) return null;

    return (

        <div className="analytics-chart-card">

            <div className="chart-header">

                <h3>Top Fuel Consuming Vehicles</h3>

                <p>
                    Highest fuel usage across the fleet
                </p>

            </div>

            <ResponsiveContainer
                width="100%"
                height={350}
            >

                <BarChart
                    data={data}
                    layout="vertical"
                >

                    <CartesianGrid
                        strokeDasharray="3 3"
                    />

                    <XAxis
                        type="number"
                    />

                    <YAxis
                        dataKey="vehicle_id"
                        type="category"
                        width={70}
                    />

                    <Tooltip
    formatter={(value) => [
        `${value.toFixed(2)} %`,
        "Fuel Used"
    ]}
/>

                    <Bar
                        dataKey="fuel_used"
                        fill="#ef4444"
                        radius={[0,8,8,0]}
                    />

                </BarChart>

            </ResponsiveContainer>

        </div>

    );

}