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
    const response = await fetch(`${API_URL}/clients`);

    if (!response.ok) {
        throw new Error("Erro ao buscar clientes");
    }

    return response.json();
}