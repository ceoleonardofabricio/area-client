import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getMe } from "../services/authService";

function PrivateRoute({ children, allowedTypes }) {
    const [loading, setLoading] = useState(true);
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
        async function validateUser() {
            const token = localStorage.getItem("token");
            const user = JSON.parse(localStorage.getItem("user"));

            if (!token || !user) {
                setIsAuthorized(false);
                setLoading(false);
                return;
            }

            try {
                const data = await getMe();

                if (allowedTypes && !allowedTypes.includes(data.user.type)) {
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                    setIsAuthorized(false);
                    setLoading(false);
                    return;
                }

                setIsAuthorized(true);
                setLoading(false);
            } catch {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                setIsAuthorized(false);
                setLoading(false);
            }
        }

        validateUser();
    }, [allowedTypes]);

    if (loading) {
        return null;
    }

    if (!isAuthorized) {
        return <Navigate to="/appclient/login" replace />;
    }

    return children;
}

export default PrivateRoute;