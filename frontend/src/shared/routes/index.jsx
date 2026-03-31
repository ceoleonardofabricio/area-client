import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// ADMIN
import AppDashboard from "../../app/pages/Dashboard/Dashboard";
import Clientes from "../../app/pages/Clientes/Clientes";

// CLIENT
import ClientDashboard from "../../client/pages/Dashboard/Dashboard";

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/appclient/dashboard" element={<AppDashboard />} />
                <Route path="/appclient/clientes" element={<Clientes />} />

                <Route path="/client/dashboard" element={<ClientDashboard />} />

                <Route path="*" element={<Navigate to="/appclient/dashboard" />} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;