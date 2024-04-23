import React from 'react';

// exemplo de custom Hook Fetch

function useFetch<T> (url: RequestInfo | URL, options?: RequestInit ) {
    const [data, setData] = React.useState<T | null>(null);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);

    const optionsRef = React.useRef(options);
    optionsRef.current = options

    React.useEffect(() => {
        const controller = new AbortController();
        const { signal } = controller;
        
        const fetchData = async () => {
            setLoading(true);
            setData(null);
            try {
                const response = await fetch(url, {
                    signal,
                    ...optionsRef.current
                });
                if (!response.ok) throw new Error(`Error: ${response.status}`);
                const json = (await response.json()) as T;
                if (!signal.aborted) setData(json);
            } catch (error) {
                if (!signal.aborted && error instanceof Error) setError(error.message);
            } finally {
                if (!signal.aborted) setLoading(false)
            }
        };

        fetchData();

        return () => {
            controller.abort();
        }
    }, [url])

    return {data, loading, error}
}

export default useFetch;

// Exemplo de utilizacao

// function App() {
//     const [id, setId] = React.useState("p001")
//     const produtos = useFetch<Produto[]>("https://data.origamid.dev/produtos/");
//     const produto = useFetch<Produto>(`https://data.origamid.dev/produtos/${id}`)
 
//    return (
//     <section className="flex">
//       <div>
//         {produtos.data && 
//         produtos.data.map((produto) => (
//           <button onClick={() => setId(produto.id)} style={{fontSize: "1rem"}} key={produto.id}>{produto.id}</button>
//         ))}
//       </div>
//       <div>
//         {produto.loading && <>Carregando...</>}
//         {produto.data && (
//           <ul>
//             <li>ID: {produto.data.id}</li>
//             <li>Nome: {produto.data.nome}</li>
//             <li>Preco: {produto.data.preco}</li>
//             <li>Quantidade: {produto.data.quantidade}</li>
//             <li>Descricao: {produto.data.descricao}</li>
//             <li>Internacional: {produto.data.internacional ? 'sim' : 'nao'}</li>
//           </ul>
//         )}
//       </div>
//   </section>
//    )
//  }

