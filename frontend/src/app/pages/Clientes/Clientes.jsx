import AppLayout from "../../layout/AppLayout";
import mockClients from "./mock-clients";
import { useState } from "react";
import { createClient } from "../../../shared/services/userService";

function Clientes() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
    });

    function handleChange(e) {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const result = await createClient(form);
            console.log("Cliente criado:", result);

            alert("Cliente cadastrado com sucesso!");

            setForm({
                name: "",
                email: "",
                password: "",
            });
        } catch (error) {
            console.error(error);
            alert("Erro ao cadastrar cliente");
        }
    }

    return (
        <AppLayout>
            <h1>Clientes</h1>

            {/* FORMULÁRIO */}
            <form onSubmit={handleSubmit} style={{ marginTop: 20 }}>
                <input
                    type="text"
                    name="name"
                    placeholder="Nome"
                    value={form.name}
                    onChange={handleChange}
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Senha"
                    value={form.password}
                    onChange={handleChange}
                />

                <button type="submit">Cadastrar Cliente</button>
            </form>

            {/* LISTA */}
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