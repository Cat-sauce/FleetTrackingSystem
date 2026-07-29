import KPICard from "./KPICard";

export default function StatsCards({ metrics }) {

    return (

        <div
            style={{
                display: "grid",
                gridTemplateColumns:"repeat(3,1fr)",
                gap: "20px",
                marginBottom: "20px"
            }}
        >

            <KPICard
                title="Vehicles"
                value={metrics.vehicles ?? 0}
                subtitle="Vehicles Online"
                icon="🚚"
                color="#3b82f6"
            />

            <KPICard
                title="Trips"
                value={metrics.trips ?? 0}
                subtitle="Trips Completed"
                icon="🛣️"
                color="#22c55e"
            />

            <KPICard
                title="Average Speed"
                value={`${(metrics.avg_speed ?? 0).toFixed(1)} km/h`}
                subtitle="Fleet Average"
                icon="⚡"
                color="#f59e0b"
            />

            <KPICard
                title="Active Faults"
                value={metrics.active_faults ?? 0}
                subtitle="Needs Attention"
                icon="🚨"
                color="#ef4444"
            />

            <KPICard
    title="Average Fuel"
    value={`${metrics.fuel_remaining?.toFixed(1)}%`}
    subtitle="Fleet fuel remaining"
    color="#6C3BAA"
/>

<KPICard
    title="Engine Temp"
    value={`${metrics.avg_engine_temp?.toFixed(1)}°`}
    subtitle="Average engine temperature"
    color="#CCCCFF"
/>

        </div>

    );

}