import { useEffect, useState } from "react";
import api from "../services/api";
import FleetStats from "../components/FleetStats";
import "../styles/vehicles.css";
import KPICard from "../components/KPICard";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import FleetMap from "../components/FleetMap";
import VehicleTable from "../components/VehicleTable";
import VehicleDetails from "../components/VehicleDetails";
import VehicleFilters from "../components/VehicleFilters";

export default function Vehicles() {

    const [vehicles, setVehicles] = useState([]);
    const [selectedVehicleId, setSelectedVehicleId] = useState(null);

    const [search, setSearch] = useState("");
    const [routeFilter, setRouteFilter] = useState("All");
    const [statusFilter, setStatusFilter] = useState("All");

    useEffect(() => {

        load();

        const interval = setInterval(load, 3000);

        return () => clearInterval(interval);

    }, []);

    async function load() {

        const res = await api.get("/vehicles");

        setVehicles(res.data);

    }

    function getStatus(vehicle){

    if(vehicle.engine_temp >= 110 ||
       (vehicle.obd_code && vehicle.obd_code !== "None"))
        return "Critical";

    if(vehicle.engine_temp >= 95 ||
       vehicle.speed > 90 ||
       vehicle.fuel_level < 15)
        return "Warning";

    return "Healthy";

}

// ---------- KPI COUNTS ----------

const healthyCount = vehicles.filter(
    v => getStatus(v) === "Healthy"
).length;

const warningCount = vehicles.filter(
    v => getStatus(v) === "Warning"
).length;

const criticalCount = vehicles.filter(
    v => getStatus(v) === "Critical"
).length;

const movingCount = vehicles.filter(
    v => v.speed > 0
).length;

const idleCount = vehicles.length - movingCount;

const avgSpeed = vehicles.length
    ? (
        vehicles.reduce((sum, v) => sum + v.speed, 0) /
        vehicles.length
      ).toFixed(1)
    : 0;

const selectedVehicle = vehicles.find(
    v => v.vehicle_id === selectedVehicleId
);

// ---------- FILTER ----------

const filteredVehicles = vehicles.filter(vehicle => {

        const status = getStatus(vehicle);

        const matchesSearch =
            vehicle.vehicle_id
                .toLowerCase()
                .includes(search.toLowerCase()) ||

            vehicle.driver
                .toLowerCase()
                .includes(search.toLowerCase());

        const matchesRoute =
            routeFilter === "All" ||
            vehicle.route_id === routeFilter;

        const matchesStatus =
            statusFilter === "All" ||
            status === statusFilter;

        return (
            matchesSearch &&
            matchesRoute &&
            matchesStatus
        );

    });

    return (
        <>

            <Navbar />

            <div className="vehicles-layout">

                <Sidebar />

                <div className="vehicles-content">

                    <div className="vehicles-header">

                        <div>

                            <h1>Fleet Vehicles</h1>

                            <p>
                                Monitor every vehicle in real time across the network
                            </p>

                        </div>

                    </div>

                    <div className="dashboard-kpis">

    <KPICard
        title="Vehicles"
        value={vehicles.length}
        subtitle="Fleet Online"
        color="#3b82f6"
    />

    <KPICard
        title="Moving"
        value={movingCount}
        subtitle="Currently Moving"
        color="#10b981"
    />

    <KPICard
        title="Idle"
        value={idleCount}
        subtitle="Awaiting Dispatch"
        color="#f59e0b"
    />

    <KPICard
        title="Critical"
        value={criticalCount}
        subtitle="Immediate Action"
        color="#ef4444"
    />

    <KPICard
        title="Warnings"
        value={warningCount}
        subtitle="Need Attention"
        color="#8b5cf6"
    />

    <KPICard
        title="Average Speed"
        value={`${avgSpeed} km/h`}
        subtitle="Fleet Average"
        color="#06b6d4"
    />
</div>
                    <div className="vehicles-map-card">

                        <FleetMap
    vehicles={vehicles}
    selectedVehicle={selectedVehicleId}
    onVehicleSelect={setSelectedVehicleId}
    healthyCount={healthyCount}
    warningCount={warningCount}
    criticalCount={criticalCount}
/>

                    </div>

                    <VehicleFilters
                        search={search}
                        setSearch={setSearch}
                        routeFilter={routeFilter}
                        setRouteFilter={setRouteFilter}
                        statusFilter={statusFilter}
                        setStatusFilter={setStatusFilter}
                    />

                    <div className="vehicle-main">

                        <VehicleTable
    vehicles={filteredVehicles}
    selectedVehicleId={selectedVehicleId}
    setSelectedVehicle={setSelectedVehicleId}
    getStatus={getStatus}
/>

                        <VehicleDetails
    vehicle={selectedVehicle}
/>

                    </div>

                </div>

            </div>
        </>
    );

}