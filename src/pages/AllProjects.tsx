import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  IconArrowLeft,
  IconSearch,
  IconX,
  IconSparkles,
  IconCode,
  IconFolderCode,
  IconFilter,
} from "@tabler/icons-react";
import { data as projects } from "../components/data";
import { ProjectCard, getProjectFrameworks } from "../components/project";
import InteractiveCursor from "../components/InteractiveCursor";
import Footer from "../components/footer";

const CATEGORIES = ["All", "Frontend", "Fullstack", "Enterprise", "PWA"] as const;

export const AllProjects: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedTech, setSelectedTech] = useState<string>("All");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    const prevTitle = document.title;
    document.title = "All Projects | Indra Ridho Rizkian Pratama";
    return () => {
      document.title = prevTitle;
    };
  }, []);

  // Kumpulkan semua tech stack unik untuk filter tambahan
  const allTechStacks = useMemo(() => {
    const set = new Set<string>();
    projects.forEach((p) => {
      getProjectFrameworks(p).forEach((fw) => set.add(fw));
    });
    return ["All", ...Array.from(set)];
  }, []);

  // Filter project berdasarkan kategori, tech stack, dan kata kunci pencarian
  const filteredProjects = useMemo(() => {
    return projects.filter((item) => {
      const matchesCategory =
        selectedCategory === "All" || item.category === selectedCategory;

      const frameworks = getProjectFrameworks(item);
      const matchesTech =
        selectedTech === "All" ||
        frameworks.some((fw) => fw.toLowerCase() === selectedTech.toLowerCase());

      if (!searchQuery.trim()) {
        return matchesCategory && matchesTech;
      }

      const q = searchQuery.toLowerCase();
      const matchesSearch =
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        frameworks.some((fw) => fw.toLowerCase().includes(q));

      return matchesCategory && matchesTech && matchesSearch;
    });
  }, [searchQuery, selectedCategory, selectedTech]);

  const handleBackToPortfolio = () => {
    window.location.hash = "";
    if (window.location.pathname.endsWith("/projects")) {
      window.history.pushState({}, "", "/");
      window.dispatchEvent(new PopStateEvent("popstate"));
    }
    setTimeout(() => {
      const section = document.getElementById("project-section");
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 relative overflow-x-hidden">
      <InteractiveCursor />

      {/* Background Decorative Glows */}
      <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="fixed bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-600/10 blur-[150px] rounded-full pointer-events-none" />

      {/* Top Sticky Navbar */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-[#020617]/80 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={handleBackToPortfolio}
            className="group inline-flex items-center gap-2.5 px-4 py-2 rounded-xl bg-slate-900/90 hover:bg-blue-950/70 border border-slate-800 hover:border-blue-500/40 text-slate-200 hover:text-white text-sm font-medium transition-all cursor-pointer"
          >
            <IconArrowLeft
              size={18}
              className="transform group-hover:-translate-x-1 transition-transform text-blue-400"
            />
            <span>Back to Portfolio</span>
          </button>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/50 border border-blue-500/25 text-xs text-blue-300 font-medium">
              <IconFolderCode size={15} className="text-blue-400" />
              <span>{projects.length} Total Projects</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-14 pb-24 relative z-10">
        {/* Hero Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mb-12"
        >
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.22em] text-blue-400 uppercase mb-3">
            <IconSparkles size={14} />
            <span>COMPLETE PORTFOLIO ARCHIVE</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            All Projects &amp; Selected Works
          </h1>
          <p className="mt-4 text-slate-400 text-base sm:text-lg leading-relaxed">
            Explore my complete collection of frontend interfaces, fullstack web
            applications, Progressive Web Apps (PWA), and enterprise systems.
          </p>
        </motion.div>

        {/* Filter & Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="p-5 rounded-2xl bg-[#0b1120]/90 border border-slate-800/90 shadow-xl mb-10 space-y-5"
        >
          <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
            {/* Search Box */}
            <div className="relative flex-1 max-w-xl">
              <IconSearch
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search project name, description, or technology..."
                className="w-full pl-11 pr-10 py-3 rounded-xl bg-slate-950/90 border border-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-sm text-white placeholder-slate-500 focus:outline-none transition"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white cursor-pointer"
                >
                  <IconX size={16} />
                </button>
              )}
            </div>

            {/* Category Tabs */}
            <div className="flex items-center gap-2 flex-wrap">
              {CATEGORIES.map((cat) => {
                const active = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                      active
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30 border border-blue-400"
                        : "bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tech Stack Pills Filter */}
          <div className="pt-4 border-t border-slate-800/70 flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 text-xs text-slate-400 mr-2 font-medium">
              <IconFilter size={14} className="text-blue-400" />
              Tech Stack:
            </span>
            {allTechStacks.map((tech) => {
              const active = selectedTech === tech;
              return (
                <button
                  key={tech}
                  type="button"
                  onClick={() => setSelectedTech(tech)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition cursor-pointer ${
                    active
                      ? "bg-blue-500/25 text-blue-200 border border-blue-400/60"
                      : "bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-slate-800"
                  }`}
                >
                  {tech}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Results Counter */}
        <div className="flex items-center justify-between mb-6 text-xs sm:text-sm text-slate-400">
          <span>
            Showing{" "}
            <strong className="text-white">{filteredProjects.length}</strong> of{" "}
            {projects.length} projects
          </span>
          {(selectedCategory !== "All" ||
            selectedTech !== "All" ||
            searchQuery.trim() !== "") && (
            <button
              type="button"
              onClick={() => {
                setSelectedCategory("All");
                setSelectedTech("All");
                setSearchQuery("");
              }}
              className="text-blue-400 hover:text-cyan-300 underline cursor-pointer"
            >
              Reset all filters
            </button>
          )}
        </div>

        {/* Projects Grid */}
        <AnimatePresence mode="popLayout">
          {filteredProjects.length > 0 ? (
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7"
            >
              {filteredProjects.map((item, idx) => (
                <motion.div
                  layout
                  key={item.title}
                  initial={{ opacity: 0, y: 24, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.35, delay: idx * 0.04 }}
                  className="h-full"
                >
                  <ProjectCard item={item} index={idx} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-20 text-center rounded-2xl bg-[#0b1120]/60 border border-slate-800/80"
            >
              <IconCode size={44} className="mx-auto text-slate-600 mb-3" />
              <h3 className="text-lg font-semibold text-white">
                No matching projects found
              </h3>
              <p className="text-sm text-slate-400 mt-1 max-w-md mx-auto">
                We couldn&apos;t find any project matching your current filter or
                search query.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory("All");
                  setSelectedTech("All");
                  setSearchQuery("");
                }}
                className="mt-5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition cursor-pointer"
              >
                Reset Filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
};

export default AllProjects;
