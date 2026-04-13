import { useState } from "react";

function Approvals() {
    const [items, setItems] = useState([
        {
            id: 1,
            title: "Criativo Instagram - Promoção",
            status: "pending",
        },
        {
            id: 2,
            title: "Banner Site - Campanha",
            status: "pending",
        },
    ]);

    function handleApprove(id) {
        setItems((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, status: "approved" } : item
            )
        );
    }

    function handleReject(id) {
        setItems((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, status: "rejected" } : item
            )
        );
    }

    return (
        <div style={{ marginTop: "20px" }}>
            <h2>Aprovações</h2>

            {items.map((item) => (
                <div
                    key={item.id}
                    style={{
                        background: "#fff",
                        padding: "16px",
                        borderRadius: "10px",
                        marginTop: "10px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <div>
                        <strong>{item.title}</strong>
                        <p>Status: {item.status}</p>
                    </div>

                    <div style={{ display: "flex", gap: "10px" }}>
                        <button
                            onClick={() => handleApprove(item.id)}
                            style={{
                                background: "#16a34a",
                                color: "#fff",
                                border: "none",
                                padding: "8px 12px",
                                borderRadius: "6px",
                                cursor: "pointer",
                            }}
                        >
                            Aprovar
                        </button>

                        <button
                            onClick={() => handleReject(item.id)}
                            style={{
                                background: "#dc2626",
                                color: "#fff",
                                border: "none",
                                padding: "8px 12px",
                                borderRadius: "6px",
                                cursor: "pointer",
                            }}
                        >
                            Reprovar
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Approvals;