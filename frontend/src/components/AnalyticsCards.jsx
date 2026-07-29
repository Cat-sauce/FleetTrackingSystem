import KPICard from "./KPICard";

export default function AnalyticsCards({ data }) {

    if (!data) return null;

    return (

        <div className="dashboard-kpis">

            <KPICard
                title="Vehicles"
                value={data.vehicles}
                subtitle="Connected Fleet"
                color="#3b82f6"
            />

            <KPICard
                title="Trips"
                value={data.trips}
                subtitle="Completed Trips"
                color="#10b981"
            />

            <KPICard
                title="Active Faults"
                value={data.active_faults}
                subtitle="Require Attention"
                color="#ef4444"
            />

            <KPICard
                title="Average Speed"
                value={`${data.avg_speed.toFixed(1)} km/h`}
                subtitle="Fleet Average"
                color="#8b5cf6"
            />

            <KPICard
                title="Fuel Remaining"
                value={`${data.fuel_remaining.toFixed(1)}%`}
                subtitle="Fleet Fuel"
                color="#f59e0b"
            />

            <KPICard
                title="Engine Temp"
                value={`${data.avg_engine_temp.toFixed(1)}°C`}
                subtitle="Average Temperature"
                color="#06b6d4"
            />

        </div>

    );
}