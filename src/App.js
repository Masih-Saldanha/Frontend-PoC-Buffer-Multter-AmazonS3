import { useState } from "react";
import axios from "axios";

export default function App() {
    const [produto, setProduto] = useState("");
    const [quantidade, setQuantidade] = useState(0);
    const [listaDeProdutos, setListaDeProdutos] = useState([]);

    function enviarProduto(e) {
        e.preventDefault();
        const url = "http://localhost:5000/produtos";
        const promise = axios.post(url, { Produto: produto, Quantidade: parseInt(quantidade) });
        promise.then(response => {
            alert(response.data);
        });
        promise.catch(error => {
            alert(error.response.data);
        });
    }

    function baixarLista() {
        const url = "http://localhost:5000/produtos";
        const promise = axios.get(url);
        promise.then(response => {
            setListaDeProdutos(response.data);
        });
        promise.catch(error => {
            alert(error.response.data);
        });
    }
    return (
        <>
            <h1>Bem vindos à PoC de Buffer e upload de arquivos com Multer</h1>
            <h2>Digite o nome e quantidade do produto que deseja armazenar no banco de dados:</h2>
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
            <h1>Abaixo segue a lista de produtos do banco de dados:</h1>
            {
                listaDeProdutos.length === 0 ?
                    <h2>Lista de produtos vazia! Clique no Botão abaixo para abastecer a lista</h2>
                    :
                    <ul>
                        {listaDeProdutos.map((produto, index) => {
                            const { Produto, Quantidade } = produto;
                            return (
                                <li key={index}>- {parseInt(Quantidade)} unidades de {Produto}</li>
                            )
                        })}
                    </ul>
            }
            <button onClick={baixarLista}>Baixar Lista</button>
        </>
    )
}