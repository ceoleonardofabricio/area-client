import { NavLink } from "react-router-dom";
import "./sidebar.css";

function Sidebar() {
    return (
        <div>
            <h2 style={{ marginBottom: 20 }}>Admin</h2>

            <nav className="sidebar-nav">
                <NavLink
                    to="/appclient/dashboard"
                    className={({ isActive }) =>
                        isActive ? "sidebar-link active" : "sidebar-link"
                    }
                >
                    Dashboard
                </NavLink>

                <NavLink
                    to="/appclient/projetos"
                    className={({ isActive }) =>
                        isActive ? "sidebar-link active" : "sidebar-link"
                    }
                >
                    Projetos
                </NavLink>

                <NavLink
                    to="/appclient/clientes"
                    className={({ isActive }) =>
                        isActive ? "sidebar-link active" : "sidebar-link"
                    }
                >
                    Clientes
                </NavLink>
            </nav>
        </div>
    );
}

export default Sidebar;