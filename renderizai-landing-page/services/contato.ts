import http from '@/app/http-common';

const enviaMensagemContato = ( nome: string, email: string, assunto: string, telefone: string, mensagem: string ) => {
    const body = { nome, email, assunto, telefone, mensagem };
    return http.post<any>("/contato/mensagem", body);
}

const enviaTrabalheConosco = ( nome: string, email: string, especialidade: string, telefone: string, links: string, mensagem: string ) => {
    const body = { nome, email, especialidade, telefone, links, mensagem };
    return http.post<any>("/contato/trabalhe", body);   
}

const contatoService = {
    enviaMensagemContato,
    enviaTrabalheConosco
}
export default contatoService;