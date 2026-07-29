import "../styles/sidebar.css";
import AlertBadge from "./AlertBadge";
import {
    LayoutDashboard,
    Truck,
    BarChart3,
    TriangleAlert
} from "lucide-react";

import { NavLink } from "react-router-dom";

export default function Sidebar() {

    return (

        <div className="sidebar">

            <div className="sidebar-menu">

                MENU

            </div>

            <NavLink
                to="/"
                className={({ isActive }) =>
                    isActive ? "sidebar-link active" : "sidebar-link"
                }
            >
                <LayoutDashboard size={20}/>
                Dashboard
            </NavLink>

            <NavLink
                to="/vehicles"
                className={({ isActive }) =>
                    isActive ? "sidebar-link active" : "sidebar-link"
                }
            >
                <Truck size={20}/>
                Vehicles
            </NavLink>

            <NavLink
                to="/analytics"
                className={({ isActive }) =>
                    isActive ? "sidebar-link active" : "sidebar-link"
                }
            >
                <BarChart3 size={20}/>
                Analytics
            </NavLink>

            <NavLink
    to="/alerts"
    className={({ isActive }) =>
        isActive ? "sidebar-link active" : "sidebar-link"
    }
>

    <TriangleAlert size={20}/>

    <span className="sidebar-alert-label">

        Alerts

        <AlertBadge/>

    </span>

</NavLink>

        </div>

    );

}