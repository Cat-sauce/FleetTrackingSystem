import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    LabelList
} from "recharts";

export default function DriverRatings({ data }) {

    if (!data) return null;

    return (

        <div className="analytics-chart-card">

            <div className="chart-header">

                <h3>Driver Ratings</h3>

                <p>
                    Performance score calculated from driving behaviour
                </p>

            </div>

            <ResponsiveContainer width="100%" height={420}>

                <BarChart
                    data={data}
                    layout="vertical"
                    margin={{
                        left: 30,
                        right: 20
                    }}
                >

                    <CartesianGrid strokeDasharray="3 3"/>

                    <XAxis
                        type="number"
                        domain={[0,100]}
                    />

                    <YAxis
                        type="category"
                        dataKey="driver"
                        width={90}
                    />

                    <Tooltip/>

                    <Bar
                        dataKey="rating"
                        fill="#3b82f6"
                        radius={[0,8,8,0]}
                    >

                        <LabelList
                            dataKey="rating"
                            position="right"
                        />

                    </Bar>

                </BarChart>

            </ResponsiveContainer>

        </div>

    );

}