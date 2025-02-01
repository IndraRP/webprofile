import { data } from "./data";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Project = () => {
  return (
    <div>
      <section id="project-section" className="text-white mt-20">
        <div className="container py-10">
          <h1 className="text-2xl font-bold text-center capitalize lg:text-3xl">
            Project
          </h1>
          <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-12 lg:gap-4 lg:grid-cols-3">
            {data.map((data, index) => (
              <ProjectCard key={index} data={data} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

const ProjectCard = ({ data }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex items-end bg-gray-200 overflow-hidden bg-cover rounded-lg h-72"
      style={{ backgroundImage: `url('${data.background}')` }}
    >
      <div className="w-full px-2 text-center py-4 overflow-hidden rounded-b-lg backdrop-blur-lg bg-white/60">
        <a href={data.url}>
          <h2 className="mt-1 mb-1 text-md font-semibold text-gray-800 capitalize">
            {data.title}
          </h2>
        </a>
        <div className="flex justify-center space-x-4 mb-2">
          <img src={data.icon1} alt="Icon 1" className="w-6 h-6" />
          <img src={data.icon2} alt="Icon 2" className="w-6 h-6" />
          <img src={data.icon3} alt="Icon 3" className="w-6 h-6" />
        </div>
      </div>
    </motion.div>
  );
};

export default Project;
