import "../styles/kpi.css";

export default function KPICard({
    title,
    value,
    subtitle,
    color = "#3b82f6"
}) {

    return (

        <div
            className="kpi-card"
            onMouseEnter={(e)=>{
                e.currentTarget.style.border=`1px solid ${color}`;
            }}
            onMouseLeave={(e)=>{
                e.currentTarget.style.border="1px solid rgba(255,255,255,.05)";
            }}
        >

            <div
                className="kpi-glow"
                style={{
                    background:color
                }}
            />

            <div className="kpi-header">

                <div className="kpi-title">
                    {title}
                </div>

            </div>

            <div className="kpi-value">
                {value}
            </div>

            <div className="kpi-subtitle">
                {subtitle}
            </div>

        </div>

    );

}