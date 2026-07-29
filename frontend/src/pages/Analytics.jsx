import { useEffect, useState } from "react";
import api from "../services/api";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

import AnalyticsCards from "../components/AnalyticsCards";
import AnalyticsCharts from "../components/AnalyticsCharts";
import FleetOperations from "../components/FleetOperations";
import DriverRatings from "../components/DriverRatings";
import VehicleHealthTable from "../components/VehicleHealthTable";
import AnalyticsTables from "../components/AnalyticsTables";

import "../styles/analytics.css";

export default function Analytics() {

    const [data, setData] = useState(null);

    useEffect(() => {

        load();

        const interval = setInterval(load, 5000);

        return () => clearInterval(interval);

    }, []);

    async function load() {

        try {

            const res = await api.get("/analytics/overview");

            console.clear();

            console.log(res.data);

            console.log("Driver Ratings:", res.data.driver_ratings);
            console.log("Vehicle Health:", res.data.vehicle_health);
            console.log("Fuel:", res.data.top_fuel_consumers);
            console.log("Fault Vehicles:", res.data.fault_prone_vehicles);

            setData(res.data);

        }
        catch (err) {

            console.error("Analytics API Error:", err);

        }

    }

    if (!data) {

        return (

            <div
                style={{
                    color: "white",
                    padding: "100px",
                    fontSize: "24px"
                }}
            >
                Loading Analytics...
            </div>

        );

    }

    return (

        <>

            <Navbar />

            <div className="analytics-layout">

                <Sidebar />

                <div className="analytics-content">

                    {/* ================= HEADER ================= */}

                    <div className="analytics-header">

                        <h1>Fleet Analytics</h1>

                        <p>
                            Monitor fleet performance, health and operational insights
                        </p>

                    </div>

                    {/* ================= KPI ================= */}

                    <AnalyticsCards data={data} />

                    {/* ================= FLEET HEALTH ================= */}

                    <div className="analytics-panel">

                        <div className="analytics-panel-header">

                            <div>

                                <div className="analytics-panel-title">

                                    Fleet Health

                                </div>

                                <div className="analytics-panel-subtitle">

                                    Vehicle status and diagnostic fault monitoring

                                </div>

                            </div>

                        </div>

                        <AnalyticsCharts data={data} />

                    </div>

                    {/* ================= FLEET OPERATIONS ================= */}

                    <div className="analytics-panel">

                        <div className="analytics-panel-header">

                            <div>

                                <div className="analytics-panel-title">

                                    Fleet Operations

                                </div>

                                <div className="analytics-panel-subtitle">

                                    Route utilization and fuel consumption

                                </div>

                            </div>

                        </div>

                        <FleetOperations data={data} />

                    </div>

                    {/* ================= DRIVER PERFORMANCE ================= */}

                    <div className="analytics-panel">

                        <div className="analytics-panel-header">

                            <div>

                                <div className="analytics-panel-title">

                                    Driver Performance

                                </div>

                                <div className="analytics-panel-subtitle">

                                    Driver ratings and vehicle condition overview

                                </div>

                            </div>

                        </div>

                        <DriverRatings
                            data={data.driver_ratings}
                        />

                        <div
                            style={{
                                marginTop: "40px"
                            }}
                        >

                            <VehicleHealthTable
                                data={data.vehicle_health}
                            />

                        </div>

                    </div>

                    {/* ================= VEHICLE INSIGHTS ================= */}

                    <div className="analytics-panel">

                        <div className="analytics-panel-header">

                            <div>

                                <div className="analytics-panel-title">

                                    Vehicle Insights

                                </div>

                                <div className="analytics-panel-subtitle">

                                    Speed, engine temperature and fault analysis

                                </div>

                            </div>

                        </div>

                        <AnalyticsTables data={data} />

                    </div>

                </div>

            </div>

        </>

    );

}