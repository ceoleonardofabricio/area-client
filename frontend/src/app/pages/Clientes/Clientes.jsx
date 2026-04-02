import { useEffect, useState } from "react";
import AppLayout from "../../layout/AppLayout";
import ClientCreateModal from "./components/ClientCreateModal";
import {
    getClients,
    createClient,
    deleteClient,
} from "../../../shared/services/clientService";
import "./clientes.css";

function Clientes() {
    const [clients, setClients] = useState([]);
    const [isClientModalOpen, setIsClientModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState("create");
    const [selectedClient, setSelectedClient] = useState(null);

    const [deleteTarget, setDeleteTarget] = useState(null);
    const [adminPassword, setAdminPassword] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        async function loadClients() {
            try {
                const data = await getClients();
                setClients(data);
            } catch (error) {
                console.error("Erro ao carregar clientes:", error);
            }
        }

        loadClients();
    }, []);

    function handleOpenCreateModal() {
        setModalMode("create");
        setSelectedClient(null);
        setIsClientModalOpen(true);
    }

    function handleOpenEditModal(client) {
        setModalMode("edit");
        setSelectedClient(client);
        setIsClientModalOpen(true);
    }

    function handleOpenDeleteModal(client) {
        setDeleteTarget(client);
        setAdminPassword("");
    }

    function handleCloseDeleteModal() {
        if (isDeleting) return;
        setDeleteTarget(null);
        setAdminPassword("");
    }

    async function handleConfirmDelete() {
        if (!deleteTarget || !adminPassword) return;

        try {
            setIsDeleting(true);

            await deleteClient(deleteTarget.id, adminPassword);

            setClients((prev) =>
                prev.filter((client) => client.id !== deleteTarget.id)
            );

            setDeleteTarget(null);
            setAdminPassword("");
        } catch (error) {
            alert(error.message || "Erro ao excluir cliente");
        } finally {
            setIsDeleting(false);
        }
    }

    async function handleSaveClient(clientData) {
        try {
            if (modalMode === "create") {
                const savedClient = await createClient(clientData);
                setClients((prev) => [savedClient, ...prev]);
            } else {
                setClients((prev) =>
                    prev.map((client) =>
                        client.id === selectedClient.id
                            ? { ...client, ...clientData }
                            : client
                    )
                );
            }

            setIsClientModalOpen(false);
            setSelectedClient(null);
        } catch (error) {
            console.error("Erro ao salvar cliente:", error);
            alert(error.message || "Erro ao salvar cliente");
        }
    }

    function handleCloseModal() {
        setIsClientModalOpen(false);
        setSelectedClient(null);
    }

    return (
        <AppLayout>
            <div className="clientes-page">
                <div className="clientes-header">
                    <div className="clientes-header-left">
                        <h1 className="clientes-title">Clientes</h1>
                        <p className="clientes-subtitle">
                            Gerencie os acessos e acompanhe os clientes da plataforma.
                        </p>
                    </div>

                    <button
                        className="clientes-header-button"
                        onClick={handleOpenCreateModal}
                    >
                        Cadastrar cliente
                    </button>
                </div>

                {clients.length === 0 ? (
                    <div className="clientes-empty">
                        Nenhum cliente cadastrado nesta sessão ainda.
                    </div>
                ) : (
                    <div className="clientes-list">
                        {clients.map((client) => (
                            <div key={client.id} className="cliente-card-wrapper">
                                <button
                                    type="button"
                                    className="cliente-card"
                                    onClick={() => handleOpenEditModal(client)}
                                >
                                    <div className="cliente-card-left">
                                        <div className="cliente-card-avatar">
                                            {client.nomeCompleto?.[0] || "C"}
                                        </div>

                                        <div className="cliente-card-info">
                                            <strong className="cliente-card-name">
                                                {client.nomeCompleto}
                                            </strong>
                                            <span className="cliente-card-email">
                                                {client.emailLogin}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="cliente-card-right">
                                        <span className="cliente-card-status">
                                            {client.status || "Sem status"}
                                        </span>

                                        <span className="cliente-card-companies">
                                            {client.companies?.length || 0} empresa(s)
                                        </span>
                                    </div>
                                </button>

                                <button
                                    className="cliente-delete-button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleOpenDeleteModal(client);
                                    }}
                                >
                                    ×
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <ClientCreateModal
                key={`${modalMode}-${selectedClient?.id || "new"}`}
                open={isClientModalOpen}
                onClose={handleCloseModal}
                mode={modalMode}
                initialData={selectedClient}
                onSave={handleSaveClient}
            />

            {deleteTarget && (
                <div className="delete-client-modal-overlay">
                    <div className="delete-client-modal">
                        <div className="delete-client-modal-header">
                            <h3 className="delete-client-modal-title">
                                Excluir cliente
                            </h3>
                            <button
                                type="button"
                                className="delete-client-modal-close"
                                onClick={handleCloseDeleteModal}
                            >
                                ✕
                            </button>
                        </div>

                        <p className="delete-client-modal-text">
                            Para excluir <strong>{deleteTarget.nomeCompleto}</strong>,
                            digite sua senha de admin.
                        </p>

                        <input
                            className="delete-client-modal-input"
                            type="password"
                            placeholder="Digite sua senha"
                            value={adminPassword}
                            onChange={(e) => setAdminPassword(e.target.value)}
                        />

                        <div className="delete-client-modal-actions">
                            <button
                                type="button"
                                className="delete-client-cancel-button"
                                onClick={handleCloseDeleteModal}
                                disabled={isDeleting}
                            >
                                Cancelar
                            </button>

                            <button
                                type="button"
                                className="delete-client-confirm-button"
                                onClick={handleConfirmDelete}
                                disabled={isDeleting || !adminPassword}
                            >
                                {isDeleting ? "Excluindo..." : "Excluir cliente"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AppLayout>
    );
}

export default Clientes;