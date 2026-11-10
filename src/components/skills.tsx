import React, { useState } from "react";
import { teamMembers } from "./data";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  IconCpu,
  IconCode,
  IconDeviceDesktop,
  IconServer,
  IconLayersSubtract,
  IconChartBar,
  IconTools,
  IconExternalLink,
  IconSparkles,
} from "@tabler/icons-react";

// Metadata level & persentase keahlian untuk setiap skill (sesuai referensi gambar)
const SKILL_PROFICIENCY: Record<
  string,
  { percentage: number; level: "Advanced" | "Intermediate" }
> = {
  HTML: { percentage: 95, level: "Advanced" },
  CSS: { percentage: 92, level: "Advanced" },
  JavaScript: { percentage: 90, level: "Advanced" },
  PHP: { percentage: 88, level: "Advanced" },
  Python: { percentage: 84, level: "Advanced" },
  "React JS": { percentage: 92, level: "Advanced" },
  "Next JS": { percentage: 86, level: "Advanced" },
  "Tailwind CSS": { percentage: 94, level: "Advanced" },
  Bootstrap: { percentage: 90, level: "Advanced" },
  "Blade Laravel": { percentage: 88, level: "Advanced" },
  Storybook: { percentage: 85, level: "Advanced" },
  "Node JS": { percentage: 86, level: "Advanced" },
  Laravel: { percentage: 92, level: "Advanced" },
  Django: { percentage: 78, level: "Intermediate" },
  "Cake PHP": { percentage: 85, level: "Advanced" },
  "Python Pandas": { percentage: 82, level: "Advanced" },
  Seaborn: { percentage: 78, level: "Intermediate" },
  Ajax: { percentage: 85, level: "Advanced" },
  MySQL: { percentage: 90, level: "Advanced" },
  Figma: { percentage: 86, level: "Advanced" },
};

// Ikon dan sub-deskripsi untuk setiap kelompok kategori
const CATEGORY_META: Record<
  string,
  { icon: React.ReactNode; badge: string }
> = {
  Language: {
    icon: <IconCode size={18} className="text-cyan-400" />,
    badge: "Core Foundations",
  },
  Frontend: {
    icon: <IconDeviceDesktop size={18} className="text-blue-400" />,
    badge: "UI & Client Side",
  },
  Backend: {
    icon: <IconServer size={18} className="text-indigo-400" />,
    badge: "Server & API",
  },
  Fullstack: {
    icon: <IconLayersSubtract size={18} className="text-purple-400" />,
    badge: "End-to-End Frameworks",
  },
  "Data Analyst": {
    icon: <IconChartBar size={18} className="text-emerald-400" />,
    badge: "Data & Visualization",
  },
  Lainnya: {
    icon: <IconTools size={18} className="text-amber-400" />,
    badge: "Database, Design & Tools",
  },
};

const Skills = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.08 });
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = Object.keys(teamMembers);
  const displayedCategories =
    activeCategory === "All"
      ? Object.entries(teamMembers)
      : Object.entries(teamMembers).filter(([cat]) => cat === activeCategory);

  const totalSkillsCount = Object.values(teamMembers).reduce(
    (acc, list) => acc + list.length,
    0
  );

  return (
    <section
      id="skills-section"
      ref={ref}
      className="relative py-24 px-4 sm:px-6 overflow-hidden"
    >
      {/* Ambient Background Glows (selaras dengan section lainnya) */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[650px] h-[300px] bg-cyan-500/10 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[250px] bg-blue-600/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Top Header seperti di gambar referensi */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
          <div>
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-semibold tracking-[0.2em] uppercase mb-3.5 shadow-sm shadow-cyan-950/50"
            >
              <IconCpu size={15} className="text-cyan-400" />
              <span>MY EXPERTISE</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: -15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.08 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight"
            >
              Skills &amp; Technologies
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.16 }}
              className="mt-3 text-slate-400 text-sm sm:text-base max-w-2xl"
            >
              A curated stack of programming languages, modern frameworks, and
              analytical tools organized by domain.
            </motion.p>
          </div>

          {/* Quick Category Filter Pills (tetap menampilkan semua grup saat "All") */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center gap-2 flex-wrap"
          >
            <button
              type="button"
              onClick={() => setActiveCategory("All")}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer inline-flex items-center gap-1.5 ${
                activeCategory === "All"
                  ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-cyan-500/25 border border-cyan-400/50"
                  : "bg-[#0b1120]/90 text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700"
              }`}
            >
              <IconSparkles size={14} />
              <span>All Groups ({totalSkillsCount})</span>
            </button>

            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? "bg-blue-950/90 text-cyan-300 border border-cyan-400/60 shadow-md shadow-cyan-950/40"
                      : "bg-[#0b1120]/80 text-slate-400 hover:text-slate-200 border border-slate-800/90 hover:border-slate-700"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </motion.div>
        </div>

        {/* Grouped Categories */}
        <div className="space-y-14">
          <AnimatePresence mode="popLayout">
            {displayedCategories.map(([category, members], catIdx) => {
              const meta = CATEGORY_META[category] || {
                icon: <IconCode size={18} className="text-cyan-400" />,
                badge: "Technology Stack",
              };

              return (
                <motion.div
                  layout
                  key={category}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, delay: catIdx * 0.08 }}
                  className="relative"
                >
                  {/* Category Group Header */}
                  <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-800/80">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-slate-900/90 border border-cyan-500/30 flex items-center justify-center shadow-inner shadow-cyan-500/10">
                        {meta.icon}
                      </div>
                      <div>
                        <div className="flex items-center gap-2.5">
                          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                            {category}
                          </h3>
                          <span className="px-2.5 py-0.5 text-[11px] font-semibold rounded-full bg-blue-950/70 text-cyan-300 border border-cyan-500/25">
                            {members.length}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5">
                          {meta.badge}
                        </p>
                      </div>
                    </div>

                    <div className="hidden sm:block h-px flex-1 max-w-xs ml-6 bg-gradient-to-r from-transparent via-cyan-500/25 to-transparent" />
                  </div>

                  {/* Cards Grid seperti referensi gambar */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-5">
                    {members.map((member, index) => {
                      const prof = SKILL_PROFICIENCY[member.name] || {
                        percentage: 85,
                        level: "Advanced",
                      };

                      return (
                        <motion.a
                          key={`${category}-${member.name}-${index}`}
                          href={member.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          initial={{ opacity: 0, y: 20 }}
                          animate={inView ? { opacity: 1, y: 0 } : {}}
                          whileHover={{ y: -6 }}
                          transition={{ duration: 0.35, delay: index * 0.05 }}
                          className="group relative rounded-2xl bg-gradient-to-b from-[#0d1527]/95 to-[#080d1a]/95 border border-cyan-500/15 hover:border-cyan-400/55 p-5 flex flex-col justify-between overflow-hidden shadow-xl shadow-black/50 hover:shadow-cyan-950/30 transition-all duration-300 cursor-pointer"
                        >
                          {/* Subtle Top Edge Glow */}
                          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                          {/* Radial Glow di belakang logo */}
                          <div className="absolute -top-6 -left-6 w-24 h-24 bg-cyan-500/10 group-hover:bg-cyan-400/20 blur-2xl rounded-full pointer-events-none transition-all duration-500" />

                          {/* Top Row: Icon + External Indicator */}
                          <div>
                            <div className="flex items-start justify-between mb-4">
                              <div className="w-12 h-12 rounded-xl bg-slate-900/90 border border-slate-800/90 group-hover:border-cyan-500/35 p-2.5 flex items-center justify-center shadow-md transition-all duration-300 group-hover:scale-110">
                                <img
                                  src={member.image}
                                  alt={member.name}
                                  loading="lazy"
                                  className="w-full h-full object-contain drop-shadow-[0_2px_8px_rgba(34,211,238,0.2)]"
                                />
                              </div>

                              <IconExternalLink
                                size={14}
                                className="text-slate-600 group-hover:text-cyan-400 opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                              />
                            </div>

                            {/* Skill Name & Short Desc */}
                            <h4 className="text-white font-bold text-sm sm:text-base group-hover:text-cyan-300 transition-colors line-clamp-1">
                              {member.name}
                            </h4>
                            <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                              {member.desc}
                            </p>
                          </div>

                          {/* Bottom Row: Level + Percentage + Glowing Progress Bar */}
                          <div className="mt-4 pt-3 border-t border-slate-800/50">
                            <div className="flex items-center justify-between text-xs mb-2">
                              <span className="text-slate-400 font-medium">
                                {prof.level}
                              </span>
                              <span className="text-cyan-300 font-bold font-mono">
                                {prof.percentage}%
                              </span>
                            </div>

                            {/* Progress Bar Track */}
                            <div className="w-full h-1.5 rounded-full bg-slate-800/90 overflow-hidden p-[1px]">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={
                                  inView
                                    ? { width: `${prof.percentage}%` }
                                    : { width: 0 }
                                }
                                transition={{
                                  duration: 1,
                                  delay: 0.2 + index * 0.06,
                                  ease: "easeOut",
                                }}
                                className="h-full rounded-full bg-gradient-to-r from-blue-500 via-cyan-400 to-teal-300 shadow-[0_0_10px_rgba(34,211,238,0.6)]"
                              />
                            </div>
                          </div>
                        </motion.a>
                      );
                    })}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Skills;
