import storageService from '@/services/gstorage';
import { itemGaleria } from "@/types/blog";
import GalleryImage from "@/components/Blog/GalleryImage";

const BlogPage = async () => {  
 
  const response = await storageService.getGalleryItems(20);
  const imagens: itemGaleria[] = response.map(element => ({
    idImagem: element.idImagem,
    idRenderizador: element.idRenderizador,
    titulo: element.titulo,
    signedUrl: element.signedUrl,
    nome: element.nome
  }));
  
  return (
    <>
      {/* <!-- ===== Image Grid Start ===== --> */}
      <section className="py-20 lg:py-25 xl:py-30">
        <div className="mx-auto max-w-c-1280 px-4 md:px-8 xl:mt-10 xl:px-0">
          <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 text-white">
            { imagens.map((imagem, index) => (              
                <GalleryImage key={index} itemkey={index} Imagem={imagem} />
            ))}
          </div>
        </div>
      </section>          
      {/* <!-- ===== Image Grid End ===== --> */}
    </>
  );
};

export default BlogPage;
