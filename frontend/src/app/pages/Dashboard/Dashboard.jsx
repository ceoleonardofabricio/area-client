import AppLayout from "../../layout/AppLayout";
import Card from "../../../shared/components/Card";

function AppDashboard() {
    return (
        <AppLayout>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <h1>Dashboard Admin</h1>
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