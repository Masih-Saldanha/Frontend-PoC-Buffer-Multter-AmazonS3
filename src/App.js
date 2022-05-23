import { useState } from "react";
import axios from "axios";

export default function App() {
    const [nome, setNome] = useState("");
    const [idade, setIdade] = useState(0);
    const [listaDeUsuarios, setListaDeUsuarios] = useState([]);

    const [foto, setFoto] = useState();

    function enviarUsuario(e) {
        e.preventDefault();

        const url = "https://poc-buffer.herokuapp.com/usuarios";
        // const url = "http://localhost:5000/usuarios";
        const promise = axios.post(url, { nome, idade: parseInt(idade) });
        promise.then(response => {
            alert(response.data);
        });
        promise.catch(error => {
            alert(error.response.data);
        });
    }

    const enviar = event => {
        const data = new FormData();
        data.append("nome", nome);
        data.append("idade", idade);
        data.append("foto", foto);

        const url = "https://poc-buffer.herokuapp.com/usuarios";
        // const url = "http://localhost:5000/usuarios";
        const promise = axios.post(url, data);
        promise.then(res => console.log(res));
        promise.catch(err => console.log(err));
    }

    function baixarLista() {
        console.log(foto);

        const url = "https://poc-buffer.herokuapp.com/usuarios";
        // const url = "http://localhost:5000/usuarios";
        const promise = axios.get(url);
        promise.then(response => {
            setListaDeUsuarios(response.data);
        });
        promise.catch(error => {
            alert(error.response.data);
        });
    }
    return (
        <>
            <h1>Bem vindos à PoC de Buffer e upload de arquivos com Multer</h1>
            <h2>Digite o nome, idade e foto do usuário que deseja armazenar no banco de dados:</h2>

            {/* VERSÃO TRADICIONAL SEM UPLOAD */}
            <h2>Versão tradicional, sem upload de arquivos</h2>
            <form onSubmit={enviarUsuario}>
                <input type="string" id="nome" name="nome" placeholder="Nome do usuário" value={nome} onChange={(e) => setNome(e.target.value)} />
                <input type="number" id="idade" name="idade" placeholder="Idade do usuário" value={idade} onChange={(e) => setIdade(e.target.value)} />
                <input type="file" id="foto" name="foto" onChange={(e) => setFoto(e.target.files[0])} />
                <button type="submit">Enviar</button>
            </form>

            {/* VERSÃO 1 ARQUIVO DE UPLOAD APENAS */}
            <h2>Envio de requisição diretamente do formulário - 1 Arquivo de upload apenas</h2>
            <form action="http://localhost:5000/usuarios" method="post" encType="multipart/form-data">
                <input type="string" id="nome" name="nome" placeholder="Nome do usuário" value={nome} onChange={(e) => setNome(e.target.value)} />
                <input type="number" id="idade" name="idade" placeholder="Idade do usuário" value={idade} onChange={(e) => setIdade(e.target.value)} />
                <input type="file" id="foto" name="foto" />
                <button type="submit" >Enviar</button>
            </form>

            {/* VERSÃO VÁRIOS ARQUIVOS DE UPLOAD */}
            <h2>Envio de requisição diretamente do formulário - Vários Arquivos de upload</h2>
            <form action="http://localhost:5000/usuarios/maisfotos" method="post" encType="multipart/form-data">
                <input type="string" id="nome" name="nome" placeholder="Nome do usuário" value={nome} onChange={(e) => setNome(e.target.value)} />
                <input type="number" id="idade" name="idade" placeholder="Idade do usuário" value={idade} onChange={(e) => setIdade(e.target.value)} />
                <input type="file" id="foto" name="foto" multiple />
                <button type="submit" >Enviar</button>
            </form>

            {/* VERSÃO COM FUNÇÃO DE ENVIO */}
            <h2>Versão com função de envio multipart/form-data</h2>
            <form action="#">
                <input type="string" id="nome" name="nome" placeholder="Nome do usuário" value={nome} onChange={(e) => setNome(e.target.value)} />
                <input type="number" id="idade" name="idade" placeholder="Idade do usuário" value={idade} onChange={(e) => setIdade(e.target.value)} />
                <input type="file" id="foto" name="foto" onChange={(e) => setFoto(e.target.files[0])} />
                <button onClick={enviar} >Enviar</button>
            </form>

            <h1>Abaixo segue a lista de usuários do banco de dados:</h1>
            {
                listaDeUsuarios.length === 0 ?
                    <h2>Lista de usuários vazia! Clique no Botão abaixo para abastecer a lista</h2>
                    :
                    <ul>
                        {listaDeUsuarios.map((usuario, index) => {
                            const { nome, idade } = usuario;
                            return (
                                <li key={index}>- {nome} - {parseInt(idade)} anos de idade</li>
                            )
                        })}
                    </ul>
            }
            <button onClick={baixarLista}>Baixar Lista</button>
        </>
    )
}