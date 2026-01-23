import { useState } from "react";
import { motion } from "framer-motion";
import { services } from "./data";

export function OurServices() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="services" className="relative pt-20 pb-40">
      {/* Header */}
      <div className="mb-16 text-center px-4">
        <h2 className="text-3xl font-bold text-white">Our Services</h2>
        <p className="mt-3 text-gray-400 max-w-xl mx-auto">
          Professional services to build, scale, and polish your product.
        </p>
      </div>

      {/* Grid */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((item, i) => {
            const isActive = active === i;
            const Icon = item.icon;

            return (
              <motion.div
                key={i}
                onHoverStart={() => setActive(i)}
                onHoverEnd={() => setActive(null)}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 220, damping: 18 }}
                className="cursor-pointer"
              >
                <div
                  className={`
                    h-full rounded-2xl border p-6
                    transition-all
                    ${
                      isActive
                        ? "border-cyan-500/50 bg-gradient-to-b from-slate-900 to-slate-950 shadow-lg shadow-cyan-500/20"
                        : "border-slate-700 bg-slate-900"
                    }
                  `}
                >
                  {/* Icon */}
                  <div
                    className={`
                      w-12 h-12 rounded-xl
                      flex items-center justify-center mb-4
                      transition-colors
                      ${
                        isActive
                          ? "bg-cyan-500/20 text-cyan-400"
                          : "bg-slate-800 text-slate-400"
                      }
                    `}
                  >
                    <Icon size={24} />
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-semibold text-white">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-2 text-sm text-gray-400 leading-relaxed">
                    {item.desc}
                  </p>

                  {/* Tags */}
                  <motion.div
                    initial={false}
                    animate={{
                      opacity: isActive ? 1 : 0,
                      y: isActive ? 0 : 8,
                    }}
                    transition={{ duration: 0.25 }}
                    className="mt-4 flex flex-wrap gap-2"
                  >
                    {item.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-2 py-1 rounded-full bg-cyan-500/10 text-cyan-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
