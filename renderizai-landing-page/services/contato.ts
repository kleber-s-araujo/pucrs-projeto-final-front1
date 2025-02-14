import http from '@/app/http-common';

const enviaMensagemContato = ( nome: string, email: string, assunto: string, telefone: string, mensagem: string ) => {
    const body = { nome, email, assunto, telefone, mensagem };
    return http.post<any>("/contato/mensagem", body);
}

const contatoService = {
    enviaMensagemContato
}
export default contatoService;