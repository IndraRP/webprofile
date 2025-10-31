import { teamMembers } from "./data";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Skills = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section id="skills-section" className="relative pb-20 pt-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-center text-white tracking-wide"
        >
          My Skills
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-2xl mx-auto mt-3 mb-10 text-center text-gray-400"
        >
          A blend of languages, frameworks, and tools that power my development
          journey.
        </motion.p>

        {/* Categories */}
        <div ref={ref} className="space-y-16">
          {Object.entries(teamMembers).map(([category, members]) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
              className="group"
            >
              <h2 className="text-2xl font-semibold text-gray-100 border-l-4 border-cyan-500 pl-3 mb-6">
                {category}
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {members.map((member, index) => (
                  <motion.a
                    key={index}
                    href={member.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: index * 0.08 }}
                    className="bg-[#161b22] hover:bg-[#1f2937] transition-all duration-300 rounded-2xl p-5 flex flex-col items-center text-center shadow-lg hover:shadow-cyan-500/20 cursor-pointer"
                  >
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-16 h-16 object-contain mb-3 group-hover:scale-105 transition-transform duration-300"
                    />
                    <h3 className="text-gray-100 font-semibold text-sm md:text-base">
                      {member.name}
                    </h3>
                    <p className="text-gray-400 text-xs mt-1">{member.desc}</p>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
