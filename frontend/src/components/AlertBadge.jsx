import { useEffect, useState } from "react";
import api from "../services/api";

export default function AlertBadge() {

    const [alerts, setAlerts] = useState([]);

    useEffect(() => {

        load();

        const interval = setInterval(load, 1000);

        return () => clearInterval(interval);

    }, []);

    async function load() {

        try {

            const res = await api.get("/events/active");

            setAlerts(res.data);

        }

        catch(err){

            console.log(err);

        }

    }

    if(alerts.length===0) return null;

    const critical = alerts.filter(
        a => a.level==="danger"
    ).length;

    const badgeColor =
        critical>0
            ? "#ef4444"
            : "#f59e0b";

    return (

        <div
            className="alert-badge"
            style={{
                background: badgeColor
            }}
        >

            {alerts.length}

        </div>

    );

}