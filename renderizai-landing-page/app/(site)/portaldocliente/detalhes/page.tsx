import DetailComponent from "@/components/DetailPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Renderizaí | Plataforma de Renderização",
  description: "Plataforma de Renderizaçãoes e Design de Interiores",
};

const DetailPage = () => {
  return (
    <>
      <DetailComponent />
    </>
  );
};

export default DetailPage;