import { useMemo, useState } from "react";

export default function VehicleHealthTable({ data }) {

    const [show, setShow] = useState(false);

    const [search, setSearch] = useState("");

    const filtered = useMemo(() => {

        if (!data) return [];

        return data.filter(vehicle =>

            vehicle.vehicle_id
            .toLowerCase()
            .includes(search.toLowerCase())

        );

    }, [data, search]);

    return (

        <div className="analytics-chart-card">

            <div className="chart-header">

                <h3>Vehicle Health</h3>

                <button
                    className="toggle-btn"
                    onClick={() => setShow(!show)}
                >
                    {show ? "Hide" : `Show (${data.length})`}
                </button>

            </div>

            {show && (

                <>

                    <input

                        className="vehicle-search"

                        placeholder="Search Vehicle ID..."

                        value={search}

                        onChange={(e)=>setSearch(e.target.value)}

                    />

                    <table className="health-table">

                        <thead>

                            <tr>

                                <th>Vehicle</th>

                                <th>Health</th>

                                <th>Status</th>

                            </tr>

                        </thead>

                        <tbody>

                            {filtered.map(vehicle=>(

                                <tr key={vehicle.vehicle_id}>

                                    <td>{vehicle.vehicle_id}</td>

                                    <td>

                                        <div className="health-bar">

                                            <div

                                                className="health-fill"

                                                style={{

                                                    width:`${vehicle.score}%`

                                                }}

                                            />

                                        </div>

                                        {vehicle.score}%

                                    </td>

                                    <td>

                                        <span className={`status ${vehicle.status.toLowerCase().replace(" ","-")}`}>

                                            {vehicle.status}

                                        </span>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </>

            )}

        </div>

    );

}