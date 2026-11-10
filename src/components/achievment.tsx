import { motion } from "framer-motion";
import {
  IconTrophy,
  IconExternalLink,
  IconSparkles,
  IconBriefcase,
  IconAward,
} from "@tabler/icons-react";
import Foto1 from "./image/hangtuah.webp";
import Foto2 from "./image/machung.webp";
import Foto3 from "./image/storybook.webp";
import Foto4 from "./image/uwp.webp";
import Foto5 from "./image/wahana1.webp";
import Foto6 from "./image/foto4.webp";

interface AchievementItem {
  title: string;
  organization: string;
  badge: string;
  type: "award" | "work";
  image: string;
  url: string;
}

const ACHIEVEMENTS: AchievementItem[] = [
  {
    title: "Juara 3 Business Plan Competition 2.0",
    organization: "Universitas Hang Tuah",
    badge: "3rd Place Winner",
    type: "award",
    image: Foto1,
    url: "https://drive.google.com/file/d/1zk_cScsFbUZRm0FrY7pAPORKaQvKY-_i/view?usp=sharing",
  },
  {
    title: "Juara 3 Entrepreneur Fair 2024",
    organization: "Universitas Ma Chung",
    badge: "3rd Place Winner",
    type: "award",
    image: Foto2,
    url: "https://drive.google.com/file/d/1Yyn07s-7JeOiC3JHZrX0zjbH9BTqdU_f/view?usp=sharing",
  },
  {
    title: "Bootcamp Front End Developer React & Storybook",
    organization: "Lanius Machine Vision",
    badge: "Intensive Bootcamp",
    type: "award",
    image: Foto3,
    url: "https://drive.google.com/file/d/1514MjxFCYS31RQg0csYH-SyCjL3NO131/view?usp=sharing",
  },
  {
    title: "Finalis Business Plan Competition UWP 2024",
    organization: "Universitas Wijaya Putra",
    badge: "National Finalist",
    type: "award",
    image: Foto4,
    url: "https://drive.google.com/file/d/1Gd41rus3YFSlTif4KJiTg6ay3tSxPGxA/view?usp=sharing",
  },
  {
    title: "Software Engineering Internship",
    organization: "Burningroom Technology",
    badge: "Industry Internship",
    type: "work",
    image: Foto6,
    url: "https://burningroom.co.id/",
  },
  {
    title: "Contract Fullstack Web Developer",
    organization: "PT Wahana Artha",
    badge: "Professional Contract",
    type: "work",
    image: Foto5,
    url: "https://www.wahanaartha.com/wahanaartha/",
  },
];

const achievment = () => {
  return (
    <section
      id="achievment-section"
      className="relative py-24 px-4 sm:px-6 overflow-hidden"
    >
      {/* Ambient Blue Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[680px] h-[340px] bg-blue-600/15 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[260px] bg-cyan-500/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/70 border border-blue-500/35 text-cyan-300 text-xs font-semibold tracking-[0.2em] uppercase mb-3.5 shadow-[0_0_20px_rgba(59,130,246,0.3)]"
          >
            <IconSparkles size={14} className="text-cyan-400" />
            <span>MILESTONES &amp; TRACK RECORD</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: -15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight capitalize"
            style={{
              textShadow:
                "0 0 18px rgba(59, 130, 246, 0.75), 0 0 36px rgba(34, 211, 238, 0.35)",
            }}
          >
            Experience &amp; Achievements
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed"
            style={{
              textShadow: "0 0 12px rgba(59, 130, 246, 0.45)",
            }}
          >
            Several professional experiences, competition awards, and intensive
            bootcamps in software engineering and business planning.
          </motion.p>
        </div>

        {/* Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 xl:gap-10">
          {ACHIEVEMENTS.map((item, idx) => (
            <motion.a
              key={idx}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="group relative h-80 sm:h-96 rounded-2xl overflow-hidden border border-blue-500/30 hover:border-cyan-400/75 bg-[#070d1f] shadow-[0_10px_35px_-5px_rgba(30,58,138,0.45)] hover:shadow-[0_0_40px_rgba(59,130,246,0.55)] transition-all duration-500 cursor-pointer block"
            >
              {/* Top Neon Highlight Line */}
              <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-50 group-hover:opacity-100 transition-opacity z-30" />

              {/* Background Image with Zoom on Hover */}
              <div
                className="absolute inset-0 bg-cover bg-center transform group-hover:scale-110 transition-transform duration-700 ease-out"
                style={{ backgroundImage: `url(${item.image})` }}
              />

              {/* Multi-layer Blue/Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#040c24]/65 to-blue-950/20 group-hover:via-[#06153d]/80 transition-colors duration-500" />

              {/* Ambient Corner Blue Glow on Hover */}
              <div className="absolute -bottom-10 -left-10 w-52 h-52 bg-blue-500/25 group-hover:bg-cyan-400/35 blur-3xl rounded-full pointer-events-none transition-all duration-500" />

              {/* Top Row: Category Badge & External Icon */}
              <div className="absolute top-4 inset-x-4 flex items-center justify-between z-20">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-950/85 backdrop-blur-md text-cyan-300 border border-cyan-400/40 shadow-[0_0_15px_rgba(59,130,246,0.45)]">
                  {item.type === "work" ? (
                    <IconBriefcase size={13} className="text-cyan-400" />
                  ) : (
                    <IconTrophy size={13} className="text-amber-400" />
                  )}
                  <span>{item.badge}</span>
                </span>

                <span className="w-9 h-9 rounded-xl bg-slate-950/80 backdrop-blur-md border border-blue-500/30 group-hover:border-cyan-400/70 flex items-center justify-center text-blue-300 group-hover:text-cyan-300 shadow-[0_0_15px_rgba(59,130,246,0.35)] transition-all">
                  <IconExternalLink
                    size={16}
                    className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                  />
                </span>
              </div>

              {/* Bottom Content Area */}
              <div className="absolute bottom-0 inset-x-0 p-6 sm:p-7 z-20 flex flex-col justify-end">
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 mb-1.5">
                  <IconAward size={15} className="text-cyan-400 shrink-0" />
                  <span
                    style={{
                      textShadow: "0 0 12px rgba(34, 211, 238, 0.7)",
                    }}
                  >
                    {item.organization}
                  </span>
                </div>

                <h2
                  className="text-xl sm:text-2xl font-bold text-white group-hover:text-cyan-200 transition-colors leading-snug"
                  style={{
                    textShadow:
                      "0 0 16px rgba(59, 130, 246, 0.8), 0 2px 10px rgba(0, 0, 0, 0.9)",
                  }}
                >
                  {item.title}
                </h2>

                <div className="mt-4 pt-3 border-t border-blue-500/25 flex items-center justify-between text-xs font-medium text-blue-300 group-hover:text-cyan-300 transition-colors">
                  <span>View Credential &amp; Details</span>
                  <span className="transform group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default achievment;
