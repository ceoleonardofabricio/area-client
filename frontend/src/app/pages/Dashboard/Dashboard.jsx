import AppLayout from "../../layout/AppLayout";
import Card from "../../../shared/components/Card";

function AppDashboard() {

    function handleLogout() {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/appclient/login";
    }

    return (
        <AppLayout>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h1>Dashboard Admin</h1>

                <button
                    onClick={handleLogout}
                    style={{
                        padding: "10px 16px",
                        borderRadius: "10px",
                        border: "none",
                        cursor: "pointer",
                        background: "#ef4444",
                        color: "#fff",
                        fontWeight: 600,
                    }}
                >
                    Sair
                </button>
            </div>

            <div className="dashboard-grid">
                <Card title="Clientes" value="12" />
                <Card title="Projetos" value="8" />
                <Card title="Ativos" value="5" />
            </div>
        </AppLayout>
    );
}

export default AppDashboard;