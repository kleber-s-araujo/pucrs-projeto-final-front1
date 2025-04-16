import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { Brand } from "@/types/brand";
import { motion } from "framer-motion";

const SingleBrand = ({ brand }: { brand: Brand }) => {
  const { image, href, name, imageLight, id } = brand;

  return (
    <>
      <motion.a
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
        transition={{ duration: 1, delay: id }}
        viewport={{ once: true }}        
        className="animate_top mx-w-full relative h-50 -mt-15 justify-center items-center xl:p-12.5"
      >
        <div>
          <Image
            className="opacity-65 transition-all duration-300 hover:opacity-100 dark:hidden justify-center"
            src={image}
            alt={name}
            fill
          />
          <Image
            className="hidden opacity-50 transition-all duration-300 hover:opacity-100 dark:block justify-center"
            src={imageLight}
            alt={name}
            fill
          />
        </div>        
      </motion.a>
    </>
  );
};

export default SingleBrand;
