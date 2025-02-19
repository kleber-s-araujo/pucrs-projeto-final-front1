import Signin from "@/components/Auth/Signin";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Renderizaí | Plataforma de Renderização",
  description: "Plataforma de Renderizaçãoes e Design de Interiores",
};

const SigninPage = () => {
  return (
    <>
      <Signin />
    </>
  );
};

export default SigninPage;
