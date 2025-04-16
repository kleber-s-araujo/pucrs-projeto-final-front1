"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Carrousel = () => {

  const router = useRouter();
  const [email, setEmail] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push('/simulacao');
  };

  // Sample product data
  const products = [
    {
      id: 1,
      name: "Minimalist Lounge Chair",
      description: "Scandinavian-inspired chair with clean lines and natural materials",
      price: "$899",
      image: "/images/carrousel/01.png", // Replace with actual image path
      color: "Walnut & Cream"
    },
    {
      id: 2,
      name: "Geometric Coffee Table",
      description: "Bold statement piece with brass accents and marble top",
      price: "$1,299",
      image: "/images/carrousel/02.png", // Replace with actual image path
      color: "Black & Gold"
    },
    {
      id: 3,
      name: "Ambient Floor Lamp",
      description: "Sculptural lighting with adjustable arms and warm glow",
      price: "$549",
      image: "/images/carrousel/03.png", // Replace with actual image path
      color: "Brushed Bronze"
    },
    {
      id: 4,
      name: "Ambient Floor Lamp",
      description: "Sculptural lighting with adjustable arms and warm glow",
      price: "$549",
      image: "/images/carrousel/04.png", // Replace with actual image path
      color: "Brushed Bronze"
    },
    {
      id: 5,
      name: "Ambient Floor Lamp",
      description: "Sculptural lighting with adjustable arms and warm glow",
      price: "$549",
      image: "/images/carrousel/05.png", // Replace with actual image path
      color: "Brushed Bronze"
    },
    {
      id: 6,
      name: "Ambient Floor Lamp",
      description: "Sculptural lighting with adjustable arms and warm glow",
      price: "$549",
      image: "/images/carrousel/06.png", // Replace with actual image path
      color: "Brushed Bronze"
    }
  ];

  // Auto-rotate slides every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % products.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [products.length]);

  return (
    <>
      <section className="overflow-hidden">
        <div className="mx-auto bg-gradient-to-b from-black via-black to-transparent">

          <div className="relative w-full h-screen overflow-hidden bg-gray-50 ">
            <div
              className="flex transition-transform duration-1000 ease-in-out h-full "
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {products.map((product) => (
                <div key={product.id} className="min-w-full h-full flex flex-col md:flex-row ">

                  {/* Image side */}
                  <div className="w-full h-full relative ">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={1980}
                      height={0}
                      className="object-cover w-full h-full"
                    />

                    {/* 
                    <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-blck/80 to-transparent">
                      <h2 className="text-4xl font-light text-white mb-2">{product.name}</h2>
                      <p className="text-lg text-gray-200">{product.color}</p>
                    </div>
                    */}

                    <div className="absolute top-0 left-0 w-full p-15 bg-gradient-to-b from-blck/70 to-transparent">

                    </div>

                  </div>

                </div>
              ))}
            </div>

            <div className="absolute bottom-0 left-0 w-full p-15 bg-gradient-to-t from-blck/90 to-transparent">
              <h1 className="mb-5 pr-16 text-3xl font-bold text-white xl:text-hero ">
                IMAGENS QUE  {"   "}
                <span className="relative inline-block before:absolute before:bottom-2.5 before:left-0 before:-z-1 before:h-3 before:w-full before:bg-titlebg dark:before:bg-titlebgdark ">
                  ENCANTAM
                </span>
              </h1>
              <p className="text-xl font-bold text-gray-100">
                Arquiteto e designer, dê vida aos seus projetos antes mesmo da obra começar!
              </p>
              <p className="text-lg text-gray-200">
                Renderizações realistas despertam emoção, eliminam inseguranças e transformam apresentações em decisões.
              </p>

              <div className="mt-10">
                <form onSubmit={handleSubmit}>
                  <div className="flex flex-wrap gap-5">
                    { /*
                      <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="text"
                        placeholder="Enter your email address"
                        className="rounded-full border border-stroke px-6 py-2.5 shadow-solid-2 focus:border-primary focus:outline-none dark:border-strokedark dark:bg-black dark:shadow-none dark:focus:border-primary"
                      />
                      */ }
                    <button
                      aria-label="get started button"
                      className="flex rounded-full bg-primary px-7.5 py-2.5 text-white duration-300 ease-in-out hover:bg-primaryho dark:bg-btndark dark:hover:bg-blackho"
                    >
                      Simular Renderização
                    </button>
                  </div>
                </form>
              </div>
            </div>

          </div>

        </div>
      </section>
    </>
  );
};

export default Carrousel;
