"use client"
import storageService from '@/services/gstorage';
import { itemGaleria } from "@/types/blog";
import GalleryImage from "@/components/Blog/GalleryImage";
import { useEffect, useState } from 'react';

const Galeria: React.FC = () => {

  const [images, setImages] = useState<itemGaleria[]>([]);


  useEffect(() => {

    const getData = async () => {

      const response = await storageService.getGalleryItems(20);
      console.log(response);

      if (response) {
        const images: itemGaleria[] = response.map(element => ({
          idImagem: element.idImagem,
          idRenderizador: element.idRenderizador,
          titulo: element.titulo,
          signedUrl: element.signedUrl,
          nome: element.nome
        }));

        setImages(images);

      }

    }

    getData();

  }, []);

  return (
    <>
      {/* <!-- ===== Image Grid Start ===== --> */}
      <section className="py-20 lg:py-25 xl:py-30">
        <div className="mx-auto max-w-c-1280 px-4 md:px-8 xl:mt-10 xl:px-0">
          <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 text-white">
            {images?.map((imagem, index) => (
              <GalleryImage key={index} itemkey={index} Imagem={imagem} />
            ))}
          </div>
        </div>
      </section>
      {/* <!-- ===== Image Grid End ===== --> */}
    </>
  );
};

export default Galeria;