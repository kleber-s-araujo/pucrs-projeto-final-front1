import { Metadata } from "next";
import Hero from "@/components/Hero";
import Brands from "@/components/Brands";
import Feature from "@/components/Features";
import About from "@/components/About";
import CTA from "@/components/CTA";
import FAQ from "@/components/FAQ";
import Pricing from "@/components/Pricing";
import Testimonial from "@/components/Testimonial";
import Carrousel from "@/components/Carrousel";

export const metadata: Metadata = {
  title: "Renderizaí | Plataforma de Renderização",
  description: "Plataforma de Renderizaçãoes e Design de Interiores",
  // other metadata
};

export default function Home() {
  return (
    <main>
      {/*  <Hero /> */}
      <Carrousel />
      <Brands />
      <Feature />
      <About />
      <CTA />
      <FAQ />
      <Testimonial />
      <Pricing />
    </main>
  );
}
