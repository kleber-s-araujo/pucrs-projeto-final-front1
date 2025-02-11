import image1 from "@/public/images/user/user-01.png";
import image2 from "@/public/images/user/user-02.png";
import { Testimonial } from "@/types/testimonial";

export const testimonialData: Testimonial[] = [
  {
    id: 1,
    name: "José da Silva",
    designation: "Arquiteto",
    image: image1,
    content:
      "Incrível! Nunca havia recebido imagens tão incríveis com tanto nível de detalhes. Tudo parece ter sido feito com muito carinho...",
  },
  {
    id: 2,
    name: "Maria Antonieta",
    designation: "Estudante de Design",
    image: image2,
    content:
      "As Imagens ficaram lindas! E o melhor é que foram entregues muito rapidamente! Adorei!",
  },
  {
    id: 3,
    name: "Henrique Chaves",
    designation: "Arquiteto Sênior",
    image: image1,
    content:
      "As renderizações foram entregues com muita qualidade. Gostei muito e vou contratar os serviços mais vezes",
  },
  {
    id: 4,
    name: "Flávia Chagas",
    designation: "Arquiteta",
    image: image2,
    content:
      "Tudo muito lindo. As imagens ficaram perfeitas!",
  },
];
