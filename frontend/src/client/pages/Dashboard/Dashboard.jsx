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
            <div>
                <h1>
                    Boas-vindas, {user?.name || "Cliente"}
                </h1>
                <p>Área do cliente</p>
            </div>
        </ClientLayout>
    );
}

export default ClientDashboard;