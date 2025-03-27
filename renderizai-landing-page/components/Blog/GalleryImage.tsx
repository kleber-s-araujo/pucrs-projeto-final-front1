"use client";
import { itemGaleria } from "@/types/blog";
import { useState } from "react";
import LazyImage from "../LazyImage";

interface GalleryItemProps {
  itemkey: Number,
  Imagem: itemGaleria;
}

const GalleryImage: React.FC<GalleryItemProps> = ({
  itemkey,
  Imagem
}) => {

  //const { mainImage, title, metadata } = "";
  //
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const openModal = (index: number) => setSelectedImage(index);
  const closeModal = () => setSelectedImage(null);

  const navigateImage = (direction: 'prev' | 'next') => {
    if (selectedImage === null) return;

    //const newIndex = direction === 'next' 
    //  ? (selectedImage + 1) % blog.allImages.length
    //   : (selectedImage - 1 + blog.allImages.length) % blog.allImages.length;

    //setSelectedImage(newIndex);
  };

  return (   
    <div className="relative group mb-4">
      { /* <img className="rounded-lg" src={Imagem.signedUrl} onClick={() => openModal(1)} /> */ }
      
      <div onClick={() => openModal(1)}>
        { /* <LazyImage src={`data:image/jpeg;base64,${Imagem.buffer}`}  alt={Imagem.titulo} width={800} height={600} /> */ }
        <LazyImage src={Imagem.signedUrl}  alt={Imagem.titulo} width={800} height={600} />
      </div>      

      <div className="rounded-b-lg pt-2 absolute w-full bottom-0 left-0 opacity-0 group-hover:opacity-30 bg-blck h-15" />
      <span className="text-white absolute bottom-1 left-3 opacity-0 group-hover:opacity-100">
        {Imagem.titulo}
        <p>por <b>{Imagem.nome}</b></p>
      </span>

      {/* Modal */}
      { selectedImage !== null && (
        <div className="fixed inset-0 bg-blck bg-opacity-80 flex items-center justify-center z-[9999]">
          
          {/* Close button */}
          <button
            onClick={closeModal}
            className="absolute bottom-4 p-2 text-white hover:text-gray-300 flex items-center"
          >
            <svg fill="white" className="w-8" viewBox="-0.5 0 25 25" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 21.32L21 3.32001" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M3 3.32001L21 21.32" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <div className="p-2">Fechar</div>
          </button>

          {/* Navigation buttons */}
          {/*
          <button
            onClick={() => navigateImage('prev')}
            className="absolute left-10 text-white hover:text-gray-300"
          >
            <svg fill="white" className="w-16" data-name="Livello 1" id="Livello_1" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
              <path d="M64,0a64,64,0,1,0,64,64A64.07,64.07,0,0,0,64,0Zm0,122a58,58,0,1,1,58-58A58.07,58.07,0,0,1,64,122Z"/>
              <path d="M74.12,35.88a3,3,0,0,0-4.24,0l-26,26a3,3,0,0,0,0,4.24l26,26a3,3,0,0,0,4.24-4.24L50.24,64,74.12,40.12A3,3,0,0,0,74.12,35.88Z"/>
            </svg>
            
          </button>
          
          
          <button
            onClick={() => navigateImage('next')}
            className="absolute right-10 text-white hover:text-gray-300"
          >
            
            <svg fill="white" className="w-16" data-name="Livello 1" id="Livello_1" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
              <path d="M64,0a64,64,0,1,0,64,64A64.07,64.07,0,0,0,64,0Zm0,122a58,58,0,1,1,58-58A58.07,58.07,0,0,1,64,122Z"/>
              <path d="M58.12,35.88a3,3,0,0,0-4.24,4.24L77.76,64,53.88,87.88a3,3,0,1,0,4.24,4.24l26-26a3,3,0,0,0,0-4.24Z"/>
            </svg>

          </button>
          */}

          {/* Modal Image */}
          <div className="max-w-5xl max-h-[70vh] w-full mx-4 rounded-lg">
            <img
              src={Imagem.signedUrl}
              alt={Imagem.titulo}
              className="rounded-lg -mt-14 max-h-[80vh] object-contain w-full justify-center rounded-lg"              
            />
          </div>
        </div>
      )}
      {/* Fim Modal */}

    </div>
  );
};

export default GalleryImage;
