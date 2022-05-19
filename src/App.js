import { useState } from "react";
import axios from "axios";

export default function App() {
    const [produto, setProduto] = useState("");
    const [quantidade, setQuantidade] = useState(0);

    function enviarProduto(e) {
        e.preventDefault();
        const url = "http://localhost:5000/produtos";
        const promise = axios.post(url, { Produto: produto, Quantidade: quantidade });
        promise.then(response => {
            alert(response.data);
        });
        promise.catch(error => {
            alert(error.response.data);
        });
    }
    return (
        <form onSubmit={enviarProduto}>
            <input
                type="text"
                placeholder="Nome do Produto"
                value={produto}
                onChange={(e) => setProduto(e.target.value)}
            />
            <input
                type="number"
                placeholder="Quantidade"
                value={quantidade}
                onChange={(e) => setQuantidade(e.target.value)}
            />
            <button type="submit">Enviar</button>
        </form>
    )
}