export type Cliente = {
    id: number;
    nome: string;
    email: string;
    senha: string;
    tipo: number;
    dataRegistro: Date;
    fotoPerfil: string;
  };

export type tipo = {
    id: number;
    lang: string,
    descricao: string,
  };