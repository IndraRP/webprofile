import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { data as projects } from "./data";

const Project = () => {
  // Menyimpan index project yang sedang dibuka
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleProject = (index: number) => {
    setOpenIndex(openIndex === index ? null : index); // Tutup jika sama
  };

  return (
    <section
      id="project-section"
      className="text-gray-100 min-h-screen px-6 pt-40 pb-20"
    >
      <div className="container mx-auto">
        <h1 className="font-bold text-3xl mb-8 text-center text-white">
          💻 My Projects
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {projects.map((item, index) => (
            <ProjectDropdown
              key={index}
              item={item}
              isOpen={openIndex === index}
              onToggle={() => toggleProject(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

interface ProjectItem {
  title: string;
  url: string;
  [key: string]: string;
}

interface ProjectDropdownProps {
  item: ProjectItem;
  isOpen: boolean;
  onToggle: () => void;
}

const ProjectDropdown = ({ item, isOpen, onToggle }: ProjectDropdownProps) => {
  const frameworks = Object.keys(item)
    .filter((key) => key.toLowerCase().startsWith("framework"))
    .map((key) => item[key]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      viewport={{ once: true }}
      className="border border-gray-700 rounded-lg overflow-hidden bg-[#161b22] shadow-lg hover:shadow-cyan-900/40 transition-all"
    >
      <button
        onClick={onToggle}
        className={`w-full flex justify-between items-center px-4 py-4 text-left transition-colors ${
          isOpen ? "bg-[#1c2128]" : "hover:bg-[#21262d]"
        }`}
      >
        <span className="font-semibold text-gray-100 text-lg">
          {item.title}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-gray-400 text-lg"
        >
          ▼
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="px-5 py-4 border-t border-gray-700 bg-[#1c2128]"
          >
            <ul className="space-y-2 text-sm text-gray-300">
              {frameworks.map((fw, i) => (
                <li key={i}>• {fw}</li>
              ))}
            </ul>

            {item.url && (
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 text-cyan-400 hover:text-cyan-300 hover:underline transition-colors"
              >
                🔗 View Project
              </a>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Project;
