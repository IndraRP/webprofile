import { flow } from "./data";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const CareerFlow = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <section id="flow-section" className="relative py-40 bg-[#020617]">
      <div className="max-w-5xl mx-auto px-4">
        {/* Header */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-center text-white"
        >
          Career Journey
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-3 mb-16 text-center text-gray-400 max-w-2xl mx-auto"
        >
          A timeline of my growth as a web developer and analyst.
        </motion.p>

        {/* Timeline */}
        <div
          ref={ref}
          className="relative border-l border-gray-700 pl-8 space-y-14"
        >
          {flow.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="relative"
            >
              {/* Dot */}
              <span className="absolute -left-[14px] top-2 w-3 h-3 rounded-full bg-cyan-500 shadow-md shadow-cyan-500/50"></span>

              {/* Card */}
              <div className="bg-[#0f172a] rounded-2xl p-6 shadow-lg hover:shadow-cyan-500/20 transition">
                <span className="text-xs text-cyan-400 tracking-wide">
                  {item.year}
                </span>

                <h3 className="text-lg font-semibold text-white mt-1">
                  {item.title}
                </h3>

                <div className="flex flex-wrap gap-2 mt-3">
                  {[
                    item.Framework1,
                    item.Framework2,
                    item.Framework3,
                    item.Framework4,
                  ].map((fw, i) => (
                    <span
                      key={i}
                      className="text-xs px-3 py-1 rounded-full bg-[#020617] text-gray-300 border border-gray-700"
                    >
                      {fw}
                    </span>
                  ))}
                </div>

                <p className="text-gray-400 text-sm mt-4 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CareerFlow;
