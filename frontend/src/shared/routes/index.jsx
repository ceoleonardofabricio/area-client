import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AppLogin from "../../app/pages/Login/Login";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

// ADMIN
import AppDashboard from "../../app/pages/Dashboard/Dashboard";
import Clientes from "../../app/pages/Clientes/Clientes";

// CLIENT
import ClientDashboard from "../../client/pages/Dashboard/Dashboard";

function PrivateRoute({ children, allowedTypes }) {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        const user = JSON.parse(localStorage.getItem("user"));

        if (!token || !user) {
            navigate("/appclient/login");
            return;
        }

        if (allowedTypes && !allowedTypes.includes(user.type)) {
            navigate("/appclient/login");
            return;
        }
    }, []);

    return children;
}

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/appclient/login" element={<AppLogin />} />
                <Route
                    path="/appclient/dashboard"
                    element={
                        <PrivateRoute allowedTypes={["admin", "colaborador"]}>
                            <AppDashboard />
                        </PrivateRoute>
                    }
                />
                <Route path="/appclient/clientes" element={<Clientes />} />

                <Route
                    path="/client/dashboard"
                    element={
                        <PrivateRoute allowedTypes={["cliente"]}>
                            <ClientDashboard />
                        </PrivateRoute>
                    }
                />

                <Route path="*" element={<Navigate to="/appclient/login" />} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;