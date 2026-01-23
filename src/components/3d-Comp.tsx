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
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const links = [
    {
      title: "Home",
      icon: <IconHome size={22} />,
      href: "#home-section",
    },
    {
      title: "Skills",
      icon: <IconDeviceIpadHorizontalCog size={22} />,
      href: "#services",
    },
    {
      title: "Project",
      icon: <IconBriefcase size={22} />,
      href: "#project-section",
    },
    {
      title: "Achievement",
      icon: <IconCertificate size={22} />,
      href: "#achievment-section",
    },
    {
      title: "Flow",
      icon: <IconTimeline size={22} />,
      href: "#flow-section",
    },
    {
      title: "LinkedIn",
      icon: <IconBrandLinkedin size={22} />,
      href: "https://www.linkedin.com/in/indra-ridho-rizkian-pratama-298800341/",
      external: true,
    },
  ];

  const handleNavigate = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
    external?: boolean,
  ) => {
    if (external || !href.startsWith("#")) return;

    e.preventDefault();

    const target = document.querySelector(href);
    if (!target) return;

    const yOffset = -120; // offset karena floating dock
    const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;

    window.scrollTo({
      top: y,
      behavior: "smooth",
    });
  };

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="
          flex items-center gap-3
          bg-[#0f172a]/80 backdrop-blur-md
          px-4 py-3
          rounded-full
          border border-slate-700
          shadow-lg shadow-cyan-900/30
        "
      >
        {links.map((link, i) => (
          <motion.a
            key={i}
            href={link.href}
            target={link.external ? "_blank" : "_self"}
            rel="noopener noreferrer"
            onClick={(e) => handleNavigate(e, link.href, link.external)}
            onMouseEnter={() => setActiveIndex(i)}
            onMouseLeave={() => setActiveIndex(null)}
            whileHover={{ y: -5, scale: 1.15 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="relative flex flex-col items-center justify-center"
          >
            {/* Glow */}
            {activeIndex === i && (
              <motion.span
                layoutId="dock-glow"
                className="absolute inset-0 rounded-full bg-cyan-500/20 blur-md"
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              />
            )}

            {/* Icon */}
            <div
              className={`
                relative z-10
                flex items-center justify-center
                w-10 h-10 rounded-full
                transition-colors duration-300
                ${
                  activeIndex === i
                    ? "bg-cyan-600/30 text-white"
                    : "bg-slate-800/60 text-gray-300"
                }
              `}
            >
              {link.icon}
            </div>

            {/* Label */}
            <motion.span
              initial={{ opacity: 0, y: 8 }}
              animate={{
                opacity: activeIndex === i ? 1 : 0,
                y: activeIndex === i ? 0 : 8,
              }}
              transition={{ duration: 0.2 }}
              className="
                absolute top-11
                text-xs font-medium
                text-cyan-400
                whitespace-nowrap
              "
            >
              {link.title}
            </motion.span>
          </motion.a>
        ))}
      </motion.div>
    </div>
  );
}
