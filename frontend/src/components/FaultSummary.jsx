// Summary cards

export default function FaultSummary({
    alerts,
    selected,
    setSelected
}) {

    const active = alerts.filter(
        alert => !alert.title.includes("Cleared")
    );

    const engine = active.filter(
        a => a.title === "Engine Temperature"
    ).length;

    const obd = active.filter(
        a => a.title === "OBD Fault"
    ).length;

    const fuel = active.filter(
        a => a.title === "Low Fuel"
    ).length;

    const speed = active.filter(
        a => a.title === "Overspeed"
    ).length;

    const colors = {
        "Engine Temperature": "#ef4444",
        "OBD Fault": "#f59e0b",
        "Low Fuel": "#eab308",
        "Overspeed": "#3b82f6"
    };

    const cardStyle = (type) => ({

    flex: 1,

    position: "relative",

    overflow: "hidden",

    background: "#1f242d",

    borderRadius: "18px",

    padding: "22px",

    cursor: "pointer",

    transition: "all .28s ease",

    border:
        selected === type
            ? `2px solid ${colors[type]}`
            : "1px solid #313843",

    boxShadow:
        selected === type
            ? `0 0 18px ${colors[type]}55`
            : "0 8px 20px rgba(0,0,0,.20)",

    transform:
        selected === type
            ? "translateY(-5px)"
            : "translateY(0)",

    backgroundImage: `linear-gradient(
        135deg,
        ${colors[type]}22,
        transparent
    )`

});

    function SummaryCard(
        type,
        icon,
        title,
        value
    ) {

        return (

            <div
                style={cardStyle(type)}
                onMouseEnter={(e)=>{
                    if(selected!==type){
                        e.currentTarget.style.transform="translateY(-5px)";
                        e.currentTarget.style.borderColor=colors[type];
                        e.currentTarget.style.boxShadow=
                        `0 0 18px ${colors[type]}55`;
                    }
                }}
                onMouseLeave={(e)=>{
                    if(selected!==type){
                        e.currentTarget.style.transform="translateY(0px)";
                        e.currentTarget.style.borderColor="#313843";
                        e.currentTarget.style.boxShadow=
                        "0 8px 20px rgba(0,0,0,.20)";
                    }
                }}
                onClick={() =>
                    setSelected(
                    selected===type
                    ? null
                    : type
                    )
                }
        >
                

                <div
                    style={{
                        fontSize: "28px",
                        marginBottom: "10px"
                    }}
                >
                    {icon}
                </div>

                <div
                    style={{
                        color: "#9ca3af",
                        fontSize: "14px",
                        fontWeight: 600
                    }}
                >
                    {title}
                </div>

                <div
                    style={{
                        fontSize: "36px",
                        color: "white",
                        fontWeight: 700,
                        marginTop: "8px"
                    }}
                >
                    {value}
                </div>

                <div
                    style={{
                        color: "#94a3b8",
                        marginTop: "6px",
                        fontSize: "13px"
                    }}
                >
                    Active Alerts
                </div>

                <div
                    style={{
                        marginTop: "18px",
                        height: "5px",
                        borderRadius: "20px",
                        background: "#343c46"
                    }}
                >

                    <div
                        style={{
                            width: "100%",
                            height: "100%",
                            borderRadius: "20px",
                            background: colors[type]
                        }}
                    />

                </div>

            </div>

        );

    }

    return (

        <div
            style={{
                display: "grid",
                gridTemplateColumns: "repeat(4,1fr)",
                gap: "20px",
                marginBottom: "10px"
            }}
        >

            {SummaryCard(
                "Engine Temperature",
                "🔥",
                "Engine",
                engine
            )}

            {SummaryCard(
                "OBD Fault",
                "🚗",
                "OBD",
                obd
            )}

            {SummaryCard(
                "Low Fuel",
                "⛽",
                "Fuel",
                fuel
            )}

            {SummaryCard(
                "Overspeed",
                "⚠️",
                "Overspeed",
                speed
            )}

        </div>

    );

}