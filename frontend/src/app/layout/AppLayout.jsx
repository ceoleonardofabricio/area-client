import Sidebar from "../components/Sidebar";
import "./app-layout.css";

function AppLayout({ children }) {
    return (
        <div className="app-shell">
            <aside className="app-sidebar">
                <Sidebar />
            </aside>

            <main className="app-main">{children}</main>
        </div>
    );
}

export default AppLayout;