import { useEffect, useState } from "react";
import api from "../services/api";

export default function FleetHealth() {

    const [health, setHealth] = useState(null);

    useEffect(() => {

        load();

        const interval = setInterval(load, 1000);

        return () => clearInterval(interval);

    }, []);

    async function load() {

        const res = await api.get("/health");

        setHealth(res.data);

    }

    if (!health) return null;

    return (

        <div className="fleet-health-grid">

            <Card
                title="Fleet Health"
                value={`${health.fleet_health}%`}
                subtitle="Overall Fleet Score"
                color="#22c55e"
                progress={health.fleet_health}
            />

            <Card
                title="Healthy"
                value={health.healthy}
                subtitle="Vehicles"
                color="#3b82f6"
                progress={100}
            />

            <Card
                title="Warnings"
                value={health.warning}
                subtitle="Need Attention"
                color="#f59e0b"
                progress={100}
            />

            <Card
                title="Critical"
                value={health.critical}
                subtitle="Immediate Action"
                color="#ef4444"
                progress={100}
            />

            <Card
                title="Active Faults"
                value={health.active_faults}
                subtitle="Open Faults"
                color="#8b5cf6"
                progress={100}
            />

        </div>

    );

}

function Card({
    title,
    value,
    subtitle,
    color,
    progress
}) {

    return (

        <div
            className="health-card"
            style={{
                "--card-color": color
            }}
        >

            <div className="health-title">
                {title}
            </div>

            <div className="health-value">
                {value}
            </div>

            <div className="health-subtitle">
                {subtitle}
            </div>

            <div className="health-bar">

                <div
                    className="health-bar-fill"
                    style={{
                        width: `${progress}%`
                    }}
                />

            </div>

        </div>

    );

}