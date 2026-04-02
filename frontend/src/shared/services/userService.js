const API_URL = "http://127.0.0.1:8000";

export async function createClient(data) {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}/users`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            name: data.name,
            email: data.email,
            password: data.password,
            type: "cliente",
        }),
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.detail || "Erro ao cadastrar cliente");
    }

    return result;
}