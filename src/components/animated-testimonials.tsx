// Your main file
import AnimatedTestimonials from "./ui/animated-testimonials";
import Foto1 from "./image/hangtuah.jpg";
import Foto2 from "./image/uwp.jpg";
import Foto3 from "./image/foto3.jpg";
import Foto4 from "./image/foto4.jpg";
import Foto5 from "./image/foto5.jpg";

export function AnimatedTestimonialsDemo() {
  const testimonials = [
    {
      quote:
        "As a Frontend Web Programmer, I value intuitive UI/UX and seamless integration. This platform has truly elevated my development process.",
      name: "Indra Ridho Rizkian Pratama",
      designation: "Frontend Web Programmer",
      src: Foto1,
    },
    {
      quote:
        "As a Backend Web Programmer, I appreciate how this platform streamlines API integration and optimizes server-side performance. It really enhances productivity.",
      name: "Indra Ridho Rizkian Pratama",
      designation: "Backend Web Programmer",
      src: Foto4,
    },
    {
      quote:
        "As a Data Analyst, the powerful data visualization tools and ease of reporting have transformed our team's workflow and decision-making process.",
      name: "Indra Ridho Rizkian Pratama",
      designation: "Data Analyst",
      src: Foto3,
    },
    {
      quote:
        "As a Project Manager, I’m impressed with the platform's reliability, user-friendliness, and the robust support provided. It streamlines project management tasks seamlessly.",
      name: "Indra Ridho Rizkian Pratama",
      designation: "Project Manager",
      src: Foto2,
    },
    {
      quote:
        "As a Business Planner and Entrepreneur, this platform’s scalability and performance are essential in supporting our rapid growth and providing key insights for business expansion.",
      name: "Indra Ridho Rizkian Pratama",
      designation: "Business Planner and Entrepreneur",
      src: Foto5,
    },
  ];

  return <AnimatedTestimonials testimonials={testimonials} />;
}
