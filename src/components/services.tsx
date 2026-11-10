import { useState } from "react";
import { motion } from "framer-motion";
import { services } from "./data";
import { IconArrowUpRight } from "@tabler/icons-react";

export function OurServices() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="services" className="relative pt-24 pb-40 overflow-hidden">
      {/* Ambient Blue Background Glows */}
      <div className="pointer-events-none absolute top-12 left-1/2 -translate-x-1/2 w-[550px] h-[220px] rounded-full" />
      <div className="pointer-events-none absolute bottom-10 left-1/4 w-[400px] h-[250px] bg-cyan-500/10 blur-[130px] rounded-full" />
      <div className="pointer-events-none absolute top-1/2 right-10 w-[350px] h-[250px] bg-blue-500/10 blur-[120px] rounded-full" />

      {/* Header */}
      <div className="relative z-10 mb-16 text-center px-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/30 text-cyan-400 text-xs font-semibold tracking-widest uppercase mb-4 shadow-[0_0_20px_rgba(59,130,246,0.3)]">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#22d3ee]" />
          WHAT I OFFER
        </div>

        <h2
          className="text-3xl md:text-5xl font-extrabold text-white tracking-tight"
          style={{
            textShadow:
              "0 0 28px rgba(59, 130, 246, 0.8), 0 0 55px rgba(34, 211, 238, 0.45)",
          }}
        >
          Our Services
        </h2>

        <p
          className="mt-4 text-sm md:text-base text-blue-100/75 max-w-xl mx-auto leading-relaxed"
          style={{
            textShadow: "0 0 15px rgba(59, 130, 246, 0.35)",
          }}
        >
          Professional end-to-end engineering and design services to build,
          scale, and polish modern digital products.
        </p>
      </div>

      {/* Grid */}
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((item, i) => {
            const isActive = active === i;
            const Icon = item.icon;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                onHoverStart={() => setActive(i)}
                onHoverEnd={() => setActive(null)}
                whileHover={{ y: -8 }}
                className="group cursor-pointer h-full"
              >
                <div
                  className={`
                    relative h-full rounded-2xl border p-6 flex flex-col justify-between overflow-hidden
                    backdrop-blur-xl transition-all duration-500
                    ${
                      isActive
                        ? "border-cyan-400/70 bg-gradient-to-b from-[#0b1b3d] via-[#071229] to-[#050c1a] shadow-[0_0_40px_rgba(59,130,246,0.55)]"
                        : "border-blue-500/30 bg-[#071126]/85 shadow-[0_10px_35px_-5px_rgba(30,58,138,0.45)]"
                    }
                  `}
                >
                  {/* Top Glowing Highlight Line */}
                  <div
                    className={`pointer-events-none absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent transition-opacity duration-500 ${
                      isActive ? "opacity-100" : "opacity-40"
                    }`}
                  />

                  {/* Ambient Corner Blue Glow */}
                  <div
                    className={`pointer-events-none absolute -top-12 -right-12 w-32 h-32 rounded-full blur-2xl transition-all duration-500 ${
                      isActive ? "bg-cyan-400/25" : "bg-blue-600/15"
                    }`}
                  />

                  <div>
                    {/* Top Row: Icon & Service Number */}
                    <div className="flex items-center justify-between mb-6">
                      <div
                        className={`
                          w-14 h-14 rounded-2xl border flex items-center justify-center
                          transition-all duration-500
                          ${
                            isActive
                              ? "bg-gradient-to-br from-cyan-500/25 to-blue-600/30 border-cyan-400/60 text-cyan-300 shadow-[0_0_25px_rgba(34,211,238,0.55)] scale-105"
                              : "bg-blue-950/70 border-blue-500/30 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.25)]"
                          }
                        `}
                      >
                        <Icon size={26} />
                      </div>

                      <span
                        className={`text-xs font-mono font-bold tracking-widest px-2.5 py-1 rounded-lg border transition-all duration-300 ${
                          isActive
                            ? "text-cyan-300 border-cyan-400/40 bg-cyan-500/10 shadow-[0_0_12px_rgba(34,211,238,0.3)]"
                            : "text-blue-300/50 border-blue-500/20 bg-blue-950/40"
                        }`}
                      >
                        0{i + 1}
                      </span>
                    </div>

                    {/* Title */}
                    <h3
                      className="text-lg font-bold text-white group-hover:text-cyan-200 transition-colors"
                      style={{
                        textShadow: isActive
                          ? "0 0 18px rgba(59, 130, 246, 0.7)"
                          : "0 0 10px rgba(59, 130, 246, 0.3)",
                      }}
                    >
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="mt-2.5 text-sm text-blue-100/70 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  {/* Bottom Section: Tech Stack Pills & Glow Bar */}
                  <div className="mt-6 pt-4 border-t border-blue-500/20">
                    <div className="flex items-center justify-between mb-2.5">
                      <span className="text-[10px] font-semibold uppercase tracking-widest text-blue-300/60">
                        Core Stack
                      </span>
                      <IconArrowUpRight
                        size={15}
                        className={`transition-all duration-300 ${
                          isActive
                            ? "text-cyan-300 translate-x-0.5 -translate-y-0.5 drop-shadow-[0_0_6px_rgba(34,211,238,0.8)]"
                            : "text-blue-400/50"
                        }`}
                      />
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {item.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className={`text-xs font-medium px-2.5 py-1 rounded-lg border transition-all duration-300 ${
                            isActive
                              ? "bg-blue-500/20 border-cyan-400/50 text-cyan-200 shadow-[0_0_12px_rgba(59,130,246,0.35)]"
                              : "bg-[#0a1835]/90 border-blue-500/25 text-blue-200/80"
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Bottom expanding neon line */}
                    <div className="mt-4 h-1 w-full bg-blue-950/80 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-400 shadow-[0_0_10px_#22d3ee] transition-all duration-500 ${
                          isActive ? "w-full" : "w-1/3 opacity-60"
                        }`}
                      />
                    </div>
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
