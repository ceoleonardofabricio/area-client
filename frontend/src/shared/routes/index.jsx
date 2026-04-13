import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import AppLogin from "../../app/pages/Login/Login";
import PrivateRoute from "./PrivateRoute";

// ADMIN
import AppDashboard from "../../app/pages/Dashboard/Dashboard";
import Clientes from "../../app/pages/Clientes/Clientes";

// CLIENT
import ClientDashboard from "../../client/pages/Dashboard/Dashboard";
import Management from "../../client/pages/Management/Management";

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                {/* LOGIN */}
                <Route path="/appclient/login" element={<AppLogin />} />

                {/* ADMIN */}
                <Route
                    path="/appclient/dashboard"
                    element={
                        <PrivateRoute allowedTypes={["admin", "colaborador"]}>
                            <AppDashboard />
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/appclient/clientes"
                    element={
                        <PrivateRoute allowedTypes={["admin", "colaborador"]}>
                            <Clientes />
                        </PrivateRoute>
                    }
                />

                {/* CLIENT */}
                <Route
                    path="/client/dashboard"
                    element={
                        <PrivateRoute allowedTypes={["cliente"]}>
                            <ClientDashboard />
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/client/management"
                    element={
                        <PrivateRoute allowedTypes={["cliente"]}>
                            <Management />
                        </PrivateRoute>
                    }
                />

                {/* FALLBACK */}
                <Route path="*" element={<Navigate to="/appclient/login" />} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;