import { useState } from "react";
import { motion } from "framer-motion";
import {
  IconBrandLinkedin,
  IconTimeline,
  IconBriefcase,
  IconHome,
  IconCertificate,
  IconDeviceIpadHorizontalCog,
} from "@tabler/icons-react";

export function FloatingDockDemo() {
  const [activeIndex, setActiveIndex] = useState(null);

  const links = [
    {
      title: "Home",
      icon: <IconHome size={24} />,
      href: "#home-section",
    },
    {
      title: "Skills",
      icon: <IconDeviceIpadHorizontalCog size={24} />,
      href: "#skills-section",
    },
    {
      title: "Achievement",
      icon: <IconCertificate size={24} />,
      href: "#achievment-section",
    },
    {
      title: "Project",
      icon: <IconBriefcase size={24} />,
      href: "#project-section",
    },
    {
      title: "Flow",
      icon: <IconTimeline size={24} />,
      href: "#flow-section",
    },
    {
      title: "LinkedIn",
      icon: <IconBrandLinkedin size={24} />,
      href: "https://www.linkedin.com/in/indra-ridho-rizkian-pratama-298800341/",
    },
  ];

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
      <motion.div
        className="flex items-center gap-3 bg-[#0f172a]/80 backdrop-blur-md px-4 py-3 rounded-full border border-slate-700 shadow-lg shadow-cyan-900/30"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {links.map((link, i) => (
          <motion.a
            key={i}
            href={link.href}
            target={link.href.startsWith("http") ? "_blank" : "_self"}
            rel="noopener noreferrer"
            onMouseEnter={() => setActiveIndex(i)}
            onMouseLeave={() => setActiveIndex(null)}
            whileHover={{ scale: 1.2, y: -4 }}
            className="relative flex flex-col items-center justify-center"
          >
            {/* Glow background */}
            {activeIndex === i && (
              <motion.span
                layoutId="glow"
                className="absolute inset-0 rounded-full bg-cyan-500/20 blur-md"
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              />
            )}

            {/* Icon */}
            <motion.div
              className={`relative z-10 flex items-center justify-center w-10 h-10 rounded-full text-gray-300 hover:text-white transition-colors duration-300 ${
                activeIndex === i ? "bg-cyan-600/30" : "bg-slate-800/60"
              }`}
            >
              {link.icon}
            </motion.div>

            {/* Label (appear on hover) */}
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{
                opacity: activeIndex === i ? 1 : 0,
                y: activeIndex === i ? 0 : 10,
              }}
              transition={{ duration: 0.2 }}
              className="absolute top-11 text-xs font-medium text-cyan-400 whitespace-nowrap"
            >
              {link.title}
            </motion.span>
          </motion.a>
        ))}
      </motion.div>
    </div>
  );
}
