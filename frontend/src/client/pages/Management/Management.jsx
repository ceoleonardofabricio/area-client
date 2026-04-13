import ClientLayout from "../../layout/ClientLayout";
import Approvals from "./components/Approvals";

function Management() {
    return (
        <ClientLayout>
            <div style={{ paddingTop: "8px" }}>
                <h1 style={{ margin: 0, fontSize: "52px", lineHeight: 1.05 }}>
                    Management
                </h1>

                <p
                    style={{
                        marginTop: "10px",
                        color: "#667085",
                        fontSize: "18px",
                    }}
                >
                    Gerencie aprovações, materiais e entregas do seu projeto.
                </p>

                <div style={{ marginTop: "28px" }}>
                    <Approvals />
                </div>
            </div>
        </ClientLayout>
    );
}

export default Management;