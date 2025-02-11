import { Storage } from '@google-cloud/storage';

async function getGalleryHeaders() {
    
    //Busca os Headers da Galeria
}

async function getGalleryItem() {
    
    //Busca todas as imagens da Galeria
}

async function generateSignedUrl(bucketName, fileName) {

    // Inicializa o cliente do Storage
    const storage = new Storage();

    try {
      const bucket = storage.bucket(bucketName);
      const file = bucket.file(fileName);
  
      // Configurações da URL assinada
      const options = {
        version: 'v4',
        action: 'read',
        expires: Date.now() + 60 * 60 * 1000, // URL válida por 60 minutos
      };
  
      // Gera a URL assinada
      const [url] = await file.getSignedUrl(options);
      return url;

    } catch (error) {
      console.error('Erro ao gerar URL assinada:', error);
      throw error;
    }
};

const storageService = {
    generateSignedUrl
}
export default storageService;