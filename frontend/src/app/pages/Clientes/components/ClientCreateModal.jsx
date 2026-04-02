import { useState } from "react";
import "./clientcreatemodal.css";

function createEmptyCompany(index = 0) {
    return {
        id: Date.now() + index,
        nomeFantasia: "",
        razaoSocial: "",
        cnpj: "",
        inscricaoEstadual: "",
        telefone: "",
        email: "",
        segmento: "",
        observacoes: "",
    };
}

function createEmptyClientForm() {
    return {
        nomeCompleto: "",
        dataNascimento: "",
        cpf: "",
        sexo: "",
        emailLogin: "",
        senha: "",
        status: "",
        potencialCompra: "",
    };
}

function buildInitialClientForm(mode, initialData) {
    if (mode === "edit" && initialData) {
        return {
            nomeCompleto: initialData.nomeCompleto || "",
            dataNascimento: initialData.dataNascimento || "",
            cpf: initialData.cpf || "",
            sexo: initialData.sexo || "",
            emailLogin: initialData.emailLogin || "",
            senha: initialData.senha || "",
            status: initialData.status || "",
            potencialCompra: initialData.potencialCompra || "",
        };
    }

    return createEmptyClientForm();
}

function buildInitialCompanies(mode, initialData) {
    if (
        mode === "edit" &&
        initialData &&
        initialData.companies &&
        initialData.companies.length > 0
    ) {
        return initialData.companies;
    }

    return [createEmptyCompany(0)];
}

function calculateAge(dateString) {
    if (!dateString) return "";

    const birthDate = new Date(dateString);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (
        monthDifference < 0 ||
        (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
        age--;
    }

    return age >= 0 ? String(age) : "";
}

function ClientCreateModal({ open, onClose, mode, initialData, onSave }) {
    const [clientForm, setClientForm] = useState(() =>
        buildInitialClientForm(mode, initialData)
    );

    const [companies, setCompanies] = useState(() =>
        buildInitialCompanies(mode, initialData)
    );

    const [activeCompanyId, setActiveCompanyId] = useState(() => {
        const initialCompanies = buildInitialCompanies(mode, initialData);
        return initialCompanies[0].id;
    });

    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    const activeCompany =
        companies.find((company) => company.id === activeCompanyId) || companies[0];

    if (!open) return null;

    function handleClientChange(field, value) {
        setClientForm((prev) => ({
            ...prev,
            [field]: value,
        }));
    }

    function handleAddCompany() {
        const newCompany = createEmptyCompany(companies.length);

        setCompanies((prev) => [...prev, newCompany]);
        setActiveCompanyId(newCompany.id);
        setShowDeleteConfirm(false);
    }

    function handleCompanyChange(field, value) {
        setCompanies((prev) =>
            prev.map((company) =>
                company.id === activeCompanyId
                    ? { ...company, [field]: value }
                    : company
            )
        );
    }

    function handleDeleteActiveCompany() {
        if (companies.length === 1) {
            const resetCompany = createEmptyCompany(0);
            setCompanies([resetCompany]);
            setActiveCompanyId(resetCompany.id);
            setShowDeleteConfirm(false);
            return;
        }

        const filteredCompanies = companies.filter(
            (company) => company.id !== activeCompanyId
        );

        setCompanies(filteredCompanies);
        setActiveCompanyId(filteredCompanies[0].id);
        setShowDeleteConfirm(false);
    }

    function getCompanyTabName(company, index) {
        return company.nomeFantasia?.trim() || `Empresa ${index + 1}`;
    }

    function handleSubmit() {
        const payload = {
            nomeCompleto: clientForm.nomeCompleto,
            dataNascimento: clientForm.dataNascimento,
            cpf: clientForm.cpf,
            sexo: clientForm.sexo,
            emailLogin: clientForm.emailLogin,
            senha: clientForm.senha,
            status: clientForm.status,
            potencialCompra: clientForm.potencialCompra,
            companies,
        };

        console.log("PAYLOAD ENVIADO:", payload);

        onSave(payload);
    }

    return (
        <div className="client-modal-overlay">
            <div className="client-modal">
                <div className="client-modal-header">
                    <div>
                        <h2 className="client-modal-title">
                            {mode === "edit" ? "Editar cliente" : "Cadastrar cliente"}
                        </h2>
                        <p className="client-modal-subtitle">
                            {mode === "edit"
                                ? "Atualize os dados do cliente e das empresas vinculadas."
                                : "Preencha os dados do cliente e vincule uma ou mais empresas."}
                        </p>
                    </div>

                    <button
                        type="button"
                        className="client-modal-close"
                        onClick={onClose}
                    >
                        ✕
                    </button>
                </div>

                <div className="client-modal-body">
                    <section className="client-modal-section">
                        <div className="client-modal-section-header">
                            <h3 className="client-modal-section-title">Dados pessoais</h3>
                            <p className="client-modal-section-subtitle">
                                Informações principais do cliente.
                            </p>
                        </div>

                        <div className="client-modal-grid">
                            <div className="client-modal-field client-modal-field-span-2">
                                <label className="client-modal-label">Nome completo</label>
                                <input
                                    className="client-modal-input"
                                    type="text"
                                    placeholder="Digite o nome completo"
                                    value={clientForm.nomeCompleto}
                                    onChange={(e) =>
                                        handleClientChange("nomeCompleto", e.target.value)
                                    }
                                />
                            </div>

                            <div className="client-modal-field">
                                <label className="client-modal-label">
                                    Data de nascimento
                                </label>
                                <input
                                    className="client-modal-input"
                                    type="date"
                                    value={clientForm.dataNascimento}
                                    onChange={(e) =>
                                        handleClientChange("dataNascimento", e.target.value)
                                    }
                                />
                            </div>

                            <div className="client-modal-field">
                                <label className="client-modal-label">Idade</label>
                                <input
                                    className="client-modal-input"
                                    type="text"
                                    value={calculateAge(clientForm.dataNascimento)}
                                    placeholder="Calculada automaticamente"
                                    disabled
                                />
                            </div>

                            <div className="client-modal-field">
                                <label className="client-modal-label">CPF</label>
                                <input
                                    className="client-modal-input"
                                    type="text"
                                    placeholder="000.000.000-00"
                                    value={clientForm.cpf}
                                    onChange={(e) =>
                                        handleClientChange("cpf", e.target.value)
                                    }
                                />
                            </div>

                            <div className="client-modal-field">
                                <label className="client-modal-label">Sexo</label>
                                <select
                                    className="client-modal-input"
                                    value={clientForm.sexo}
                                    onChange={(e) =>
                                        handleClientChange("sexo", e.target.value)
                                    }
                                >
                                    <option value="">Selecione</option>
                                    <option value="masculino">Masculino</option>
                                    <option value="feminino">Feminino</option>
                                    <option value="nao_informar">
                                        Prefiro não informar
                                    </option>
                                </select>
                            </div>
                        </div>
                    </section>

                    <section className="client-modal-section">
                        <div className="client-modal-section-header">
                            <h3 className="client-modal-section-title">Dados do sistema</h3>
                            <p className="client-modal-section-subtitle">
                                Informações de acesso e qualificação comercial.
                            </p>
                        </div>

                        <div className="client-modal-grid">
                            <div className="client-modal-field client-modal-field-span-2">
                                <label className="client-modal-label">
                                    E-mail de login
                                </label>
                                <input
                                    className="client-modal-input"
                                    type="email"
                                    placeholder="cliente@empresa.com"
                                    value={clientForm.emailLogin}
                                    onChange={(e) =>
                                        handleClientChange("emailLogin", e.target.value)
                                    }
                                />
                            </div>

                            <div className="client-modal-field">
                                <label className="client-modal-label">Senha</label>
                                <input
                                    className="client-modal-input"
                                    type="password"
                                    placeholder="Crie uma senha"
                                    value={clientForm.senha}
                                    onChange={(e) =>
                                        handleClientChange("senha", e.target.value)
                                    }
                                />
                            </div>

                            <div className="client-modal-field">
                                <label className="client-modal-label">Status</label>
                                <select
                                    className="client-modal-input"
                                    value={clientForm.status}
                                    onChange={(e) =>
                                        handleClientChange("status", e.target.value)
                                    }
                                >
                                    <option value="">Selecione</option>
                                    <option value="ativo">Ativo</option>
                                    <option value="inativo">Inativo</option>
                                </select>
                            </div>

                            <div className="client-modal-field client-modal-field-span-2">
                                <label className="client-modal-label">
                                    Potencial de compra
                                </label>
                                <select
                                    className="client-modal-input"
                                    value={clientForm.potencialCompra}
                                    onChange={(e) =>
                                        handleClientChange(
                                            "potencialCompra",
                                            e.target.value
                                        )
                                    }
                                >
                                    <option value="">Selecione uma nota</option>
                                    <option value="0">0</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </select>
                            </div>
                        </div>
                    </section>

                    <section className="client-modal-section">
                        <div className="client-modal-section-header client-modal-section-header-inline">
                            <div>
                                <h3 className="client-modal-section-title">Empresas</h3>
                                <p className="client-modal-section-subtitle">
                                    Cada empresa fica em uma aba separada.
                                </p>
                            </div>

                            <button
                                type="button"
                                className="client-modal-add-company-button"
                                onClick={handleAddCompany}
                            >
                                + Nova empresa
                            </button>
                        </div>

                        <div className="client-modal-company-tabs">
                            {companies.map((company, index) => (
                                <button
                                    key={company.id}
                                    type="button"
                                    className={`client-modal-company-tab ${company.id === activeCompanyId ? "active" : ""
                                        }`}
                                    onClick={() => {
                                        setActiveCompanyId(company.id);
                                        setShowDeleteConfirm(false);
                                    }}
                                >
                                    {getCompanyTabName(company, index)}
                                </button>
                            ))}
                        </div>

                        <div className="client-modal-company-panel">
                            <div className="client-modal-grid">
                                <div className="client-modal-field">
                                    <label className="client-modal-label">
                                        Nome fantasia
                                    </label>
                                    <input
                                        className="client-modal-input"
                                        type="text"
                                        placeholder="Digite o nome fantasia"
                                        value={activeCompany?.nomeFantasia || ""}
                                        onChange={(e) =>
                                            handleCompanyChange(
                                                "nomeFantasia",
                                                e.target.value
                                            )
                                        }
                                    />
                                </div>

                                <div className="client-modal-field">
                                    <label className="client-modal-label">
                                        Razão social
                                    </label>
                                    <input
                                        className="client-modal-input"
                                        type="text"
                                        placeholder="Digite a razão social"
                                        value={activeCompany?.razaoSocial || ""}
                                        onChange={(e) =>
                                            handleCompanyChange(
                                                "razaoSocial",
                                                e.target.value
                                            )
                                        }
                                    />
                                </div>

                                <div className="client-modal-field">
                                    <label className="client-modal-label">CNPJ</label>
                                    <input
                                        className="client-modal-input"
                                        type="text"
                                        placeholder="00.000.000/0000-00"
                                        value={activeCompany?.cnpj || ""}
                                        onChange={(e) =>
                                            handleCompanyChange("cnpj", e.target.value)
                                        }
                                    />
                                </div>

                                <div className="client-modal-field">
                                    <label className="client-modal-label">
                                        Inscrição estadual
                                    </label>
                                    <input
                                        className="client-modal-input"
                                        type="text"
                                        placeholder="Digite a inscrição estadual"
                                        value={activeCompany?.inscricaoEstadual || ""}
                                        onChange={(e) =>
                                            handleCompanyChange(
                                                "inscricaoEstadual",
                                                e.target.value
                                            )
                                        }
                                    />
                                </div>

                                <div className="client-modal-field">
                                    <label className="client-modal-label">Telefone</label>
                                    <input
                                        className="client-modal-input"
                                        type="text"
                                        placeholder="(00) 00000-0000"
                                        value={activeCompany?.telefone || ""}
                                        onChange={(e) =>
                                            handleCompanyChange("telefone", e.target.value)
                                        }
                                    />
                                </div>

                                <div className="client-modal-field">
                                    <label className="client-modal-label">E-mail</label>
                                    <input
                                        className="client-modal-input"
                                        type="email"
                                        placeholder="empresa@email.com"
                                        value={activeCompany?.email || ""}
                                        onChange={(e) =>
                                            handleCompanyChange("email", e.target.value)
                                        }
                                    />
                                </div>

                                <div className="client-modal-field client-modal-field-span-2">
                                    <label className="client-modal-label">Segmento</label>
                                    <input
                                        className="client-modal-input"
                                        type="text"
                                        placeholder="Ex.: clínica, restaurante, e-commerce"
                                        value={activeCompany?.segmento || ""}
                                        onChange={(e) =>
                                            handleCompanyChange("segmento", e.target.value)
                                        }
                                    />
                                </div>

                                <div className="client-modal-field client-modal-field-span-2">
                                    <label className="client-modal-label">
                                        Observações
                                    </label>
                                    <textarea
                                        className="client-modal-textarea"
                                        placeholder="Informações importantes sobre esta empresa"
                                        value={activeCompany?.observacoes || ""}
                                        onChange={(e) =>
                                            handleCompanyChange(
                                                "observacoes",
                                                e.target.value
                                            )
                                        }
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="client-modal-danger-wrapper">
                            {!showDeleteConfirm ? (
                                <button
                                    type="button"
                                    className="client-modal-danger-action"
                                    onClick={() => setShowDeleteConfirm(true)}
                                >
                                    Excluir permanentemente
                                </button>
                            ) : (
                                <div className="client-modal-danger-confirm">
                                    <p className="client-modal-danger-confirm-text">
                                        Tem certeza que deseja excluir permanentemente
                                        esta empresa?
                                    </p>

                                    <div className="client-modal-danger-confirm-actions">
                                        <button
                                            type="button"
                                            className="client-modal-danger-cancel"
                                            onClick={() => setShowDeleteConfirm(false)}
                                        >
                                            Cancelar
                                        </button>

                                        <button
                                            type="button"
                                            className="client-modal-danger-confirm-button"
                                            onClick={handleDeleteActiveCompany}
                                        >
                                            Confirmar exclusão
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </section>
                </div>

                <div className="client-modal-footer">
                    <button
                        type="button"
                        className="client-modal-secondary-button"
                        onClick={onClose}
                    >
                        Cancelar
                    </button>

                    <button
                        type="button"
                        className="client-modal-primary-button"
                        onClick={handleSubmit}
                    >
                        {mode === "edit" ? "Salvar alterações" : "Salvar cliente"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ClientCreateModal;