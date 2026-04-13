import { useEffect, useState } from "react";
import ClientLayout from "../../layout/ClientLayout";
import { getMe } from "../../../shared/services/authService";

function ClientDashboard() {
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
        <ClientLayout>
            <div style={{ paddingTop: "8px" }}>
                <h1 style={{ margin: 0, fontSize: "52px", lineHeight: 1.05 }}>
                    Dashboard
                </h1>

                <p
                    style={{
                        marginTop: "10px",
                        color: "#667085",
                        fontSize: "18px",
                    }}
                >
                    Bem-vindo, {user?.name || "Cliente"}.
                </p>
            </div>
        </ClientLayout>
    );
}

export default ClientDashboard;