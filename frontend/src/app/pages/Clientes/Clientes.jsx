import AppLayout from "../../layout/AppLayout";
import "./clientes.css";

function Clientes() {
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

                    <button className="clientes-header-button">
                        Cadastrar cliente
                    </button>
                </div>

                <div className="clientes-empty">
                    Nenhum cliente cadastrado nesta sessão ainda.
                </div>
            </div>
        </AppLayout>
    );
}

export default Clientes;