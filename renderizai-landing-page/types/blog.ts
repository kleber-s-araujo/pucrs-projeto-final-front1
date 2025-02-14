export type Author = {
  name: string;
  image: string;
  bio?: string;
  _id?: number | string;
  _ref?: number | string;
};

export type Blog = {
  _id: number;
  title: string;
  slug?: any;
  metadata?: string;
  body?: string;
  mainImage?: any;
  author?: Author;
  tags?: string[];
  publishedAt?: string;
  allImages?: any[];
};

export type itemGaleria = {
  idImagem: string,
  idRenderizador: Number,
  titulo: string,
  signedUrl: string,
  nome: string
}