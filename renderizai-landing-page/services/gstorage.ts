import http from '@/app/http-common';
import { itemGaleria } from '@/types/blog';
import { Storage } from '@google-cloud/storage';

async function getGalleryHeaders() {

  //Busca os Headers da Galeria
}

const getGalleryItems = async (max: Number) => {

  try {

      //Busca todas as imagens da Galeria
      const response = await http.get<any>(`/image/galeria/${max}`);
      const rows = response.data.rows;
      
      // Map the rows to new images instead of using forEach
      const newImages: itemGaleria[] = rows.map(element => ({
        idImagem: element.idImagem,
        idRenderizador: element.idRenderizador,
        titulo: element.titulo,
        signedUrl: element.signedUrl,
        nome: element.nome
      }));
      
      return newImages;

  } catch (error) {
     console.log("Erro ao buscar imagens", error);
  }
};

async function generateSignedUrl(bucketName, fileName) {

    // Inicializa o cliente do Storage
    const storage = new Storage();

    try {
      const bucket = storage.bucket(bucketName);
      const file = bucket.file(fileName);
  
      // Configurações da URL assinada
      const options = {
        version: 'v4',
        action: "read",
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

const storageService = {
  generateSignedUrl,
  getGalleryItems
}
export default storageService;