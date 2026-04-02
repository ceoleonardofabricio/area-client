const API_URL = "http://127.0.0.1:8000";

export async function createClient(data) {
    const response = await fetch(`${API_URL}/clients`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.detail || "Erro ao cadastrar cliente");
    }

    return result;
}

export async function getClients() {
    const response = await fetch(`${API_URL}/clients`, {
        method: "GET",
        cache: "no-store",
    });

    if (!response.ok) {
        throw new Error("Erro ao buscar clientes");
    }

    return response.json();
}

export async function deleteClient(clientId, adminPassword) {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}/clients/${clientId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            admin_password: adminPassword,
        }),
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.detail || "Erro ao excluir cliente");
    }

    return result;
}