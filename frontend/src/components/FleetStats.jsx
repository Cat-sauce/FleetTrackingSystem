import "../styles/FleetStats.css";

export default function FleetStats({ vehicles }) {

    const moving =
        vehicles.filter(v => v.speed > 0).length;

    const idle =
        vehicles.length - moving;

    const warning =
        vehicles.filter(v =>
            v.speed > 90 ||
            v.fuel_level < 15
        ).length;

    const critical =
        vehicles.filter(v =>
            v.engine_temp > 102 ||
            v.obd_code
        ).length;

    return (

        <div className="fleet-stats">

            <div className="fleet-card blue">

                <h3>{vehicles.length}</h3>

                <p>Total Vehicles</p>

            </div>

            <div className="fleet-card green">

                <h3>{moving}</h3>

                <p>Moving</p>

            </div>

            <div className="fleet-card yellow">

                <h3>{idle}</h3>

                <p>Idle</p>

            </div>

            <div className="fleet-card orange">

                <h3>{warning}</h3>

                <p>Warnings</p>

            </div>

            <div className="fleet-card red">

                <h3>{critical}</h3>

                <p>Critical</p>

            </div>

        </div>

    );

}