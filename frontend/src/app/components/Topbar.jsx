function Topbar() {
    const user = JSON.parse(localStorage.getItem("user"));

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
                <button className="topbar-profile-button" type="button">
                    <div className="topbar-profile-avatar">
                        {user?.name?.[0] || user?.email?.[0] || "U"}
                    </div>
                </button>
            </div>
        </div>
    );
}

export default Topbar;