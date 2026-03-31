function ClientLayout({ children }) {
    return (
        <div className="client-shell">
            <header className="client-header">Área do Cliente</header>

            <main className="client-main">{children}</main>
        </div>
    );
}

export default ClientLayout;