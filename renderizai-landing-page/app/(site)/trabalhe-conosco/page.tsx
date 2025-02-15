
import Trabalhe from "@/components/Trabalhe";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Renderizaí | Plataforma de Renderização",
  description: "Plataforma de Renderizaçãoes e Design de Interiores",
  // other metadata
};

const TrabalheConosco = async () => {  

    return (
        <>
            <section className="pb-16 pt-24 md:pb-20 md:pt-28 lg:pb-24 lg:pt-32">
                <div className="container mx-auto">
                    <Trabalhe />                    
                </div>
            </section>
        </>
    );
}

export default TrabalheConosco;