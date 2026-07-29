import { BrowserRouter, Routes, Route } from "react-router-dom";
import Analytics from "./pages/Analytics";
import Dashboard from "./pages/Dashboard";
import Alerts from "./pages/Alerts";
import NotificationDrawer from "./components/NotificationDrawer";
import Vehicles from "./pages/Vehicles";   

function App() {

    return (

        <BrowserRouter>

            <Routes>

                <Route
                    path="/"
                    element={<Dashboard />}
                />

                <Route
                    path="/vehicles"
                    element={<Vehicles />}
                />

                <Route
                    path="/alerts"
                    element={<Alerts />}
                />

                <Route
                    path="/analytics"
                    element={<Analytics/>}
                />

            </Routes>
        </BrowserRouter>

    );

}

export default App;