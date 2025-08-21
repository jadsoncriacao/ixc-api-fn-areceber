import { useState, useEffect } from 'react';
import './index.css';

function App() {
  const [dados, setDados] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Data de exemplo (pode ser dinâmica via input)
        const dataVencimento = '2025-08-25';
        // Monta os params conforme seu script
        const params = {
          qtype: "fn_areceber.data_vencimento",
          query: dataVencimento,
          oper: "=",
          page: "1",
          rp: "100",
          sortname: "fn_areceber.data_vencimento",
          sortorder: "asc",
          grid_param: JSON.stringify([ { TB: "fn_areceber.liberado", OP: "=", P: "S" },
            { TB: "fn_areceber.status", OP: "=", P: "A" },
          ])
        };
        
        const response = await fetch("/webservice/v1/fn_areceber", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Basic " + btoa("SUA_API_KEY"),
            "ixcsoft": "listar"
          },
          body: JSON.stringify(params)
        });

        if (!response.ok) {
          throw new Error(`Erro na requisição: ${response.status}`);
        }

        const data = await response.json();
        setDados(data);

      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Consulta de Faturas Vencidas - IXC</h1>
      {loading && <p>Carregando...</p>}
      {error && <p>Erro: {error}</p>}
      {dados && (
        <pre>{JSON.stringify(dados, null, 2)}</pre>
      )}
    </div>
  );
}

export default App;