import http from '@/app/http-common';
import { Cliente } from '@/types/cliente';
import { RequisicoesData } from '@/types/requisicao';
import axios from 'axios';

const getTipos = () => {
    return http.get<any>("/dadosmestre/tipocliente/lang/pt");
}

const criaCliente = (cliente: Cliente) => {
    const body = {
        nome: cliente.nome,
        email: cliente.email,
        senha: cliente.senha,
        fotoPerfil: "foto.jpg",
        tipo: cliente.tipo
    }
    return http.post<any>('/cliente', body);
}

const doLogin = (email: string, senha: string) => {
    const body = { 
        email: email,
        senha: senha
    }
    return http.post<any>('/cliente/login', body);
}

const updateClientImage = async (id: number, image: File) => {
    
    const formData = new FormData();
    formData.append('image', image);
    formData.append('id', id.toString());

    const response = await axios.post(`http://127.0.0.1:3030/api/cliente/id/${id}/image`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response;
}

const getImageURL = async (imagename: string) => { 
    return http.get<any>(`/cliente/image/${imagename}`);
}

const getRequisicoes = async (idCliente: number) => {
    return http.get<any>(`/requisicao/cliente/${idCliente}`);
}

const createRequisicao = async ( requisicao: RequisicoesData ) => {
    const body = requisicao;
    return http.post<any>('/requisicao', body);
}

const getMensagens = async ( idCliente: number ) => {
    try {
        const response = await http.get<any>(`/requisicao/mensagens/${idCliente}`);   
        return response;
    } catch (error) {
        console.log("Mensagens não encontradas...")
    }    
}

const postMessage = async ( idRequisicao: number, enviadoPor: number, mensagem: string ) => {
    const body = {
        idRequisicao,
        enviadoPor,
        mensagem
    };
    return http.post<any>('/requisicao/mensagem', body);
}

const postArquivo = async ( requisicao: number, id: number, file: File ) => {    
    const formData = new FormData();
    formData.append('file', file);
    formData.append('tipo', '1');
    formData.append('sender', id.toString());
    formData.append('filename', file.name);
    formData.append('requisicao', requisicao.toString());
    const response = await axios.post('http://127.0.0.1:3030/api/requisicao/file', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response;
}

const getArquivos = async ( requisicao: number ) => {
    try {
        const response = await http.get<any>(`/requisicao/files/req/${requisicao}`);   
        return response;
    } catch (error) {
        console.log("Arquivos não encontradas...")
    }    
}

const genURLArquivo = async ( requisicao: number, filename: string ) => {
    return http.get<any>(`/requisicao/req/${requisicao}/file/${filename}`);
}

const deletaArquivo = async ( requisicao: number, filename: string ) => {
    const body = { requisicao, fileName: filename };
    return http.delete<any>('/requisicao/file', { data: body });
}

const clientService = {
    doLogin,
    getTipos,    
    criaCliente,
    getImageURL,
    postMessage,
    postArquivo,
    getArquivos,
    getMensagens,    
    deletaArquivo,
    genURLArquivo,
    getRequisicoes,
    createRequisicao,
    updateClientImage
}

export default clientService;