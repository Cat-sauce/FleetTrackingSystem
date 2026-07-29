import "../styles/VehicleFilters.css";

export default function VehicleFilters({
    search,
    setSearch,
    routeFilter,
    setRouteFilter,
    statusFilter,
    setStatusFilter
}) {

    function resetFilters() {
        setSearch("");
        setRouteFilter("All");
        setStatusFilter("All");
    }

    return (

        <div className="vehicle-filters">

            <div className="vehicle-search">

                <input
                    type="text"
                    placeholder="Search Vehicle / Driver..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

            </div>

            <div className="vehicle-select">

                <select
                    value={routeFilter}
                    onChange={(e) => setRouteFilter(e.target.value)}
                >
                    <option value="All">All Routes</option>
                    <option value="R01">R01</option>
                    <option value="R02">R02</option>
                    <option value="R03">R03</option>
                    <option value="R04">R04</option>
                    <option value="R05">R05</option>
                </select>

            </div>

            <div className="vehicle-select">

                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                >
                    <option value="All">All Status</option>
                    <option value="Healthy">Healthy</option>
                    <option value="Warning">Warning</option>
                    <option value="Critical">Critical</option>
                </select>

            </div>

            <button
                className="reset-filter-btn"
                onClick={resetFilters}
            >
                Reset
            </button>

        </div>

    );

}