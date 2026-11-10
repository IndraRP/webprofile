import { flow } from "./data";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { IconCalendarTime, IconSparkles, IconCode } from "@tabler/icons-react";

const CareerFlow = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section
      id="flow-section"
      className="relative py-28 bg-[#020617] overflow-hidden"
    >
      {/* Ambient Blue/Cyan Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[650px] h-[350px] bg-blue-600/15 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-[420px] h-[280px] bg-cyan-500/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/75 border border-blue-500/35 text-cyan-300 text-xs font-semibold tracking-[0.2em] uppercase mb-3.5 shadow-[0_0_20px_rgba(59,130,246,0.3)]"
          >
            <IconSparkles size={14} className="text-cyan-400" />
            <span>MY PROGRESSION</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight"
            style={{
              textShadow:
                "0 0 18px rgba(59, 130, 246, 0.8), 0 0 36px rgba(34, 211, 238, 0.4)",
            }}
          >
            Career Journey
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: -15 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="mt-3.5 text-slate-300 text-sm sm:text-base"
            style={{
              textShadow: "0 0 12px rgba(59, 130, 246, 0.45)",
            }}
          >
            A chronological timeline of my growth as a fullstack web developer
            and data analyst.
          </motion.p>
        </div>

        {/* Timeline */}
        <div ref={ref} className="relative pl-6 sm:pl-10 space-y-12">
          {/* Glowing Vertical Timeline Bar */}
          <div className="absolute left-[7px] sm:left-[11px] top-3 bottom-3 w-[2px] bg-gradient-to-b from-cyan-400 via-blue-500 to-blue-950 shadow-[0_0_15px_rgba(59,130,246,0.8)]" />

          {flow.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.55, delay: index * 0.12 }}
              className="relative group"
            >
              {/* Glowing Timeline Node Dot */}
              <div className="absolute -left-[23px] sm:-left-[35px] top-6 flex items-center justify-center">
                <span className="w-5 h-5 rounded-full bg-blue-500/25 border border-cyan-400/60 flex items-center justify-center shadow-[0_0_20px_rgba(34,211,238,0.85)] group-hover:scale-125 transition-transform duration-300">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee]" />
                </span>
              </div>

              {/* Card */}
              <div className="relative rounded-2xl bg-gradient-to-br from-[#0c152c]/95 via-[#091124]/95 to-[#060c1a]/95 border border-blue-500/30 group-hover:border-cyan-400/65 p-6 sm:p-7 shadow-[0_10px_35px_-5px_rgba(30,58,138,0.45)] group-hover:shadow-[0_0_38px_rgba(59,130,246,0.5)] transition-all duration-300 overflow-hidden">
                {/* Top Edge Neon Highlight */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent opacity-60 group-hover:opacity-100 transition-opacity" />

                {/* Subtle Radial Blue Glow inside Card */}
                <div className="absolute -top-10 -right-10 w-44 h-44 bg-blue-500/15 group-hover:bg-cyan-500/25 blur-3xl rounded-full pointer-events-none transition-all duration-500" />

                {/* Top Row: Year Pill & Step Badge */}
                <div className="flex items-center justify-between gap-3 flex-wrap mb-3">
                  <span
                    className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-950/90 border border-cyan-400/45 text-xs font-bold text-cyan-300 tracking-wider shadow-[0_0_16px_rgba(59,130,246,0.45)]"
                    style={{
                      textShadow: "0 0 8px rgba(34, 211, 238, 0.65)",
                    }}
                  >
                    <IconCalendarTime size={14} className="text-cyan-400" />
                    <span>{item.year}</span>
                  </span>

                  <span className="text-[11px] font-mono font-semibold text-blue-400/70">
                    STAGE 0{index + 1}
                  </span>
                </div>

                {/* Title */}
                <h3
                  className="text-xl sm:text-2xl font-bold text-white group-hover:text-cyan-200 transition-colors"
                  style={{
                    textShadow:
                      "0 0 15px rgba(59, 130, 246, 0.7), 0 0 30px rgba(37, 99, 235, 0.35)",
                  }}
                >
                  {item.title}
                </h3>

                {/* Description with Left Blue Glow Accent */}
                <p
                  className="text-slate-200/95 text-sm sm:text-base mt-3.5 leading-relaxed border-l-2 border-cyan-400/70 pl-3.5 py-1 bg-gradient-to-r from-blue-950/35 to-transparent rounded-r-xl"
                  style={{
                    textShadow: "0 0 12px rgba(59, 130, 246, 0.5)",
                  }}
                >
                  {item.description}
                </p>

                {/* Tech Stack / Frameworks */}
                <div className="flex items-center flex-wrap gap-2 mt-5 pt-4 border-t border-slate-800/70">
                  <IconCode size={15} className="text-blue-400 mr-1" />
                  {[
                    item.Framework1,
                    item.Framework2,
                    item.Framework3,
                    item.Framework4,
                  ]
                    .filter(Boolean)
                    .map((fw, i) => (
                      <span
                        key={i}
                        className="text-xs font-medium px-3 py-1 rounded-full bg-blue-950/70 text-blue-200 border border-blue-500/35 group-hover:border-cyan-400/50 shadow-[0_0_10px_rgba(59,130,246,0.2)] transition-colors"
                      >
                        {fw}
                      </span>
                    ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CareerFlow;
