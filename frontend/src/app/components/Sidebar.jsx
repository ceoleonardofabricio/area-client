import { NavLink } from "react-router-dom";
import "./sidebar.css";

function Sidebar() {
    return (
        <div className="sidebar">
            <div className="sidebar-top-link">
                <span className="sidebar-top-icon">◀</span>
                <span className="sidebar-top-text">AppClient</span>
            </div>

            <nav className="sidebar-nav">
                <NavLink
                    to="/appclient/dashboard"
                    className={({ isActive }) =>
                        isActive ? "sidebar-link active" : "sidebar-link"
                    }
                >
                    <span className="sidebar-link-icon">▦</span>
                    <span className="sidebar-link-text">Dashboard</span>
                </NavLink>

                <NavLink
                    to="/appclient/projetos"
                    className={({ isActive }) =>
                        isActive ? "sidebar-link active" : "sidebar-link"
                    }
                >
                    <span className="sidebar-link-icon">◘</span>
                    <span className="sidebar-link-text">Projetos</span>
                </NavLink>

                <NavLink
                    to="/appclient/clientes"
                    className={({ isActive }) =>
                        isActive ? "sidebar-link active" : "sidebar-link"
                    }
                >
                    <span className="sidebar-link-icon">◉</span>
                    <span className="sidebar-link-text">Clientes</span>
                </NavLink>
            </nav>
        </div>
    );
}

export default Sidebar;