import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { certif } from "./data";
import {
  IconCertificate,
  IconChevronLeft,
  IconChevronRight,
  IconExternalLink,
} from "@tabler/icons-react";

export function Certif() {
  const [active, setActive] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const selectSlide = (index: number) => {
    const nextIndex = (index + certif.length) % certif.length;
    setActive(nextIndex);

    if (scrollRef.current) {
      const container = scrollRef.current;
      const card = container.children[nextIndex] as HTMLElement | undefined;
      if (card) {
        const scrollLeft =
          card.offsetLeft -
          container.clientWidth / 2 +
          card.clientWidth / 2;
        container.scrollTo({ left: scrollLeft, behavior: "smooth" });
      }
    }
  };

  return (
    <section
      id="achievement-section"
      className="relative py-36 md:py-48 overflow-hidden"
    >
      {/* Ambient Blue Background Glows */}
      <div className="pointer-events-none absolute top-16 left-1/2 -translate-x-1/2 w-[600px] h-[240px] rounded-full" />
      <div className="pointer-events-none absolute bottom-16 left-1/3 w-[450px] h-[250px] bg-cyan-500/10 blur-[130px] rounded-full" />

      {/* Header */}
      <div className="relative z-10 max-w-6xl mx-auto mb-14 px-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/30 text-cyan-400 text-xs font-semibold tracking-widest uppercase mb-4 shadow-[0_0_20px_rgba(59,130,246,0.3)]">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#22d3ee]" />
            VERIFIED CREDENTIALS
          </div>

          <h2
            className="text-3xl md:text-5xl font-extrabold text-white tracking-tight"
            style={{
              textShadow:
                "0 0 28px rgba(59, 130, 246, 0.8), 0 0 55px rgba(34, 211, 238, 0.45)",
            }}
          >
            Certifications & Achievements
          </h2>

          <p
            className="mt-3 text-sm md:text-base text-blue-100/75 max-w-xl leading-relaxed"
            style={{
              textShadow: "0 0 15px rgba(59, 130, 246, 0.35)",
            }}
          >
            A curated collection of official certificates, competition awards,
            and technical credentials.
          </p>
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center justify-center md:justify-end gap-3">
          <button
            type="button"
            onClick={() => selectSlide(active - 1)}
            aria-label="Previous Certificate"
            className="w-11 h-11 rounded-xl bg-[#071126]/90 border border-blue-500/35 text-blue-200 hover:text-cyan-300 hover:border-cyan-400/70 shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_28px_rgba(34,211,238,0.55)] flex items-center justify-center transition-all"
          >
            <IconChevronLeft size={20} />
          </button>

          <div className="px-3.5 py-2 rounded-xl bg-[#071126]/80 border border-blue-500/25 text-xs font-mono text-blue-200 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
            <span className="text-cyan-400 font-bold">0{active + 1}</span>
            <span className="mx-1.5 text-blue-400/50">/</span>
            <span>0{certif.length}</span>
          </div>

          <button
            type="button"
            onClick={() => selectSlide(active + 1)}
            aria-label="Next Certificate"
            className="w-11 h-11 rounded-xl bg-[#071126]/90 border border-blue-500/35 text-blue-200 hover:text-cyan-300 hover:border-cyan-400/70 shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_28px_rgba(34,211,238,0.55)] flex items-center justify-center transition-all"
          >
            <IconChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Carousel */}
      <div className="relative z-10">
        <div
          ref={scrollRef}
          className="
            flex gap-6 px-6 md:px-12 py-6
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
                onClick={() => selectSlide(i)}
                animate={{
                  scale: isActive ? 1 : 0.94,
                  opacity: isActive ? 1 : 0.72,
                  y: isActive ? -4 : 0,
                }}
                whileHover={{
                  scale: isActive ? 1.02 : 0.97,
                  opacity: 1,
                }}
                transition={{ type: "spring", stiffness: 200, damping: 22 }}
                className="snap-center shrink-0 cursor-pointer group"
              >
                <div
                  className={`
                    relative
                    w-[280px] sm:w-[320px] md:w-[350px]
                    rounded-2xl
                    overflow-hidden
                    border
                    backdrop-blur-xl
                    transition-all duration-500
                    ${
                      isActive
                        ? "border-cyan-400/75 bg-[#081530]/95 shadow-[0_0_45px_rgba(59,130,246,0.55)] ring-1 ring-cyan-400/35"
                        : "border-blue-500/30 bg-[#060f22]/85 shadow-[0_10px_30px_-5px_rgba(30,58,138,0.45)] hover:border-blue-400/55"
                    }
                  `}
                >
                  {/* Top Glowing Line */}
                  <div
                    className={`pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent z-20 transition-opacity duration-500 ${
                      isActive ? "opacity-100" : "opacity-40"
                    }`}
                  />

                  {/* Certificate Preview Area */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-gradient-to-b from-[#0a1938] to-[#040a17] p-3 flex items-center justify-center">
                    {/* Ambient Glow Behind Certificate */}
                    <div
                      className={`pointer-events-none absolute inset-6 rounded-xl blur-2xl transition-opacity duration-500 ${
                        isActive
                          ? "bg-blue-500/25 opacity-100"
                          : "bg-blue-600/10 opacity-60"
                      }`}
                    />

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 right-3 z-20 flex items-center justify-between pointer-events-none">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-[#050d1f]/85 text-cyan-300 border border-cyan-400/35 backdrop-blur-md shadow-[0_0_12px_rgba(59,130,246,0.35)]">
                        <IconCertificate size={13} className="text-cyan-400" />
                        Certificate
                      </span>

                      <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-[#050d1f]/85 text-blue-300 border border-blue-500/30 backdrop-blur-md">
                        #0{i + 1}
                      </span>
                    </div>

                    {/* Thumbnail */}
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      loading="lazy"
                      decoding="async"
                      className="relative z-10 w-full h-full object-contain rounded-lg transition-transform duration-500 group-hover:scale-105 drop-shadow-[0_8px_20px_rgba(0,0,0,0.65)]"
                    />
                  </div>

                  {/* Card Footer Info */}
                  <div className="relative p-5 border-t border-blue-500/25 bg-gradient-to-b from-[#08152e]/95 to-[#050c1b]">
                    <h3
                      className="text-base font-bold text-white leading-snug line-clamp-2 group-hover:text-cyan-200 transition-colors"
                      style={{
                        textShadow: isActive
                          ? "0 0 16px rgba(59, 130, 246, 0.65)"
                          : "0 0 8px rgba(59, 130, 246, 0.25)",
                      }}
                    >
                      {item.title}
                    </h3>

                    <div className="mt-4 flex items-center justify-between">
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-xl border transition-all duration-300 ${
                          isActive
                            ? "bg-gradient-to-r from-blue-600/80 to-cyan-500/80 border-cyan-300/60 text-white shadow-[0_0_20px_rgba(34,211,238,0.45)] hover:shadow-[0_0_28px_rgba(34,211,238,0.75)]"
                            : "bg-blue-950/60 border-blue-500/30 text-blue-200 hover:text-cyan-300 hover:border-cyan-400/50"
                        }`}
                      >
                        <span>View Credential</span>
                        <IconExternalLink size={14} />
                      </a>

                      <span
                        className={`h-2 w-2 rounded-full transition-all duration-300 ${
                          isActive
                            ? "bg-cyan-400 shadow-[0_0_10px_#22d3ee] scale-125"
                            : "bg-blue-500/40"
                        }`}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Pagination Dots */}
        <div className="mt-6 flex items-center justify-center gap-2">
          {certif.map((_, idx) => {
            const isActive = idx === active;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => selectSlide(idx)}
                aria-label={`Select certificate ${idx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  isActive
                    ? "w-8 bg-gradient-to-r from-blue-400 to-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.8)]"
                    : "w-2 bg-blue-500/30 hover:bg-blue-400/60"
                }`}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
