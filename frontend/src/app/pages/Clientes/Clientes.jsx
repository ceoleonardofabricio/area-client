import AppLayout from "../../layout/AppLayout";
import mockClients from "./mock-clients";

function Clientes() {
    return (
        <AppLayout>
            <h1>Clientes</h1>

            <div style={{ marginTop: 20 }}>
                {mockClients.map((client) => (
                    <div
                        key={client.id}
                        style={{
                            background: "#fff",
                            padding: 20,
                            borderRadius: 10,
                            marginBottom: 10,
                        }}
                    >
                        <strong>{client.nome}</strong>
                        <p>{client.responsavel}</p>
                        <span>{client.status}</span>
                    </div>
                ))}
            </div>
        </AppLayout>
    );
}

export default Clientes;