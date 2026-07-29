import "../styles/fleetHeader.css";

export default function FleetHeader() {
    return (
        <div className="fleet-header">

            <div className="fleet-header-left">

                <h1>Fleet Live Operations</h1>

                <p>
                    Real-time telemetry across the fleet
                </p>

            </div>

            <div className="fleet-header-right">

                <div className="fleet-pill gps">
                    GPS Synced
                </div>

                <div className="fleet-pill vehicles">
                    50 Vehicles
                </div>

                <div className="fleet-pill live">
                    LIVE
                </div>

            </div>

        </div>
    );
}