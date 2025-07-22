import { teamMembers } from "./data";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Skills = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section id="skills-section" className="relative pb-10 pt-16">
      {/* Section Content */}
      <div className="container mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-2xl font-bold text-center capitalize lg:text-3xl text-gray-100"
        >
          Skill
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-2xl font-semibold mx-auto my-4 text-center text-gray-100"
        >
          These are some of my programming skills. Apart from that, I also
          master the fields of Business/Economics and Project Manager.
        </motion.p>

        <motion.div
          ref={ref}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8 xl:gap-10 mt-8 xl:mt-12"
        >
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-slate-800 flex flex-col items-center p-4 sm:p-5 rounded-lg shadow-md hover:bg-gray-600 transition-colors duration-300 transform cursor-pointer group"
            >
              <img
                className="object-cover w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 xl:w-28 xl:h-28"
                src={member.image}
                alt={member.name}
              />
              <h1 className="mt-2 text-sm font-semibold text-gray-300 capitalize group-hover:text-white">
                {member.name}
              </h1>
              <a
                href={member.url}
                className="mt-1 text-center text-xs text-gray-300 capitalize hover:underline group-hover:text-gray-300"
              >
                {member.desc}
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
