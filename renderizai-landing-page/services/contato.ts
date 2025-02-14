import http from '@/app/http-common';

const enviaMensagemContato = async ( nome: string, email: string, assunto: string, telefone: string, mensagem: string ) => {

    const body = {
        nome,
        email,
        assunto,
        telefone,
        mensagem
    }
    const response = await http.get<any>(`/image/galeria/${max}`);
}

const contatoService = {
    enviaMensagemContato
}
export default contatoService;