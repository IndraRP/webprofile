import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useCallback } from "react";
import CvIndra from "../image/CV Indra Ridho R.P.pdf";

type Testimonial = {
  quote: string;
  name: string;
  designation: string;
  src: string;
};

const AnimatedTestimonials = ({
  testimonials,
  autoplay = false,
  autoplayInterval = 7000,
}: {
  testimonials: Testimonial[];
  autoplay?: boolean;
  autoplayInterval?: number;
}) => {
  const [active, setActive] = useState(0);

  const handleNext = useCallback(() => {
    setActive((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const handlePrev = useCallback(() => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  const isActive = (index: number) => {
    return index === active;
  };

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, autoplayInterval);
      return () => clearInterval(interval);
    }
  }, [autoplay, autoplayInterval, handleNext]);

  const randomRotateY = () => {
    return Math.floor(Math.random() * 21) - 10;
  };

  return (
    <section id="home-section" className="relative">
      {/* Ambient Blue Glow di belakang section */}
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[280px] rounded-full pointer-events-none" />

      <div className="max-w-sm md:max-w-5xl mx-auto antialiased px-4 md:px-8 lg:px-4 py-20 mt-20 relative z-10">
        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-20">
          <div>
            <div className="relative h-48 w-full sm:h-64 sm:w-64 md:h-80 md:w-80 lg:h-96 lg:w-96 px-1">
              {/* Cahaya Biru/Cyan Berpendar di Belakang Stack Foto */}
              <div className="absolute -inset-3 bg-gradient-to-tr from-blue-600/30 via-cyan-500/20 to-indigo-600/30 rounded-3xl blur-2xl opacity-80 pointer-events-none" />

              <AnimatePresence>
                {testimonials.map((testimonial, index) => (
                  <motion.div
                    key={testimonial.src}
                    initial={{
                      opacity: 0,
                      scale: 0.9,
                      z: -10,
                      rotate: randomRotateY(),
                    }}
                    animate={{
                      opacity: isActive(index) ? 1 : 0.7,
                      scale: isActive(index) ? 1 : 0.95,
                      z: isActive(index) ? 0 : -10,
                      rotate: isActive(index) ? 0 : randomRotateY(),
                      zIndex: isActive(index)
                        ? 99
                        : testimonials.length + 2 - index,
                      y: isActive(index) ? [0, -80, 0] : 0,
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.9,
                      z: 10,
                      rotate: randomRotateY(),
                    }}
                    transition={{
                      duration: 0.4,
                      ease: "easeInOut",
                    }}
                    className="absolute inset-0 origin-bottom"
                  >
                    <img
                      src={testimonial.src}
                      alt={testimonial.name}
                      loading="lazy"
                      className={`h-full w-full rounded-3xl object-cover object-center transition-shadow duration-500 ${
                        isActive(index)
                          ? "border-2 border-blue-400/50 shadow-[0_0_35px_rgba(59,130,246,0.45)]"
                          : "border border-blue-500/20 shadow-[0_10px_25px_rgba(30,58,138,0.35)]"
                      }`}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
          <div className="flex justify-between flex-col lg:py-16 relative">
            {/* Ambient Blue Glow tepat di belakang teks Header & Deskripsi */}
            <div className="absolute -top-6 -left-6 w-72 h-48 bg-blue-500/20 blur-[90px] rounded-full pointer-events-none" />

            <motion.div
              key={active}
              initial={{
                y: 20,
                opacity: 0,
              }}
              animate={{
                y: 0,
                opacity: 1,
              }}
              exit={{
                y: -20,
                opacity: 0,
              }}
              transition={{
                duration: 0.2,
                ease: "easeInOut",
              }}
              className="relative z-10"
            >
              <h3
                className="text-2xl sm:text-3xl font-bold text-white tracking-wide"
                style={{
                  textShadow:
                    "0 0 16px rgba(59, 130, 246, 0.85), 0 0 34px rgba(34, 211, 238, 0.5)",
                }}
              >
                {testimonials[active].name}
              </h3>
              <p
                className="inline-block mt-2 px-3.5 py-1 rounded-full bg-blue-950/80 border border-cyan-400/45 text-xs sm:text-sm font-semibold text-cyan-300 shadow-[0_0_20px_rgba(59,130,246,0.55)]"
                style={{
                  textShadow: "0 0 10px rgba(34, 211, 238, 0.7)",
                }}
              >
                {testimonials[active].designation}
              </p>
              <motion.p
                className="text-lg mt-7 text-blue-50/95 border-l-2 border-cyan-400 pl-4 py-3 pr-3 rounded-r-2xl "
                style={{
                  textShadow:
                    "0 0 14px rgba(59, 130, 246, 0.65), 0 0 28px rgba(30, 64, 175, 0.45)",
                }}
              >
                {testimonials[active].quote.split(" ").map((word, index) => (
                  <motion.span
                    key={index}
                    initial={{
                      filter: "blur(10px)",
                      opacity: 0,
                      y: 5,
                    }}
                    animate={{
                      filter: "blur(0px)",
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.2,
                      ease: "easeInOut",
                      delay: 0.02 * index,
                    }}
                    className="inline-block"
                  >
                    {word}&nbsp;
                  </motion.span>
                ))}
              </motion.p>
            </motion.div>

            <div className="lg:flex sm:block gap-4 justify-center pt-10 md:pt-5">
              <div className="flex gap-4 justify-center">
                <button
                  onClick={handlePrev}
                  className="h-8 w-8 mt-2 rounded-full bg-blue-950/80 hover:bg-blue-600/30 border border-blue-500/40 hover:border-cyan-400 flex items-center justify-center group/button shadow-[0_0_15px_rgba(59,130,246,0.3)] hover:shadow-[0_0_20px_rgba(34,211,238,0.5)] transition-all cursor-pointer"
                >
                  <IconArrowLeft className="h-5 w-5 text-blue-300 group-hover/button:text-cyan-300 group-hover/button:rotate-12 transition-transform duration-300" />
                </button>
                <button
                  onClick={handleNext}
                  className="h-8 w-8 mt-2 rounded-full bg-blue-950/80 hover:bg-blue-600/30 border border-blue-500/40 hover:border-cyan-400 flex items-center justify-center group/button shadow-[0_0_15px_rgba(59,130,246,0.3)] hover:shadow-[0_0_20px_rgba(34,211,238,0.5)] transition-all cursor-pointer"
                >
                  <IconArrowRight className="h-5 w-5 text-blue-300 group-hover/button:text-cyan-300 group-hover/button:-rotate-12 transition-transform duration-300" />
                </button>
              </div>

              <div
                className="btn-4 font-normal w-full lg:w-40 lg:ml-5 mt-4 lg:mt-0 shadow-[0_0_20px_rgba(59,130,246,0.25)] hover:shadow-[0_0_28px_rgba(34,211,238,0.45)] transition-shadow rounded-xl"
                data-tooltip="Size: 747Kb"
              >
                <div className="button-wrapper">
                  <div className="text">Download CV</div>
                  <span className="icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                      role="img"
                      width="2em"
                      height="2em"
                      preserveAspectRatio="xMidYMid meet"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 15V3m0 12l-4-4m4 4l4-4M2 17l.621 2.485A2 2 0 0 0 4.561 21h14.878a2 2 0 0 0 1.94-1.515L22 17"
                      ></path>
                    </svg>
                  </span>
                </div>
                <a
                  href={CvIndra}
                  download="CV Indra Ridho R.P.pdf"
                  className="download-link"
                >
                  {}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnimatedTestimonials;
