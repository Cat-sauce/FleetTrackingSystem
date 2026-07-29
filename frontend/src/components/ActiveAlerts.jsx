import { useState } from "react";
import FaultAge from "./FaultAge";

export default function ActiveAlerts({
    alerts,
    onVehicleSelect,
    latestEvent
}) {

    const [open, setOpen] = useState({
        engine: true,
        obd: false,
        fuel: false,
        speed: false
    });

    const active = alerts.filter(
        a => !a.title.includes("Cleared")
    );

    const engine = active.filter(
        a => a.title === "Engine Temperature"
    );

    const obd = active.filter(
        a => a.title === "OBD Fault"
    );

    const fuel = active.filter(
        a => a.title === "Low Fuel"
    );

    const speed = active.filter(
        a => a.title === "Overspeed"
    );

    function getCardStyle(type){

        switch(type){

            case "Engine Temperature":
                return {
                    background:"#7f1d1d",
                    borderLeft:"6px solid #ef4444"
                };

            case "OBD Fault":
                return {
                    background:"#78350f",
                    borderLeft:"6px solid #f59e0b"
                };

            case "Low Fuel":
                return {
                    background:"#854d0e",
                    borderLeft:"6px solid #facc15"
                };

            case "Overspeed":
                return {
                    background:"#1e3a8a",
                    borderLeft:"6px solid #3b82f6"
                };

            default:
                return {
                    background:"#374151",
                    borderLeft:"6px solid gray"
                };

        }

    }

    function Section(label, icon, keyName, data){

        return(

            <div style={{marginBottom:"20px"}}>

                <div
                    onClick={()=>setOpen({
                        ...open,
                        [keyName]:!open[keyName]
                    })}
                    style={{
                        ...getCardStyle(label),
                        padding:"14px 18px",
                        borderRadius:"12px",
                        display:"flex",
                        justifyContent:"space-between",
                        alignItems:"center",
                        cursor:"pointer",
                        transition:"0.25s"
                    }}
                >

                    <div
                        style={{
                            display:"flex",
                            alignItems:"center",
                            gap:"10px"
                        }}
                    >

                        <span
                            style={{
                                fontWeight:600
                            }}
                        >
                            {icon} {label}
                        </span>

                    </div>

                    <div
                        style={{
                            display:"flex",
                            alignItems:"center",
                            gap:"12px"
                        }}
                    >

                        <span
                            style={{
                                background:"#111827",
                                color:"#e2e8f0",
                                padding:"4px 12px",
                                borderRadius:"999px",
                                fontSize:"12px",
                                fontWeight:700
                            }}
                        >
                            {data.length}
                        </span>

                        <span>

                            {open[keyName] ? "▼" : "▶"}

                        </span>

                    </div>

                </div>

                {

                    open[keyName] &&

                    data.map(alert=>{

                        const newest =
                            latestEvent &&
                            latestEvent.vehicle===alert.vehicle &&
                            latestEvent.time===alert.time;

                        return(

                            <div

                                key={
                                    alert.vehicle+
                                    alert.title+
                                    alert.time
                                }

                                onClick={() => {
    console.log("Selected:", alert.vehicle);
    onVehicleSelect(alert.vehicle);
}}

                                onMouseEnter={(e)=>{
                                    e.currentTarget.style.transform="translateY(-3px)";
                                }}

                                onMouseLeave={(e)=>{
                                    e.currentTarget.style.transform="translateY(0px)";
                                }}

                                style={{

                                    ...getCardStyle(alert.title),

                                    boxShadow:newest
                                        ? "0 0 18px rgba(239,68,68,.55)"
                                        : "none",

                                    animation:newest
                                        ? "pulse 1s infinite"
                                        : "none",

                                    cursor:"pointer",

                                    marginTop:"14px",

                                    padding:"18px",

                                    borderRadius:"14px",

                                    display:"flex",

                                    justifyContent:"space-between",

                                    alignItems:"center",

                                    border:"1px solid rgba(255,255,255,.06)",

                                    transition:"all .25s"

                                }}

                            >

                                <div>

                                    <div
                                        style={{
                                            fontWeight:700,
                                            fontSize:"20px",
                                            color:"white"
                                        }}
                                    >

                                        {alert.vehicle}

                                    </div>

                                    <div
                                        style={{
                                            marginTop:"6px",
                                            color:"#d1d5db",
                                            fontWeight:600
                                        }}
                                    >

                                        {alert.title}

                                    </div>

                                    <div
                                        style={{
                                            marginTop:"12px",
                                            color:"#f8fafc",
                                            fontSize:"15px"
                                        }}
                                    >

                                        {alert.message}

                                    </div>

                                    <div
                                        style={{
                                            marginTop:"14px",
                                            color:"#d1d5db",
                                            fontSize:"13px"
                                        }}
                                    >

                                        <FaultAge
                                            startedAt={alert.started_at}
                                        />

                                    </div>

                                </div>

                                <div

                                    style={{

                                        background:
                                            alert.level==="danger"
                                            ? "#dc2626"
                                            : "#d97706",

                                        color:"white",

                                        padding:"7px 14px",

                                        borderRadius:"999px",

                                        fontSize:"11px",

                                        fontWeight:700,

                                        letterSpacing:"1px"

                                    }}

                                >

                                    {

                                        alert.level==="danger"
                                            ? "CRITICAL"
                                            : alert.level==="warning"
                                            ? "WARNING"
                                            : "LIVE"

                                    }

                                </div>

                            </div>

                        );

                    })

                }

            </div>

        );

    }

    return(

        <div
            style={{
                background:"#20252b",
                borderRadius:"16px",
                padding:"24px",
                border:"1px solid #2f3741",
                boxShadow:"0 8px 20px rgba(0,0,0,.18)"
            }}
        >

            <div
                style={{
                    display:"flex",
                    justifyContent:"space-between",
                    alignItems:"center",
                    marginBottom:"26px"
                }}
            >

                <div>

                    <div
                        style={{
                            fontSize:"22px",
                            fontWeight:700,
                            color:"white"
                        }}
                    >

                        Live Active Alerts

                    </div>

                    <div
                        style={{
                            marginTop:"5px",
                            color:"#94a3b8",
                            fontSize:"14px"
                        }}
                    >

                        Real-time fleet incidents requiring attention

                    </div>

                </div>

                <div
                    style={{
                        display:"flex",
                        alignItems:"center",
                        gap:"8px",
                        color:"#ef4444",
                        fontWeight:700
                    }}
                >

                    <span
                        style={{
                            width:"10px",
                            height:"10px",
                            borderRadius:"50%",
                            background:"#ef4444",
                            animation:"pulse 1.2s infinite"
                        }}
                    />

                    LIVE

                </div>

            </div>

            {Section("Engine Temperature","","engine",engine)}
            {Section("OBD Fault","","obd",obd)}
            {Section("Low Fuel","","fuel",fuel)}
            {Section("Overspeed","","speed",speed)}

        </div>

    );

}