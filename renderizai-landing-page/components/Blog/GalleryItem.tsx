"use client";
import { Blog } from "@/types/blog";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const GalleryItem = ({ blog }: { blog: Blog } ) => {

  const { mainImage, title, metadata } = blog;
  //
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const openModal = (index: number) => setSelectedImage(index);
  const closeModal = () => setSelectedImage(null);

  const navigateImage = (direction: 'prev' | 'next') => {

    if (selectedImage === null || !blog.allImages) return;
    
    const newIndex = direction === 'next' 
      ? (selectedImage + 1) % blog.allImages.length
      : (selectedImage - 1 + blog.allImages.length) % blog.allImages.length;
    
    setSelectedImage(newIndex);

  };

  return (
    <>
      <motion.div
        variants={{
          hidden: {
            opacity: 0,
            y: -20,
          },

          visible: {
            opacity: 1,
            y: 0,
          },
        }}
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 1, delay: 0.5 }}
        viewport={{ once: true }}
        className="animate_top rounded-lg bg-white p-2 pb-6 shadow-solid-8 dark:bg-blacksection"
      >
        <Link href={`#`} className="relative block aspect-[368/239]">
          <Image src={mainImage} alt={title} fill onClick={() => openModal(1)} />
        </Link>

        <div className="px-4">
          <h3 className="mb-3.5 mt-7.5 line-clamp-2 inline-block text-lg font-medium text-black duration-300 hover:text-primary dark:text-white dark:hover:text-primary xl:text-itemtitle2">
            {`${title.slice(0, 40)}...`}            
          </h3>
          <p className="line-clamp-3">{metadata}</p>
        </div>
      </motion.div>

      {/* Modal */}
      {selectedImage !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center z-[9999]">
          
          {/* Close button */}
          <button
            onClick={closeModal}
            className="absolute bottom-4 text-white hover:text-gray-300 flex items-center"
          >
            <svg fill="white" className="w-10 " viewBox="-0.5 0 25 25" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 21.32L21 3.32001" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M3 3.32001L21 21.32" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Fechar
          </button>

          {/* Navigation buttons */}
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

          {/* Modal Image */}
          <div className="max-w-5xl max-h-[90vh] w-full mx-4">
            <img
              src={blog.allImages?.[selectedImage] || blog.mainImage || ''}
              alt={blog.title}
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      )}
      {/* Fim Modal */}

    </>
  );
};

export default GalleryItem;
