import { useEffect, useState } from "react";

function App() {
  const [status, setStatus] = useState("Carregando...");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/health`)
      .then((res) => res.json())
      .then((data) => setStatus(data.status))
      .catch(() => setStatus("erro ao conectar"));
  }, []);

  return (
    <div style={{ padding: 40 }}>
      <h1>Área do Cliente</h1>
      <p>Backend: {status}</p>
    </div>
  );
}

export default App;