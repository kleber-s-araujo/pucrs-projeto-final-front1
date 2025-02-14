import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Renderizaí | Plataforma de Renderização",
  description: "Plataforma de Renderizaçãoes e Design de Interiores",
  // other metadata
};

export default function DocsPage() {
  return (
    <>
      <section className="pb-16 pt-24 md:pb-20 md:pt-28 lg:pb-24 lg:pt-32">
        <div className="container mx-auto">
          <div className="mr-30 ml-30 -mx-4 flex flex-wrap">
            { /*
            <div className="w-full px-4 lg:w-1/4">
              <div className="sticky top-[74px] rounded-lg border border-white p-4 shadow-solid-4  transition-all  dark:border-strokedark dark:bg-blacksection">
                <ul className="space-y-2">
                  <SidebarLink />
                </ul>
              </div>
            </div>
            */ }

            <div className="w-full px-4 lg:w-4/4">
              <div className="blog-details blog-details-docs shadow-three dark:bg-gray-dark rounded-sm bg-white px-8 py-11 sm:p-[55px] lg:mb-5 lg:px-8 xl:p-[55px]">
                <h1>Sobre a Renderizaí</h1>

                <p className="text-body-color dark:text-body-color-dark text-base">
                  A plataforma <b>Renderizaí</b> permite que arquitetos e designers de interiores entreguem imagens de alta qualidade sem sacrificar seu tempo pessoal.
                  Queremos ser a solução definitiva para quem já teve experiências ruins com freelancers e para aqueles que não têm tempo para renderizar internamente,
                  trazendo agilidade e segurança à rotina dos escritórios de arquitetura e design.
                </p>

                <h3>➝ Objetivo</h3>
                <p className="text-body-color dark:text-body-color-dark text-base">
                  <b>Conectar</b> profissionais da arquitetura e design de interiores com renderizadores qualificados,
                  criando uma rede confiável que atenda à demanda crescente de produção de imagens 3D realistas.
                </p>

                <br />
                <h3>➝ Necessidade</h3>
                <p className="text-body-color dark:text-body-color-dark text-base">
                  <b>Otimizar</b> o tempo do escritório e terceirizar com confiança a renderização,
                  permitindo que os profissionais se concentrem em atividades principais,
                  sem comprometer a qualidade das imagens ou os prazos de entrega.
                  Garantindo que os profissionais possam focar no que fazem de melhor: criar e gerenciar projetos.
                </p>

                <br />
                <h3>➝ Orientação</h3>
                <p className="text-body-color dark:text-body-color-dark text-base">
                  A plataforma <b>Renderizaí</b> foi criada com o propósito de:
                </p>
                <ul>
                  <li>Proporcionar uma solução ágil e segura para a terceirização de renderizações.</li>
                  <li>Assegurar que os profissionais possam confiar na qualidade e pontualidade da plataforma.</li>
                  <li>Facilitar o fluxo de comunicação e gestão de entregas, com foco em eficiência.</li>
                  <li>Reduzir o estresse e a incerteza de trabalhar com freelancers, oferecendo uma rede certificada de renderizadores.</li>
                  <li>Reduzir o risco de falhas e atrasos, oferecendo um sistema de monitoramento de prazos.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
