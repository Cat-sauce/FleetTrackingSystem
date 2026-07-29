import "../styles/navbar.css";

export default function Navbar() {

    return (

        <div className="navbar">

            {/* Left */}

            <div className="navbar-left">

                <img
                    src="/logo.png"
                    alt="FleetOS"
                    className="navbar-logo"
                />

                <div>

                    <div className="navbar-title">
                        FleetOS
                    </div>

                    <div className="navbar-subtitle">
                        Fleet Operating System
                    </div>

                </div>

            </div>

            {/* Right */}

            <div className="navbar-status">

    <div className="navbar-connected">
        ● Connected
    </div>

    <div className="navbar-title">
        Live Fleet Monitoring
    </div>

    <div className="navbar-subtitle">
        Real-time Telemetry
    </div>

</div>

                

            </div>

    );

}