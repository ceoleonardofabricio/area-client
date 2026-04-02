const API_URL = "http://127.0.0.1:8000";

export async function loginUser(data) {
    const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error("Falha ao realizar login");
    }

    return response.json();
}

// 🔐 Headers com token
export function getAuthHeaders() {
    const token = localStorage.getItem("token");

    return {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
    };
}

// 🔍 Verificar usuário logado (usa /auth/me)
export async function getMe() {
    const response = await fetch(`${API_URL}/auth/me`, {
        method: "GET",
        headers: getAuthHeaders(),
    });

    if (!response.ok) {
        throw new Error("Não autenticado");
    }

    return response.json();
}