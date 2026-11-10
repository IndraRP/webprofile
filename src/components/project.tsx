import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import {
  IconArrowRight,
  IconArrowLeft,
  IconExternalLink,
  IconSparkles,
  IconPlayerPause,
  IconPlayerPlay,
} from "@tabler/icons-react";
import { data as projects, ProjectDataItem } from "./data";

// Helper untuk mengekstrak list framework dari object project
export const getProjectFrameworks = (item: ProjectDataItem): string[] => {
  return Object.keys(item)
    .filter((key) => key.toLowerCase().startsWith("framework"))
    .map((key) => item[key])
    .filter((val): val is string => typeof val === "string" && val.trim().length > 0);
};

// Navigasi ke halaman View All Projects
export const navigateToAllProjects = () => {
  window.location.hash = "#/projects";
  window.scrollTo({ top: 0, behavior: "smooth" });
};

// Visual Mockup Header sesuai tipe project (seperti referensi gambar)
export const ProjectPreviewMockup: React.FC<{
  type: ProjectDataItem["previewType"];
  title: string;
  category: string;
}> = ({ type, category }) => {
  switch (type) {
    case "mobile":
      return (
        <div className="relative w-full h-48 overflow-hidden bg-gradient-to-b from-indigo-950/90 via-slate-950 to-[#0b1120] flex items-center justify-center p-4">
          {/* Ambient Backlight Glow */}
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-48 h-28 bg-blue-500/35 blur-2xl rounded-full pointer-events-none group-hover:bg-blue-400/50 transition-all duration-500" />
          <div className="absolute bottom-0 inset-x-0 h-12 bg-gradient-to-t from-[#0b1120] to-transparent z-20" />

          {/* 3 Tilted Mobile Screens Mockup */}
          <div className="relative flex items-center justify-center gap-2.5 z-10 group-hover:scale-105 transition-transform duration-500">
            {/* Left Phone */}
            <div className="w-16 h-32 rounded-xl bg-slate-900/95 border border-indigo-500/30 p-1.5 -rotate-12 translate-y-3 shadow-lg opacity-75">
              <div className="w-4 h-1 bg-slate-700 rounded-full mx-auto mb-1.5" />
              <div className="space-y-1.5">
                <div className="h-6 rounded bg-indigo-600/30 border border-indigo-500/30" />
                <div className="h-2 w-10 rounded bg-slate-700" />
                <div className="h-2 w-8 rounded bg-slate-800" />
                <div className="grid grid-cols-2 gap-1 pt-1">
                  <div className="h-7 rounded bg-slate-800" />
                  <div className="h-7 rounded bg-slate-800" />
                </div>
              </div>
            </div>

            {/* Center Main Phone */}
            <div className="w-20 h-36 rounded-2xl bg-gradient-to-b from-blue-600 via-indigo-700 to-slate-900 border-2 border-blue-300/60 p-2 shadow-2xl shadow-blue-500/30 z-10 -translate-y-1">
              <div className="w-6 h-1 bg-blue-200/60 rounded-full mx-auto mb-2" />
              <div className="flex justify-between items-center mb-2">
                <div className="h-2 w-8 bg-white/80 rounded" />
                <div className="w-3 h-3 rounded-full bg-cyan-300/90" />
              </div>
              <div className="p-1.5 rounded-lg bg-white/15 backdrop-blur-sm mb-2">
                <div className="h-1.5 w-10 bg-white/90 rounded mb-1" />
                <div className="h-1.5 w-6 bg-blue-200/80 rounded" />
              </div>
              <div className="space-y-1.5 bg-white/95 rounded-lg p-1.5">
                <div className="flex items-center gap-1">
                  <div className="w-2.5 h-2.5 rounded bg-blue-500" />
                  <div className="h-1.5 w-9 bg-slate-700 rounded" />
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2.5 h-2.5 rounded bg-indigo-500" />
                  <div className="h-1.5 w-7 bg-slate-600 rounded" />
                </div>
                <div className="h-3 w-full rounded bg-blue-600 mt-1" />
              </div>
            </div>

            {/* Right Phone */}
            <div className="w-16 h-32 rounded-xl bg-slate-100 border border-blue-300/50 p-1.5 rotate-12 translate-y-2 shadow-lg opacity-90">
              <div className="w-4 h-1 bg-slate-300 rounded-full mx-auto mb-1.5" />
              <div className="space-y-1.5">
                <div className="h-3 w-10 rounded bg-indigo-600/80" />
                <div className="h-5 rounded bg-indigo-100 border border-indigo-200" />
                <div className="h-5 rounded bg-blue-50 border border-blue-200" />
                <div className="h-4 rounded bg-indigo-600" />
              </div>
            </div>
          </div>

          <span className="absolute top-3 right-3 z-20 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded-full bg-indigo-950/90 text-indigo-300 border border-indigo-500/30">
            {category}
          </span>
        </div>
      );

    case "dashboard":
    case "warehouse":
    case "pos":
      return (
        <div className="relative w-full h-48 overflow-hidden bg-gradient-to-b from-sky-950/80 via-slate-950 to-[#0b1120] flex items-center justify-center p-4">
          {/* Ambient Backlight Glow */}
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-56 h-28 bg-cyan-500/30 blur-2xl rounded-full pointer-events-none group-hover:bg-cyan-400/45 transition-all duration-500" />
          <div className="absolute bottom-0 inset-x-0 h-10 bg-gradient-to-t from-[#0b1120] to-transparent z-20" />

          {/* Admin Analytics Dashboard Screen Mockup */}
          <div className="relative w-[88%] h-36 rounded-xl bg-white/95 border-2 border-slate-700/80 shadow-2xl shadow-cyan-500/20 overflow-hidden flex group-hover:scale-105 group-hover:-translate-y-0.5 transition-all duration-500 z-10">
            {/* Sidebar */}
            <div className="w-12 bg-slate-900 p-2 flex flex-col gap-1.5 border-r border-slate-200">
              <div className="flex gap-1 mb-1">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              </div>
              <div className="h-2 w-full rounded bg-blue-500" />
              <div className="h-1.5 w-6 rounded bg-slate-700" />
              <div className="h-1.5 w-7 rounded bg-slate-700" />
              <div className="h-1.5 w-5 rounded bg-slate-700" />
              <div className="h-1.5 w-7 rounded bg-slate-700" />
            </div>

            {/* Dashboard Content */}
            <div className="flex-1 p-2.5 bg-slate-50 flex flex-col justify-between">
              {/* Top Bar */}
              <div className="flex items-center justify-between">
                <div>
                  <div className="h-2 w-16 bg-slate-800 rounded mb-1" />
                  <div className="h-1.5 w-10 bg-slate-400 rounded" />
                </div>
                <div className="flex items-center gap-1">
                  <div className="h-3 w-10 rounded-full bg-blue-100 border border-blue-300" />
                  <div className="w-3.5 h-3.5 rounded-full bg-blue-600" />
                </div>
              </div>

              {/* KPI Cards */}
              <div className="grid grid-cols-3 gap-1.5 my-1.5">
                <div className="p-1.5 rounded-md bg-white border border-slate-200 shadow-sm">
                  <div className="h-1 w-6 bg-slate-400 rounded mb-1" />
                  <div className="h-2.5 w-10 bg-blue-600 rounded" />
                </div>
                <div className="p-1.5 rounded-md bg-white border border-slate-200 shadow-sm">
                  <div className="h-1 w-6 bg-slate-400 rounded mb-1" />
                  <div className="h-2.5 w-9 bg-emerald-500 rounded" />
                </div>
                <div className="p-1.5 rounded-md bg-white border border-slate-200 shadow-sm">
                  <div className="h-1 w-6 bg-slate-400 rounded mb-1" />
                  <div className="h-2.5 w-8 bg-indigo-500 rounded" />
                </div>
              </div>

              {/* Charts Row */}
              <div className="grid grid-cols-3 gap-1.5 items-end h-12">
                <div className="col-span-2 h-full bg-white rounded-md border border-slate-200 p-1.5 flex items-end gap-1">
                  <div className="w-full bg-blue-400/70 h-[45%] rounded-t" />
                  <div className="w-full bg-blue-500/80 h-[75%] rounded-t" />
                  <div className="w-full bg-blue-600 h-[60%] rounded-t" />
                  <div className="w-full bg-cyan-500 h-[95%] rounded-t" />
                  <div className="w-full bg-indigo-500 h-[70%] rounded-t" />
                  <div className="w-full bg-blue-600 h-[85%] rounded-t" />
                </div>
                <div className="h-full bg-white rounded-md border border-slate-200 p-1 flex items-center justify-center">
                  <div className="w-7 h-7 rounded-full border-4 border-blue-500 border-t-cyan-300" />
                </div>
              </div>
            </div>
          </div>

          <span className="absolute top-3 right-3 z-20 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded-full bg-cyan-950/90 text-cyan-300 border border-cyan-500/30">
            {category}
          </span>
        </div>
      );

    case "component":
    case "cinema":
    case "ecommerce":
    case "landing":
    default:
      return (
        <div className="relative w-full h-48 overflow-hidden bg-gradient-to-b from-purple-950/80 via-slate-950 to-[#0b1120] flex items-center justify-center p-4">
          {/* Ambient Neon Purple/Blue Glow */}
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-56 h-28 bg-purple-500/35 blur-2xl rounded-full pointer-events-none group-hover:bg-purple-400/50 transition-all duration-500" />
          <div className="absolute bottom-0 inset-x-0 h-10 bg-gradient-to-t from-[#0b1120] to-transparent z-20" />

          {/* Dark SaaS Landing Page Mockup */}
          <div className="relative w-[88%] h-36 rounded-xl bg-[#0d1224] border border-purple-500/40 shadow-2xl shadow-purple-500/20 overflow-hidden p-3 flex flex-col justify-between group-hover:scale-105 group-hover:-translate-y-0.5 transition-all duration-500 z-10">
            {/* Browser Bar */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-purple-400" />
                <div className="h-1.5 w-12 bg-slate-700 rounded" />
              </div>
              <div className="flex gap-1.5">
                <div className="h-1.5 w-6 bg-slate-700 rounded" />
                <div className="h-1.5 w-6 bg-slate-700 rounded" />
                <div className="h-2 w-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full" />
              </div>
            </div>

            {/* Hero Split */}
            <div className="grid grid-cols-5 gap-2 items-center my-auto py-1">
              <div className="col-span-3 space-y-1.5">
                <div className="h-1.5 w-12 rounded bg-purple-400/80" />
                <div className="h-2.5 w-full rounded bg-gradient-to-r from-white via-purple-100 to-slate-400" />
                <div className="h-2 w-4/5 rounded bg-slate-400" />
                <div className="flex gap-1.5 pt-1">
                  <div className="h-3.5 w-12 rounded-md bg-gradient-to-r from-purple-500 to-blue-500 shadow-sm shadow-purple-500/50" />
                  <div className="h-3.5 w-10 rounded-md bg-slate-800 border border-slate-700" />
                </div>
              </div>
              <div className="col-span-2 h-16 rounded-lg bg-gradient-to-br from-purple-600/40 via-blue-600/30 to-cyan-500/30 border border-purple-400/40 p-1.5 flex flex-col justify-between relative overflow-hidden">
                <div className="w-8 h-8 rounded-full bg-cyan-400/30 blur-md absolute -right-1 -top-1" />
                <div className="h-2 w-8 bg-white/80 rounded" />
                <div className="grid grid-cols-2 gap-1">
                  <div className="h-5 rounded bg-purple-500/40 border border-purple-400/30" />
                  <div className="h-5 rounded bg-blue-500/40 border border-blue-400/30" />
                </div>
              </div>
            </div>

            {/* Bottom Feature Strip */}
            <div className="grid grid-cols-3 gap-1.5 pt-1 border-t border-slate-800/80">
              <div className="h-2 rounded bg-slate-800" />
              <div className="h-2 rounded bg-slate-800" />
              <div className="h-2 rounded bg-slate-800" />
            </div>
          </div>

          <span className="absolute top-3 right-3 z-20 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded-full bg-purple-950/90 text-purple-300 border border-purple-500/30">
            {category}
          </span>
        </div>
      );
  }
};

// Komponen Card Project (digunakan di Carousel & halaman All Projects)
export const ProjectCard: React.FC<{ item: ProjectDataItem; index?: number }> = ({
  item,
}) => {
  const frameworks = getProjectFrameworks(item);

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="group relative flex flex-col justify-between rounded-2xl bg-[#0b1120]/90 border border-blue-500/20 hover:border-blue-400/60 overflow-hidden shadow-xl shadow-black/50 hover:shadow-blue-900/25 transition-all duration-300 h-full"
    >
      {/* Top Edge Subtle Highlight */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent opacity-60 group-hover:opacity-100 transition-opacity z-30" />

      <div>
        {/* Preview Mockup Image Area */}
        <ProjectPreviewMockup
          type={item.previewType}
          title={item.title}
          category={item.category}
        />

        {/* Card Body */}
        <div className="p-6 pt-4">
          <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors line-clamp-1">
            {item.title}
          </h3>
          <p className="mt-2.5 text-sm text-slate-400 leading-relaxed line-clamp-2 min-h-[2.75rem]">
            {item.description}
          </p>

          {/* Tech Stack Pills */}
          <div className="mt-5 flex flex-wrap gap-2">
            {frameworks.slice(0, 4).map((fw, idx) => (
              <span
                key={idx}
                className="px-3 py-1 text-xs font-medium rounded-full bg-blue-950/70 text-blue-200 border border-blue-500/25 group-hover:border-blue-400/40 transition-colors"
              >
                {fw}
              </span>
            ))}
            {frameworks.length > 4 && (
              <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-slate-800/80 text-slate-300 border border-slate-700">
                +{frameworks.length - 4}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Footer Link */}
      <div className="px-6 pb-6 pt-2 flex items-center justify-between border-t border-slate-800/40 mt-2">
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-semibold text-blue-400 hover:text-cyan-300 transition-colors group/link"
        >
          <span>View Project</span>
          <IconArrowRight
            size={16}
            className="transform group-hover/link:translate-x-1 transition-transform"
          />
        </a>

        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${item.title}`}
          className="p-2 rounded-lg text-slate-500 hover:text-slate-200 hover:bg-slate-800/60 transition"
        >
          <IconExternalLink size={15} />
        </a>
      </div>
    </motion.div>
  );
};

const AUTOPLAY_INTERVAL = 5000; // 5 detik sesuai instruksi user

const Project = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [cardsPerView, setCardsPerView] = useState(3);

  // Responsif jumlah card yang tampil (1 di HP, 2 di Tablet, 3 di Desktop)
  useEffect(() => {
    const updateCardsPerView = () => {
      if (window.innerWidth < 768) {
        setCardsPerView(1);
      } else if (window.innerWidth < 1200) {
        setCardsPerView(2);
      } else {
        setCardsPerView(3);
      }
    };
    updateCardsPerView();
    window.addEventListener("resize", updateCardsPerView);
    return () => window.removeEventListener("resize", updateCardsPerView);
  }, []);

  const totalSlides = projects.length;

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  // Auto-slide setiap 5 detik
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      handleNext();
    }, AUTOPLAY_INTERVAL);
    return () => clearInterval(timer);
  }, [isPaused, handleNext, currentIndex]);

  // Ambil item yang tampil secara melingkar (infinite loop)
  const visibleProjects = Array.from({ length: cardsPerView }, (_, offset) => {
    const idx = (currentIndex + offset) % totalSlides;
    return { project: projects[idx], originalIndex: idx };
  });

  return (
    <section
      id="project-section"
      className="relative text-gray-100 py-28 px-4 sm:px-6 overflow-hidden"
    >
      {/* Background Ambient Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Bar seperti gambar referensi */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.22em] text-blue-400 uppercase mb-2.5">
              <IconSparkles size={14} className="text-blue-400" />
              <span>MY SELECTED WORK</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Featured Projects
            </h2>
          </div>

          <div className="flex items-center gap-4 self-start sm:self-auto">
            {/* Tombol View All Projects */}
            <button
              type="button"
              onClick={navigateToAllProjects}
              className="group inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-950/50 hover:bg-blue-900/60 border border-blue-500/30 hover:border-blue-400/60 text-blue-300 hover:text-white text-sm font-semibold transition-all cursor-pointer shadow-lg shadow-blue-950/30"
            >
              <span>View All Projects</span>
              <span className="px-2 py-0.5 text-xs rounded-full bg-blue-500/20 text-blue-200 border border-blue-400/20">
                {projects.length}
              </span>
              <IconArrowRight
                size={17}
                className="transform group-hover:translate-x-1 transition-transform"
              />
            </button>
          </div>
        </div>

        {/* Carousel Container */}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="relative"
        >
          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7">
            {visibleProjects.map(({ project, originalIndex }, pos) => (
              <motion.div
                key={`${originalIndex}-${pos}`}
                initial={{ opacity: 0, x: 40, scale: 0.97 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{
                  duration: 0.45,
                  delay: pos * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="h-full"
              >
                <ProjectCard item={project} index={originalIndex} />
              </motion.div>
            ))}
          </div>

          {/* Controls & Progress Indicator */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-6">
            {/* Dot Indicators + Animated 5s Progress */}
            <div className="flex items-center gap-2 flex-wrap justify-center">
              {projects.map((proj, idx) => {
                const isActive = idx === currentIndex;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setCurrentIndex(idx)}
                    aria-label={`Go to project ${proj.title}`}
                    className={`relative h-2.5 rounded-full transition-all duration-300 overflow-hidden cursor-pointer ${
                      isActive
                        ? "w-10 bg-blue-950 border border-blue-500/40"
                        : "w-2.5 bg-slate-800 hover:bg-slate-700"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        key={`${currentIndex}-${isPaused}`}
                        initial={{ width: "0%" }}
                        animate={{ width: isPaused ? "100%" : "100%" }}
                        transition={{
                          duration: isPaused ? 0 : AUTOPLAY_INTERVAL / 1000,
                          ease: "linear",
                        }}
                        className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Navigation Buttons (Play/Pause, Prev, Next) */}
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => setIsPaused((prev) => !prev)}
                className="px-3 py-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white text-xs font-medium inline-flex items-center gap-1.5 transition cursor-pointer"
                title={isPaused ? "Resume Autoplay (5s)" : "Pause Autoplay"}
              >
                {isPaused ? (
                  <>
                    <IconPlayerPlay size={14} className="text-emerald-400" />
                    <span>Paused</span>
                  </>
                ) : (
                  <>
                    <IconPlayerPause size={14} className="text-blue-400" />
                    <span>Auto (5s)</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous Project"
                className="p-2.5 rounded-xl bg-slate-900/90 hover:bg-blue-950/80 border border-slate-800 hover:border-blue-500/40 text-slate-300 hover:text-white transition cursor-pointer"
              >
                <IconArrowLeft size={18} />
              </button>

              <button
                type="button"
                onClick={handleNext}
                aria-label="Next Project"
                className="p-2.5 rounded-xl bg-slate-900/90 hover:bg-blue-950/80 border border-slate-800 hover:border-blue-500/40 text-slate-300 hover:text-white transition cursor-pointer"
              >
                <IconArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Project;
