import { useMemo, useState } from "react";

export default function VehicleHealth({ data }) {

    const [expanded, setExpanded] = useState(false);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("All");

    const filtered = useMemo(() => {

        if (!data) return [];

        return data.filter(v => {

            const matchesSearch =
                v.vehicle_id.toLowerCase().includes(search.toLowerCase());

            const matchesFilter =
                filter === "All" || v.status === filter;

            return matchesSearch && matchesFilter;

        });

    }, [data, search, filter]);

    if (!data) return null;

    return (

        <div className="analytics-section">

            <div
                className="analytics-section-title"
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                }}
            >

                <span>Vehicle Health</span>

                <button
                    className="vehicle-toggle-btn"
                    onClick={() => setExpanded(!expanded)}
                >
                    {expanded ? "Hide" : "Show"} ({data.length})
                </button>

            </div>

            {expanded && (

                <>

                    <div className="vehicle-health-toolbar">

                        <input
                            placeholder="Search Vehicle..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />

                        <select
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                        >

                            <option>All</option>
                            <option>Excellent</option>
                            <option>Good</option>
                            <option>Needs Service</option>
                            <option>Critical</option>

                        </select>

                    </div>

                    <div className="vehicle-health-grid">

                        {filtered.map(vehicle => (

                            <div
                                key={vehicle.vehicle_id}
                                className="vehicle-health-card"
                            >

                                <h3>{vehicle.vehicle_id}</h3>

                                <div>

                                    Health Score

                                    <strong>

                                        {vehicle.score}%

                                    </strong>

                                </div>

                                <div>

                                    Status

                                    <strong>

                                        {vehicle.status}

                                    </strong>

                                </div>

                            </div>

                        ))}

                    </div>

                </>

            )}

        </div>

    );

}