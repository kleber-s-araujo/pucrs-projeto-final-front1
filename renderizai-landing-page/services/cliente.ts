import http from '@/app/http-common';
import { Cliente } from '@/types/cliente';
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

const clientService = {
    doLogin,
    getTipos,    
    criaCliente,
    updateClientImage
}

export default clientService;