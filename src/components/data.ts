export const teamMembers = {
  Language: [
    {
      name: "HTML",
      desc: "HyperText Markup Language",
      image:
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
      url: "https://en.wikipedia.org/wiki/HTML",
    },
    {
      name: "CSS",
      desc: "Cascading Style Sheets",
      image:
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
      url: "https://en.wikipedia.org/wiki/CSS",
    },
    {
      name: "JavaScript",
      desc: "Dynamic programming language",
      image:
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
      url: "https://en.wikipedia.org/wiki/JavaScript",
    },
    {
      name: "PHP",
      desc: "Hypertext Preprocessor",
      image:
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
      url: "https://www.php.net/",
    },
    {
      name: "Python",
      desc: "Dynamic programming language",
      image:
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
      url: "https://www.python.org/",
    },
  ],

  Frontend: [
    {
      name: "React JS",
      desc: "Frontend JavaScript Library",
      image:
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
      url: "https://react.dev/",
    },
    {
      name: "Next JS",
      desc: "React Framework for SSR & SSG",
      image:
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
      url: "https://nextjs.org/",
    },
    {
      name: "Tailwind CSS",
      desc: "Utility-first CSS Framework",
      image:
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
      url: "https://tailwindcss.com/",
    },
    {
      name: "Bootstrap",
      desc: "CSS Component Framework",
      image:
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg",
      url: "https://getbootstrap.com/",
    },
    {
      name: "Blade Laravel",
      desc: "Laravel's Templating Engine",
      image:
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg",
      url: "https://laravel.com/docs/11.x/blade",
    },
    {
      name: "Storybook",
      desc: "UI Component Documentation Tool",
      image:
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/storybook/storybook-original.svg",
      url: "https://storybook.js.org/",
    },
  ],

  Backend: [
    {
      name: "Node JS",
      desc: "JavaScript Runtime Environment",
      image:
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
      url: "https://nodejs.org/en",
    },
    {
      name: "Laravel",
      desc: "Backend PHP Framework",
      image:
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg",
      url: "https://laravel.com/",
    },
  ],

  Fullstack: [
    {
      name: "Django",
      desc: "Fullstack Python Web Framework",
      image:
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg",
      url: "https://www.djangoproject.com/",
    },
    {
      name: "Cake PHP",
      desc: "Fullstack PHP Framework",
      image:
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cakephp/cakephp-original.svg",
      url: "https://cakephp.org/",
    },
    {
      name: "Laravel",
      desc: "Backend PHP Framework",
      image:
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg",
      url: "https://laravel.com/",
    },
  ],

  "Data Analyst": [
    {
      name: "Python Pandas",
      desc: "Data Analysis Library",
      image:
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg",
      url: "https://pandas.pydata.org/",
    },
    {
      name: "Seaborn",
      desc: "Data Analysis Library",
      image: "https://seaborn.pydata.org/_images/logo-mark-lightbg.svg",
      url: "https://seaborn.pydata.org/",
    },
  ],

  Lainnya: [
    {
      name: "MySQL",
      desc: "Relational Database Management System",
      image:
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
      url: "https://www.mysql.com/",
    },
    {
      name: "Figma",
      desc: "UI UX Designer",
      image:
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
      url: "https://www.figma.com/",
    },
  ],
};

export interface ProjectDataItem {
  title: string;
  description: string;
  category: "Frontend" | "Fullstack" | "Enterprise" | "PWA";
  previewType:
    | "component"
    | "ecommerce"
    | "landing"
    | "pos"
    | "dashboard"
    | "mobile"
    | "cinema"
    | "warehouse";
  featured?: boolean;
  url: string;
  Framework1: string;
  Framework2?: string;
  Framework3?: string;
  Framework4?: string;
  Framework5?: string;
  Framework6?: string;
  Framework7?: string;
  [key: string]: string | boolean | undefined;
}

export const data: ProjectDataItem[] = [
  {
    title: "Storybook Component Library",
    description:
      "Interactive UI component documentation and design system built with atomic design principles and smooth states.",
    category: "Frontend",
    previewType: "component",
    featured: true,
    Framework1: "TypeScript",
    Framework2: "Next.js",
    Framework3: "Storybook",
    url: "https://indrarp.github.io/StoryBook/?path=/docs/atomic-button--docs",
  },
  {
    title: "UKK (WiCafe) Fullstack POS",
    description:
      "Fullstack cafe Point-of-Sale system featuring multi-role dashboards for Cashier, Admin, and Manager with real-time analytics.",
    category: "Fullstack",
    previewType: "pos",
    featured: true,
    Framework1: "React",
    Framework2: "Tailwind",
    Framework3: "Node.js",
    url: "https://github.com/IndraRP/UKK-Caffe",
  },
  {
    title: "Enterprise Portal — Wahana Makmur Sejati",
    description:
      "Internal & public-facing corporate web modules, dealer management workflows, and interactive profile portals.",
    category: "Enterprise",
    previewType: "dashboard",
    featured: true,
    Framework1: "Cake PHP",
    Framework2: "Bootstrap",
    Framework3: "HTML",
    Framework4: "CSS",
    Framework5: "Javascript",
    Framework6: "PHP",
    Framework7: "Ajax",
    url: "https://www.wahanahonda.com/profil",
  },
  {
    title: "Management Gudang (ScanLogistik)",
    description:
      "Smart warehouse inventory & barcode logistics tracking dashboard with real-time stock mutations and reporting.",
    category: "Fullstack",
    previewType: "warehouse",
    featured: true,
    Framework1: "Laravel",
    Framework2: "Bootstrap",
    Framework3: "Livewire",
    url: "https://github.com/IndraRP/ScanLogistik",
  },
  {
    title: "Barberinaja — Booking App",
    description:
      "Progressive Web App for barbershop reservations, stylist queue management, and seamless mobile-first customer booking.",
    category: "PWA",
    previewType: "mobile",
    featured: true,
    Framework1: "Laravel",
    Framework2: "Bootstrap",
    Framework3: "PWA",
    url: "https://github.com/IndraRP/barberinaja",
  },
  {
    title: "Flickora — Streaming & Ticketing",
    description:
      "Modern movie discovery and cinema showcase platform with installable PWA support and responsive dark interface.",
    category: "PWA",
    previewType: "cinema",
    featured: true,
    Framework1: "Laravel",
    Framework2: "Bootstrap",
    Framework3: "PWA",
    url: "https://github.com/IndraRP/Flickora",
  },
  {
    title: "Friendchise E-Commerce (FrontEnd)",
    description:
      "Modern franchise marketplace frontend with intuitive catalog filtering, partnership onboarding, and clean UI.",
    category: "Frontend",
    previewType: "ecommerce",
    featured: false,
    Framework1: "Vitejs",
    Framework2: "Bootstrap",
    Framework3: "Javascript",
    url: "https://github.com/IndraRP/FRIENDCHISE_TA",
  },
  {
    title: "Personal Developer Portfolio",
    description:
      "High-performance developer portfolio featuring 3D WebGL Globe, Aceternity UI animations, and PWA capabilities.",
    category: "Frontend",
    previewType: "landing",
    featured: false,
    Framework1: "React",
    Framework2: "Tailwind",
    Framework3: "PWA",
    url: "https://indrarp.github.io/webprofile/",
  },
  {
    title: "Personal Website Mahes",
    description:
      "Custom-tailored personal branding landing page with smooth scroll transitions and responsive showcase sections.",
    category: "Frontend",
    previewType: "landing",
    featured: false,
    Framework1: "React",
    Framework2: "Tailwind",
    Framework3: "Javascript",
    url: "https://indrarp.github.io/mahesweb/",
  },
  {
    title: "Personal Website Nur Ardiansah",
    description:
      "Sleek modern portfolio website crafted with interactive UI components, project gallery, and fast performance.",
    category: "Frontend",
    previewType: "landing",
    featured: false,
    Framework1: "React",
    Framework2: "Tailwind",
    Framework3: "Javascript",
    url: "https://indrarp.github.io/NurArdiansah/",
  },
];

export const flow = [
  {
    year: "2022",
    title: "SMK Telkom Malang",
    Framework1: "Java",
    Framework2: "Php",
    Framework3: "Basic Web",
    Framework4: "Programming Logic",
    description:
      "First introduction to web development and programming fundamentals using Java.",
  },
  {
    year: "2023",
    title: "Frontend & UI/UX Journey",
    Framework1: "Node.js",
    Framework2: "React",
    Framework3: "Tailwind & Bootstrap",
    Framework4: "UI / UX",
    description:
      "Started building interactive web interfaces and understanding user-centered design.",
  },
  {
    year: "2024 - 2025",
    title: "Intership Advanced Backend & Fullstack",
    Framework1: "Django",
    Framework2: "CakePHP",
    Framework3: "Laravel",
    Framework4: "Data Analysis",
    description:
      "Internship and take various certifications to Explore various backend frameworks and start combining development with data analysis.",
  },
  {
    year: "2025 - Present",
    title: "PT Wahana Artha",
    Framework1: "Fullstack Web Development",
    Framework2: "System Analysis",
    Framework3: "Production Systems",
    Framework4: "UI / UX",
    description:
      "Working as a Fullstack Web Developer & Analyst, trusted even before graduation.",
  },
];

import Sertif1 from "./image/sertif3.webp";
import Sertif2 from "./image/sertif2.webp";
import Sertif3 from "./image/sertif1.webp";
import Sertif4 from "./image/sertif4.webp";
import Sertif5 from "./image/sertif5.webp";
import Sertif6 from "./image/sertif8.webp";
import Sertif7 from "./image/sertif6.webp";

export const certif = [
  {
    title: "Finalis Business Plan UWP 2024",
    link: "https://drive.google.com/drive/folders/1tUDJa0N6GdJfpVvH9d72kMIrn8UlF3wq",
    thumbnail: Sertif1,
  },
  {
    title: "Juara 3 Entrepreneur Fair Universitas Ma Chung",
    link: "https://drive.google.com/drive/folders/1tUDJa0N6GdJfpVvH9d72kMIrn8UlF3wq",
    thumbnail: Sertif2,
  },
  {
    title: "Juara 3 BPC 8.0 Universitas Hang Tuah",
    link: "https://drive.google.com/drive/folders/1tUDJa0N6GdJfpVvH9d72kMIrn8UlF3wq",
    thumbnail: Sertif3,
  },
  {
    title: "IT Specialist JavaScript",
    link: "https://drive.google.com/drive/folders/1tUDJa0N6GdJfpVvH9d72kMIrn8UlF3wq",
    thumbnail: Sertif4,
  },
  {
    title: "Semifinalis ABC 2023",
    link: "https://drive.google.com/drive/folders/1tUDJa0N6GdJfpVvH9d72kMIrn8UlF3wq",
    thumbnail: Sertif5,
  },
  {
    title: "Bootcamp React Storybook Machine Vision",
    link: "https://drive.google.com/drive/folders/1tUDJa0N6GdJfpVvH9d72kMIrn8UlF3wq",
    thumbnail: Sertif6,
  },
  {
    title: "Semifinalis UI Innovation War 2023",
    link: "https://drive.google.com/drive/folders/1tUDJa0N6GdJfpVvH9d72kMIrn8UlF3wq",
    thumbnail: Sertif7,
  },
];

import {
  IconLayout,
  IconServer,
  IconStack2,
  IconPalette,
} from "@tabler/icons-react";

export const services = [
  {
    title: "Frontend Development",
    desc: "Building responsive, fast, and accessible web interfaces with modern frameworks.",
    icon: IconLayout,
    tags: ["React", "Nuxt.js", "Next.js"],
  },
  {
    title: "Backend Development",
    desc: "Designing secure APIs, databases, and scalable server-side systems.",
    icon: IconServer,
    tags: ["Laravel", "Node.js", "Cake.php"],
  },
  {
    title: "Fullstack Web Development",
    desc: "End-to-end web solutions from UI to database and deployment.",
    icon: IconStack2,
    tags: ["Laravel", "Cake", "Django"],
  },
  {
    title: "UI / UX Design",
    desc: "User-centered design focused on usability, clarity, and aesthetics.",
    icon: IconPalette,
    tags: ["Figma", "Wireframe", "Design System"],
  },
];
