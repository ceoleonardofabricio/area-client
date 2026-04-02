import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import "./app-layout.css";

function AppLayout({ children }) {
    return (
        <div className="app-shell">
            <Topbar />

            <div className="app-body">
                <aside className="app-sidebar">
                    <Sidebar />
                </aside>

                <main className="app-main">
                    {children}
                </main>
            </div>
        </div>
    );
}

export default AppLayout;