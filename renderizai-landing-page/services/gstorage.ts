import http from '@/app/http-common';
import { itemGaleria } from '@/types/blog';
import { Storage } from '@google-cloud/storage';
import { buffer } from 'stream/consumers';

type action = 'read' | 'write' | 'delete' | 'resumable';
type version = 'v2' | 'v4';

async function getGalleryHeaders() {

  //Busca os Headers da Galeria
}

const loadImage = async ( image : string ) => {



}

const getGalleryItems = async (max: Number) => {

  try {

      //Busca todas as imagens da Galeria
      const response = await http.get<any>(`/image/galeria/${max}`);
      console.log("busca imagens: ", response);
      const rows = response.data.rows;    
      
      // Map the rows to new images instead of using forEach
      const newImages: itemGaleria[] = rows.map(element => ({
        idImagem: element.idImagem,
        idRenderizador: element.idRenderizador,
        titulo: element.titulo,
        signedUrl: `${process.env.HOST}:${process.env.PORTA}/api/image/url/${element.idImagem}`, //element.signedUrl,
        nome: element.nome,
        buffer: element.buffer
      }));
      
      return newImages;

  } catch (error) {
     console.log("Erro ao buscar imagens", error);
  }
};

/*
async function generateSignedUrl(bucketName, fileName) {

    // Inicializa o cliente do Storage
    const storage = new Storage();

    try {
      const bucket = storage.bucket(bucketName);
      const file = bucket.file(fileName);
  
      // Configurações da URL assinada
      const options = {
        version: 'v4' as version,
        action: 'read' as action,
        expires: Date.now() + 60 * 60 * 1000, // URL válida por 60 minutos
      };
  
      // Gera a URL assinada
      const url = file.getSignedUrl(options);
      return url;

    } catch (error) {
      console.error('Erro ao gerar URL assinada:', error);
      throw error;
    }
};
*/
const storageService = {
  //generateSignedUrl,
  getGalleryItems
}
export default storageService;