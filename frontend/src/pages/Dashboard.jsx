import FleetHeader from "../components/FleetHeader";
import { useEffect, useState } from "react";

import Layout from "../components/Layout";

import api from "../services/api";
import KPICard from "../components/KPICard";

export default function Dashboard(){

    const [metrics,setMetrics]=useState({});

    useEffect(()=>{

        load();

        const interval=setInterval(load,3000);

        return ()=>clearInterval(interval);

    },[]);

    async function load() {
    try {
        const res = await api.get("/analytics/overview");

        setMetrics(res.data);

    } catch (err) {
        console.error(err);
    }
}

    return (

    <Layout>

        <FleetHeader/>
        <div className="dashboard-kpis">

    <KPICard
        title="Vehicles"
        value={metrics.vehicles}
        subtitle="Vehicles Online"
        color="#3b82f6"
    />

    <KPICard
        title="Trips"
        value={metrics.trips}
        subtitle="Trips Completed"
        color="#10b981"
    />

    <KPICard
        title="Average Speed"
        value={`${metrics.avg_speed?.toFixed(1)} km/h`}
        subtitle="Fleet Average"
        color="#f59e0b"
    />

    <KPICard
        title="Active Faults"
        value={metrics.active_faults}
        subtitle="Needs Attention"
        color="#ef4444"
    />

    <KPICard
        title="Average Fuel"
        value={`${metrics.fuel_remaining?.toFixed(1)}%`}
        subtitle="Fleet fuel remaining"
        color="#8b5cf6"
    />

    <KPICard
        title="Engine Temp"
        value={`${metrics.avg_engine_temp?.toFixed(1)}°`}
        subtitle="Average engine temperature"
        color="#6366f1"
    />

</div>

    </Layout>

);

}