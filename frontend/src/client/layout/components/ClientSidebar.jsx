import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { getMe } from "../../../shared/services/authService";

function ClientSidebar() {
    const location = useLocation();
    const [user, setUser] = useState(null);

    useEffect(() => {
        async function loadUser() {
            try {
                const data = await getMe();
                setUser(data.user);
            } catch (error) {
                console.error("Erro ao buscar usuário:", error);
            }
        }

        loadUser();
    }, []);

    return (
        <aside className="client-sidebar">
            <div className="client-sidebar-brand">
                <span className="client-sidebar-brand-arrow">◀</span>
                <div className="client-sidebar-brand-text">
                    <strong>Olá, {user?.name || "Cliente"}</strong>
                    <span>Área do cliente</span>
                </div>
            </div>

            <nav className="client-sidebar-nav">
                <Link
                    to="/client/dashboard"
                    className={`client-sidebar-link ${location.pathname === "/client/dashboard" ? "active" : ""
                        }`}
                >
                    Dashboard
                </Link>

                <Link
                    to="/client/management"
                    className={`client-sidebar-link ${location.pathname === "/client/management" ? "active" : ""
                        }`}
                >
                    Management
                </Link>

                <Link
                    to="/client/suporte"
                    className={`client-sidebar-link ${location.pathname === "/client/suporte" ? "active" : ""
                        }`}
                >
                    Suporte
                </Link>

                <Link
                    to="/client/instituto"
                    className={`client-sidebar-link ${location.pathname === "/client/instituto" ? "active" : ""
                        }`}
                >
                    Instituto Elite
                </Link>
            </nav>
        </aside>
    );
}

export default ClientSidebar;