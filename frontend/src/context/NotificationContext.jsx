import { createContext, useContext, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import api from "../services/api";

const NotificationContext = createContext();

export function NotificationProvider({ children }) {
    const lastEvent = useRef(null);

    const shownAlerts = useRef(new Set());
    const [notifications, setNotifications] = useState([]);
    const [unread, setUnread] = useState(0);
    const [drawerOpen, setDrawerOpen] = useState(false);

    useEffect(() => {

        if ("Notification" in window) {
            Notification.requestPermission();
        }

        load();

        const interval = setInterval(load, 1000);

        return () => clearInterval(interval);

    }, []);

    async function load() {

        const res = await api.get("/events");

        setNotifications(res.data);

        if (!res.data.length) return;

        const newest = res.data[0];

        // If an alert was cleared, allow future notifications
        if (newest.title.includes("Cleared")) {
            const originalTitle = newest.title.replace(" Cleared", "");
            const key = newest.vehicle + originalTitle;
            shownAlerts.current.delete(key);
            return;
        }

        // Ignore duplicate polling
        if (
            lastEvent.current &&
            newest.vehicle === lastEvent.current.vehicle &&
            newest.time === lastEvent.current.time
        ) {
            return;
        }

        lastEvent.current = newest;

        // Only important alert types
        const important =
            newest.title === "Engine Temperature" ||
            newest.title === "OBD Fault" ||
            newest.title === "Overspeed" ||
            newest.title === "Low Fuel";

        if (!important)
            return;

        // Don't notify repeatedly for same active alert
        const key = newest.vehicle + newest.title;

        if (shownAlerts.current.has(key))
            return;

        shownAlerts.current.add(key);
        setUnread(prev => prev + 1);
        toast.error(
            `${newest.title}\n${newest.vehicle}`,
            {
                autoClose: 7000
            }
        );

        if (Notification.permission === "granted") {

            new Notification(newest.title, {
                body: `${newest.vehicle}\n${newest.message}`
            });

        }

    }

    return (

        <NotificationContext.Provider
            value={{
    notifications,
    unread,
    drawerOpen,
    setDrawerOpen,

    markAllRead: () => setUnread(0)
}}
        >

            {children}

        </NotificationContext.Provider>

    );

}

export function useNotifications() {

    return useContext(NotificationContext);

}