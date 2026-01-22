import { useState } from "react";
import { motion } from "framer-motion";
import { certif } from "./data";
import { IconCertificate } from "@tabler/icons-react";

export function Certif() {
  const [active, setActive] = useState(0);

  return (
    <section
      id="achievement-section"
      className="relative py-52 overflow-hidden"
    >
      {/* Header */}
      <div className="mb-12 text-center px-4">
        <h2 className="text-3xl font-bold text-white">
          Certifications & Achievements
        </h2>
        <p className="mt-3 text-gray-400 max-w-xl mx-auto">
          A collection of milestones from competitions and professional growth.
        </p>
      </div>

      {/* Carousel */}
      <div className="relative">
        <div
          className="
          flex gap-6 px-6
          overflow-x-auto
          snap-x snap-mandatory
          custom-scrollbar
          "
        >
          {certif.map((item, i) => {
            const isActive = i === active;

            return (
              <motion.div
                key={i}
                onClick={() => setActive(i)}
                animate={{
                  scale: isActive ? 1 : 0.92,
                  opacity: isActive ? 1 : 0.6,
                }}
                transition={{ type: "spring", stiffness: 180, damping: 20 }}
                className="snap-center shrink-0 cursor-pointer"
              >
                <div
                  className={`
                    relative
                    w-[260px] sm:w-[280px] md:w-[300px]
                    aspect-[4/3]
                    rounded-2xl
                    overflow-hidden
                    border
                    ${
                      isActive
                        ? "border-cyan-500/40 shadow-lg shadow-cyan-500/20"
                        : "border-slate-700"
                    }
                    bg-slate-900
                  `}
                >
                  {/* Thumbnail */}
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-full h-full object-contain bg-black"
                  />

                  {/* Overlay */}
                  <div
                    className="
                      absolute inset-0
                      flex flex-col justify-end
                      p-5
                      bg-gradient-to-t
                      from-black/80
                      via-black/40
                      to-transparent
                    "
                  >
                    <div className="flex items-center gap-2 mb-2 text-cyan-400">
                      <IconCertificate size={18} />
                      <span className="text-xs uppercase tracking-wide">
                        Certificate
                      </span>
                    </div>

                    <h3 className="text-sm font-semibold text-white leading-snug">
                      {item.title}
                    </h3>

                    {isActive && (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 text-sm text-cyan-400 hover:underline"
                      >
                        View Credential →
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
