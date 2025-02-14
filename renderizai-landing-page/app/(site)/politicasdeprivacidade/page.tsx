import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Renderizaí | Plataforma de Renderização",
  description: "Plataforma de Renderizaçãoes e Design de Interiores",
  // other metadata
};

const PoliciesPage = () => {
  return (
    <section className="overflow-hidden pb-25 pt-45 lg:pb-32.5 lg:pt-50 xl:pb-37.5 xl:pt-55">
      <div className="animate_top mx-auto max-w-[800px] text-left">

        <div className="text-center">
          <h1 className="mb-5 text-2xl font-semibold text-black dark:text-white md:text-4xl">
            Políticas de Privacidade
          </h1>
        </div>

        <div className="blog-details">
          <p>
            A sua privacidade é importante para nós. Esta Política de Privacidade descreve como coletamos,
            usamos e protegemos suas informações ao participar de nossos projetos de renderização de design de interiores.
          </p>

          <h3 className="pt-8"> 1. Coleta de Informações </h3>
          <p>
            <b>Coletamos as seguintes informações: </b>
          </p>
          <ul className="mb-9 flex flex-wrap 2xl:gap-1.0">
            <li>
              <span className="text-black dark:text-white">Informações Pessoais: </span>{" "}
              Nome, e-mail, telefone e qualquer outra informação que você fornecer ao se inscrever ou entrar em contato conosco.
            </li>
            <li>
              <span className="text-black dark:text-white">Informações de Projeto: </span>{" "}
              Detalhes sobre seu projeto de design, incluindo fotos, plantas baixas e preferências de estilo.
            </li>
          </ul>

          <h3 className="pt-8"> 2. Uso das Informações </h3>
          <p>
            <b>As informações coletadas podem ser usadas para:</b>
          </p>
          <ul className="mb-9 flex flex-wrap 2xl:gap-1.0">
            <li>
              <span className="text-black dark:text-white"></span>{" "}
              Desenvolver e entregar projetos de renderização de design de interiores.
            </li>
            <li>
              <span className="text-black dark:text-white"></span>{" "}
              Comunicar-se com você sobre seu projeto, incluindo atualizações e solicitações de feedback.
            </li>
            <li>
              <span className="text-black dark:text-white"></span>{" "}
              Melhorar nossos serviços e personalizar sua experiência.
            </li>
          </ul>

          <h3 className="pt-8"> 3. Compartilhamento de Informações </h3>
          <p>
            <b>Não compartilhamos suas informações pessoais com terceiros, exceto em circunstâncias específicas:</b>
          </p>
          <ul className="mb-9 flex flex-wrap 2xl:gap-1.0">
            <li>
              <span className="text-black dark:text-white"></span>{" "}
              Para cumprir a lei ou proteger nossos direitos.
            </li>
            <li>
              <span className="text-black dark:text-white"></span>{" "}
              Com prestadores de serviços que ajudam a operar nosso negócio, sob condições de confidencialidade.
            </li>
          </ul>

          <h3 className="pt-8"> 4. Segurança das Informações </h3>
          <p>
            <b>Não compartilhamos suas informações pessoais com terceiros, exceto em circunstâncias específicas:</b>
          </p>
          <ul className="mb-9 flex flex-wrap 2xl:gap-1.0">
            <li>
              <span className="text-black dark:text-white"></span>{" "}
              Para cumprir a lei ou proteger nossos direitos.
            </li>
            <li>
              <span className="text-black dark:text-white"></span>{" "}
              Com prestadores de serviços que ajudam a operar nosso negócio, sob condições de confidencialidade.
            </li>
          </ul>

          <h3 className="pt-8"> 5. Seus Direitos </h3>
          <p>
            <b>Você tem o direito de:</b>
          </p>
          <ul className="mb-9 flex flex-wrap 2xl:gap-1.0">
            <li>
              <span className="text-black dark:text-white"></span>{" "}
              Acessar as informações que temos sobre você.
            </li>
            <li>
              <span className="text-black dark:text-white"></span>{" "}
              Solicitar a correção de informações imprecisas.
            </li>
            <li>
              <span className="text-black dark:text-white"></span>{" "}
              Pedir a exclusão de suas informações, sujeito a certas exceções legais.
            </li>
          </ul>

          <h3 className="pt-8"> 6. Alterações a Esta Política </h3>
          <p>
            Podemos atualizar esta Política de Privacidade ocasionalmente.
            Notificaremos você sobre quaisquer mudanças significativas por meio de um aviso em nosso site ou por e-mail.
          </p>

          <h3 className="pt-8"> 7. Contato </h3>
          <p>
            Se você tiver dúvidas ou preocupações sobre esta Política de Privacidade, entre em contato conosco:
          </p>
          <ul className="mb-9 flex flex-wrap 2xl:gap-1.0">
            <li>
              <span className="text-black dark:text-white">
                <b>E-mail: </b> </span>{" "}
              contato.renderizai@email.com
            </li>
            <li>
              <span className="text-black dark:text-white">
                <b>Telefone: </b>
              </span>{" "}
              (99) 99999-9999
            </li>
          </ul>

        </div>

        <div className="text-center">
          <a
            href="/"
            className="inline-flex items-center gap-2.5 rounded-full bg-black px-6 py-3 font-medium text-white duration-300 ease-in-out hover:bg-blackho dark:bg-btndark dark:hover:bg-blackho"
          >
            Voltar à página principal
            <svg
              className="fill-white"
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.4767 6.16664L6.00668 1.69664L7.18501 0.518311L13.6667 6.99998L7.18501 13.4816L6.00668 12.3033L10.4767 7.83331H0.333344V6.16664H10.4767Z"
                fill=""
              />
            </svg>
          </a>
        </div>
      </div>

    </section>
  );
};

export default PoliciesPage;