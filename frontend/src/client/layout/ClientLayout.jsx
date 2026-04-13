import ClientSidebar from "./components/ClientSidebar";
import "./client-layout.css";

function ClientLayout({ children }) {
    return (
        <div className="client-shell">
            <ClientSidebar />

            <div className="client-main">
                <header className="client-topbar">
                    <div className="client-breadcrumb">
                        <span>Área do Cliente</span>
                    </div>
                </header>

                <main className="client-content">
                    {children}
                </main>
            </div>
        </div>
    );
}

export default ClientLayout;