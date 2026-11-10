import { useState } from "react";
import { motion } from "framer-motion";

const LETTERS = ["I", "N", "D", "R", "A"];
const DEPTH_LAYERS = 12;

export function TextHoverEffectDemo() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="relative py-20 md:py-28 lg:h-[32rem] flex flex-col items-center justify-center overflow-hidden select-none">
      {/* Soft Ambient Blue Glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[500px] md:w-[650px] h-[180px] md:h-[240px] bg-blue-600/10 blur-[130px] rounded-full" />

      {/* 3D Perspective Stage */}
      <div
        className="relative z-10 flex flex-col items-center justify-center cursor-pointer"
        style={{ perspective: "1400px" }}
        onClick={() => setIsFlipped((prev) => !prev)}
      >
        {/* Gentle 3D Tilt Stage */}
        <motion.div
          animate={{
            rotateX: [4, -4, 4],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ transformStyle: "preserve-3d" }}
          className="flex items-center justify-center gap-3 sm:gap-5 md:gap-8 px-4"
        >
          {LETTERS.map((char, index) => {
            const isCharHovered = hoveredIndex === index;

            return (
              <motion.div
                key={index}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                animate={{
                  rotateY: isCharHovered
                    ? 180
                    : isFlipped
                      ? 180
                      : [0, 180, 0],
                  y: isCharHovered ? -8 : [0, -5, 0],
                }}
                transition={{
                  rotateY:
                    isCharHovered || isFlipped
                      ? { type: "spring", stiffness: 110, damping: 18 }
                      : {
                          duration: 10,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: index * 0.25,
                        },
                  y: isCharHovered
                    ? { duration: 0.3 }
                    : {
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.2,
                      },
                }}
                style={{ transformStyle: "preserve-3d" }}
                className="relative flex items-center justify-center"
              >
                {/* 3D Extrusion Depth Slices (Clean Matte Dark-Blue 3D Sides, tanpa glow bertumpuk) */}
                {Array.from({ length: DEPTH_LAYERS }).map((_, layerIdx) => {
                  const zOffset = (layerIdx - DEPTH_LAYERS / 2) * 1.6;
                  const isOuterSlice =
                    layerIdx === 0 || layerIdx === DEPTH_LAYERS - 1;

                  return (
                    <span
                      key={layerIdx}
                      aria-hidden="true"
                      style={{
                        transform: `translateZ(${zOffset}px)`,
                        color: isOuterSlice ? "#1e40af" : "#0f2454",
                      }}
                      className="pointer-events-none absolute inset-0 flex items-center justify-center font-black text-6xl sm:text-8xl md:text-9xl lg:text-[10.5rem] leading-none tracking-wider select-none"
                    >
                      {char}
                    </span>
                  );
                })}

                {/* Front Face (0 deg) */}
                <span
                  style={{
                    transform: `translateZ(${(DEPTH_LAYERS / 2) * 1.6 + 1.2}px)`,
                    backfaceVisibility: "hidden",
                    WebkitTextStroke: "1px rgba(147, 197, 253, 0.35)",
                    filter: "drop-shadow(0 8px 20px rgba(30, 58, 138, 0.45))",
                  }}
                  className="relative font-black text-6xl sm:text-8xl md:text-9xl lg:text-[10.5rem] leading-none tracking-wider bg-gradient-to-b from-white via-slate-200 to-blue-400 bg-clip-text text-transparent"
                >
                  {char}
                </span>

                {/* Back Face (180 deg) */}
                <span
                  aria-hidden="true"
                  style={{
                    transform: `rotateY(180deg) translateZ(${
                      (DEPTH_LAYERS / 2) * 1.6 + 1.2
                    }px)`,
                    backfaceVisibility: "hidden",
                    WebkitTextStroke: "1px rgba(96, 165, 250, 0.4)",
                    filter: "drop-shadow(0 8px 20px rgba(30, 58, 138, 0.45))",
                  }}
                  className="pointer-events-none absolute inset-0 flex items-center justify-center font-black text-6xl sm:text-8xl md:text-9xl lg:text-[10.5rem] leading-none tracking-wider bg-gradient-to-b from-slate-100 via-blue-200 to-blue-500 bg-clip-text text-transparent"
                >
                  {char}
                </span>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Subtle Floor Line & Soft Reflection */}
        <div className="relative mt-8 md:mt-10 flex flex-col items-center">
          <div className="w-[200px] sm:w-[360px] md:w-[500px] h-[1.5px] bg-gradient-to-r from-transparent via-blue-400/40 to-transparent rounded-full" />
          <div className="w-[140px] sm:w-[260px] md:w-[360px] h-4 bg-blue-500/15 blur-xl rounded-full -mt-1" />
        </div>
      </div>
    </section>
  );
}
