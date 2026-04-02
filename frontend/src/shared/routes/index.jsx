import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import AppLogin from "../../app/pages/Login/Login";

// 🔐 IMPORTANDO O PrivateRoute (agora separado)
import PrivateRoute from "./PrivateRoute";

// ADMIN
import AppDashboard from "../../app/pages/Dashboard/Dashboard";
import Clientes from "../../app/pages/Clientes/Clientes";

// CLIENT
import ClientDashboard from "../../client/pages/Dashboard/Dashboard";

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

                {/* FALLBACK */}
                <Route path="*" element={<Navigate to="/appclient/login" />} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;