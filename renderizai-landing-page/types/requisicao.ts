export type Requisicao = {
    nome: string,            
    radioValue: string,
    m2Interior: number,
    m2Edificacao: number,
    m2Terreno: number,
    mensagem: string,
    selectedRooms: string[],
    selectedLighting: string[],
    otherLighting: string,
    packageValue: string,
    selectedServices: string[],
    imagensAdicionais: number,
    videoAdicional: number,
};

export type RequisicoesData = {
    id: number,
    idCliente: number,
    titulo: string,
    descricao: string,
    dataRegistro: Date,
    status: string,
    prioridade: string,
    pacote: string,
    tipoProjeto: string,
    m2Interno: number,
    m2Edificacao: number,
    m2Terreno: number,
    proporcao: string,
    ambientes: string[],
    iluminacoes: string[],
    outraIluminacao: string,
    servicosAdicionais: string[],    
    idRenderizador?: number,
    renderizador?: string,
    imagensAdicionais: number,
    tempoVideo: number,
    valor: number
};

export type Mensagem = {
    idMensagem: number,
    idRequisicao: number,
    mensagem: string,
    enviadoPor: number,
    dataRegistro: Date,
};