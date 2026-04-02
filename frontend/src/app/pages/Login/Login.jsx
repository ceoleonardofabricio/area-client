import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import { loginUser } from "../../../shared/services/authService";

function AppLogin() {
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        const user = JSON.parse(localStorage.getItem("user"));

        if (token && user) {
            if (user.type === "admin" || user.type === "colaborador") {
                navigate("/appclient/dashboard");
                return;
            }

            if (user.type === "cliente") {
                navigate("/client/dashboard");
                return;
            }
        }
    }, [navigate]);

    function handleChange(e) {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    async function handleSubmit(e) {
        e.preventDefault();

        console.log("Form enviado:", form);

        try {
            const data = await loginUser(form);
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            console.log("Login realizado:", data);

            if (data.user?.type === "admin" || data.user?.type === "colaborador") {
                navigate("/appclient/dashboard");
                return;
            }

            if (data.user?.type === "cliente") {
                navigate("/client/dashboard");
                return;
            }

            console.error("Tipo de usuário não reconhecido");
        } catch (error) {
            console.error("Erro no login:", error);
        }
    }

    return (
        <div className="app-login-page">
            <div className="app-login-card">
                <div className="app-login-form-side">
                    <form onSubmit={handleSubmit} className="app-login-form">
                        <div className="app-login-heading">
                            <span className="app-login-badge">Área interna</span>

                            <h1 className="app-login-title">Login</h1>

                            <p className="app-login-description">
                                Entre para acessar o painel administrativo da Mevion.
                            </p>
                        </div>

                        <div className="app-login-field">
                            <label className="app-login-label">E-mail</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="seuemail@empresa.com"
                                value={form.email}
                                onChange={handleChange}
                                className="app-login-input"
                            />
                        </div>

                        <div className="app-login-field">
                            <label className="app-login-label">Senha</label>
                            <input
                                type="password"
                                name="password"
                                placeholder="Digite sua senha"
                                value={form.password}
                                onChange={handleChange}
                                className="app-login-input"
                            />
                        </div>

                        <button type="submit" className="app-login-button">
                            Entrar
                        </button>
                    </form>
                </div>

                <div className="app-login-visual-side">
                    <div className="app-login-visual-glow" />

                    <div className="app-login-visual-placeholder">
                        <div>
                            <p>Espaço reservado</p>
                            <h2>Sua imagem entra aqui</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AppLogin;