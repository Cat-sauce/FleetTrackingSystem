import React from "react";
import "leaflet/dist/leaflet.css";
import ReactDOM from "react-dom/client";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import { NotificationProvider } from "./context/NotificationContext";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <NotificationProvider>
            <App />
        
        {/* <ToastContainer
        position="bottom-right"
        newestOnTop
        theme="dark"
        /> */}
        </NotificationProvider>
    </React.StrictMode>
);