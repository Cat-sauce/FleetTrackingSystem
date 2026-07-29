import { useEffect, useState } from "react";
import api from "../services/api";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

import FleetHealth from "../components/FleetHealth";
import FaultSummary from "../components/FaultSummary";
import ActiveAlerts from "../components/ActiveAlerts";
import VehicleDetails from "../components/VehicleDetails";
import AlertHistory from "../components/AlertHistory";

import "../styles/alerts.css";

export default function Alerts() {

    const [history, setHistory] = useState([]);
    const [active, setActive] = useState([]);
    const [vehicles, setVehicles] = useState([]);

    const [selected, setSelected] = useState(null);
    const [selectedVehicle, setSelectedVehicle] = useState(null);

    const [latestEvent, setLatestEvent] = useState(null);

    useEffect(() => {

        load();

        const interval = setInterval(load, 1000);

        return () => clearInterval(interval);

    }, []);

    async function load() {

        try {

            const historyRes = await api.get("/events");
            const activeRes = await api.get("/events/active");
            const vehiclesRes = await api.get("/vehicles");

            if (
                historyRes.data.length &&
                (
                    !latestEvent ||
                    historyRes.data[0].time !== latestEvent.time ||
                    historyRes.data[0].vehicle !== latestEvent.vehicle
                )
            ) {

                setLatestEvent(historyRes.data[0]);

            }

            setHistory(historyRes.data);
            setActive(activeRes.data);
            setVehicles(vehiclesRes.data);

        }

        catch (err) {

            console.error(err);

        }

    }

    // Selected vehicle object
    const vehicleDetails =
        vehicles.find(
            v => v.vehicle_id === selectedVehicle
        ) || null;

    return (

        <>

            <Navbar />

            <div className="alerts-layout">

                <Sidebar />

                <div className="alerts-content">

                    {/* Header */}

                    <div className="alerts-header">

                        <h1>Fleet Alerts</h1>

                        <p>
                            Monitor active incidents, vehicle faults and real-time fleet events
                        </p>

                    </div>

                    {/* Fleet Health */}

                    <div className="alerts-panel">

                        <div className="alerts-panel-header">

                            <div>

                                <div className="alerts-panel-title">

                                    Fleet Health

                                </div>

                                <div className="alerts-panel-subtitle">

                                    Live overview of fleet condition

                                </div>

                            </div>

                        </div>

                        <FleetHealth />

                    </div>

                    {/* Alert Summary */}

                    <div className="alerts-panel">

                        <div className="alerts-panel-header">

                            <div>

                                <div className="alerts-panel-title">

                                    Alert Summary

                                </div>

                                <div className="alerts-panel-subtitle">

                                    Distribution of current alert categories

                                </div>

                            </div>

                        </div>

                        <FaultSummary
                            alerts={active}
                            selected={selected}
                            setSelected={setSelected}
                        />

                    </div>

                    {/* Active Alerts + Vehicle Details */}

                    <div className="alerts-grid">

                        <ActiveAlerts
                            alerts={
                                selected
                                    ? active.filter(
                                        a => a.title === selected
                                    )
                                    : active
                            }
                            onVehicleSelect={setSelectedVehicle}
                            latestEvent={history[0]}
                        />

                        <VehicleDetails
                            vehicle={vehicleDetails}
                        />

                    </div>

                    {/* Alert History */}

                    <div className="alerts-panel">

                        <div className="alerts-panel-header">

                            <div>

                                <div className="alerts-panel-title">

                                    Alert History

                                </div>

                                <div className="alerts-panel-subtitle">

                                    Chronological record of fleet events

                                </div>

                            </div>

                        </div>

                        <AlertHistory
                            alerts={history}
                            latestEvent={latestEvent}
                        />

                    </div>

                </div>

            </div>

        </>

    );

}