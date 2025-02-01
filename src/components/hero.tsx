"use client";
import { HeroParallax } from "./ui/hero-parallax";
import Sertif1 from "./image/sertif3.png";
import Sertif2 from "./image/sertif2.png";
import Sertif3 from "./image/sertif1.png";
import Sertif4 from "./image/sertif4.png";
import Sertif5 from "./image/sertif5.png";
import Sertif6 from "./image/sertif8.jpg";
import Sertif7 from "./image/sertif6.png";

export function Hero() {
  return <HeroParallax products={products} />;
}

export const products = [
  {
    title: "Finalis BussinessPlan UWP 2024",
    link: "https://drive.google.com/drive/folders/1tUDJa0N6GdJfpVvH9d72kMIrn8UlF3wq",
    thumbnail: Sertif1,
  },
  {
    title: "Juara 3 Entrepeneur Fair Univeristas MaChung",
    link: "https://drive.google.com/drive/folders/1tUDJa0N6GdJfpVvH9d72kMIrn8UlF3wq",
    thumbnail: Sertif2,
  },
  {
    title: "Juara 3 BPC 8.0 2024 Universitas Hang Tuah",
    link: "https://drive.google.com/drive/folders/1tUDJa0N6GdJfpVvH9d72kMIrn8UlF3wq",
    thumbnail: Sertif3,
  },
  {
    title: "Informtaion Technology Specialist JavaScript",
    link: "https://drive.google.com/drive/folders/1tUDJa0N6GdJfpVvH9d72kMIrn8UlF3wq",
    thumbnail: Sertif4,
  },
  {
    title: "SemiFinalis Akselerasi Bussiness Chalengge 2023",
    link: "https://drive.google.com/drive/folders/1tUDJa0N6GdJfpVvH9d72kMIrn8UlF3wq",
    thumbnail: Sertif5,
  },
  {
    title: "Bootcamp React StoryBook Machine Vision",
    link: "https://drive.google.com/drive/folders/1tUDJa0N6GdJfpVvH9d72kMIrn8UlF3wq",
    thumbnail: Sertif6,
  },
  {
    title: "Semifinalis UI Inovation War 2023",
    link: "https://drive.google.com/drive/folders/1tUDJa0N6GdJfpVvH9d72kMIrn8UlF3wq",
    thumbnail: Sertif7,
  },
];
