import { useState } from "react";
import "./topbar.css";

function Topbar() {
    const user = JSON.parse(localStorage.getItem("user"));
    const [open, setOpen] = useState(false);

    function handleLogout() {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/appclient/login";
    }

    return (
        <div className="topbar">
            <div className="topbar-left">
                <div className="topbar-logo">M</div>

                <div className="topbar-breadcrumb">
                    <span className="topbar-breadcrumb-item">Dashboard</span>
                    <span className="topbar-breadcrumb-separator">/</span>
                    <span className="topbar-breadcrumb-current">AppClient</span>
                </div>
            </div>

            <div className="topbar-right">
                <div className="topbar-profile-wrapper">
                    <button
                        className="topbar-profile-button"
                        onClick={() => setOpen(!open)}
                    >
                        <div className="topbar-profile-avatar">
                            {user?.name?.[0] || user?.email?.[0] || "U"}
                        </div>
                    </button>

                    {open && (
                        <div className="topbar-dropdown">
                            <button
                                className="topbar-dropdown-item"
                                onClick={handleLogout}
                            >
                                Sair
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Topbar;