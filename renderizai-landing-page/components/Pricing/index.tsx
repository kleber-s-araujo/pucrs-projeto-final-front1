"use client";
import Image from "next/image";
import SectionHeader from "../Common/SectionHeader";

const Pricing = () => {
  return (
    <>
      {/* <!-- ===== Pricing Table Start ===== --> */}
      <section className="overflow-hidden pb-20 pt-15 lg:pb-25 xl:pb-30">
        <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
          {/* <!-- Section Title Start --> */}
          <div className="animate_top mx-auto text-center">
            <SectionHeader
              headerInfo={{
                title: `PRICING PLANS`,
                subtitle: `Como funciona a Precificação`,
                description: ``,
              }}
            />
          </div>
          {/* <!-- Section Title End --> */}
        </div>

        <div className="relative mx-auto mt-15 max-w-[1207px] px-4 md:px-8 xl:mt-20 xl:px-0">
          <div className="absolute -bottom-15 -z-1 h-full w-full">
            <Image
              fill
              src="./images/shape/shape-dotted-light.svg"
              alt="Dotted"
              className="dark:hidden"
            />
          </div>
          <div className="flex flex-wrap justify-center gap-7.5 md:flex-nowrap md:gap-4 xl:gap-12.5">
            {/* <!-- Pricing Item --> */}
            <div className="animate_top group relative rounded-lg border border-stroke bg-white p-7.5 shadow-solid-10 dark:border-strokedark dark:bg-blacksection dark:shadow-none md:w-[45%] lg:w-1/3 xl:p-12.5">            
              <h3 className="mb-7.5 text-3xl font-bold text-black dark:text-white xl:text-sectiontitle3">
                Orçamento{" "}
                <span className="text-regular text-waterloo dark:text-manatee"></span>
              </h3>
              <h4 className="mb-2.5 text-para2 font-medium text-black dark:text-white">
                Detalhamento do Projeto
              </h4>
              <p>Informe os detalhes do seu projeto juntamente com todas as configurações desejadas.</p>

              <div className="mt-9 border-t border-stroke pb-12.5 pt-9 dark:border-strokedark">
                <ul>
                  <li className="mb-4 text-black last:mb-0 dark:text-manatee">
                    Pré-Orçamento Automático
                  </li>
                  <li className="mb-4 text-black last:mb-0 dark:text-manatee">
                    Seleção do Pacote de Renderização
                  </li>
                  <li className="mb-4 text-black opacity-40 last:mb-0 dark:text-manatee">
                    Seleção de Quantidade de Imagens Extras
                  </li>
                  <li className="mb-4 text-black opacity-40 last:mb-0 dark:text-manatee">
                    Previsão de Média de Custos
                  </li>
                </ul>
              </div>

            </div>

            {/* <!-- Pricing Item --> */}
            <div className="animate_top group relative rounded-lg border border-stroke bg-white p-7.5 shadow-solid-10 dark:border-strokedark dark:bg-blacksection dark:shadow-none md:w-[45%] lg:w-1/3 xl:p-12.5">

              <h3 className="mb-7.5 text-3xl font-bold text-black dark:text-white xl:text-sectiontitle3">
                OnBoarding{" "}
                <span className="text-regular text-waterloo dark:text-manatee"></span>
              </h3>
              <h4 className="mb-2.5 text-para2 font-medium text-black dark:text-white">
                Contato Inicial
              </h4>
              <p>Nossos diretores criativos realizam o contato inicial para alinhar os detalhes do seu projeto.</p>

              <div className="mt-9 border-t border-stroke pb-12.5 pt-9 dark:border-strokedark">
                <ul>
                  <li className="mb-4 text-black last:mb-0 dark:text-manatee">
                    Envie seu arquivo
                  </li>
                  <li className="mb-4 text-black last:mb-0 dark:text-manatee">
                    Suporte Exclusivo
                  </li>
                  <li className="mb-4 text-black last:mb-0 dark:text-manatee">
                    Artistas Alocados para seu Projeto
                  </li>
                  <li className="mb-4 text-black opacity-40 last:mb-0 dark:text-manatee">
                    Todo esforço necessário para te entregar a qualidade necessária
                  </li>
                </ul>
              </div>
            </div>

            {/* <!-- Pricing Item --> */}
            <div className="animate_top group relative rounded-lg border border-stroke bg-white p-7.5 shadow-solid-10 dark:border-strokedark dark:bg-blacksection dark:shadow-none md:w-[45%] lg:w-1/3 xl:p-12.5">
              <h3 className="mb-7.5 text-3xl font-bold text-black dark:text-white xl:text-sectiontitle3">
                Pagamento {" "}
              </h3>
              <h4 className="mb-2.5 text-para2 font-medium text-black dark:text-white">
                Seu Dinheiro Seguro
              </h4>
              <p>Seu dinheiro fica seguro até que você aprove o projeto. Só então, o dinheiro é liberado para o artista.</p>

              <div className="mt-9 border-t border-stroke pb-12.5 pt-9 dark:border-strokedark">
                <ul>
                  <li className="mb-4 text-black last:mb-0 dark:text-manatee">
                    Recebimento das Imagens
                  </li>
                  <li className="mb-4 text-black last:mb-0 dark:text-manatee">
                    Aprovação do Projeto
                  </li>
                  <li className="mb-4 text-black last:mb-0 dark:text-manatee">
                    Pagamento Realizado ao Artista
                  </li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </section>
      {/* <!-- ===== Pricing Table End ===== --> */}
    </>
  );
};

export default Pricing;
