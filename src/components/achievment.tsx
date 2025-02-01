import { motion } from "framer-motion";
import Foto1 from "./image/hangtuah.jpg";
import Foto2 from "./image/machung.jpg";
import Foto3 from "./image/storybook.jpg";
import Foto4 from "./image/uwp.jpg";

const achievment = () => {
  return (
    <div>
      {/* PORTOFOLIO */}
      <section id="achievment-section" className="relative pb-10 pt-16">
        <div className="container py-10">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-2xl font-bold text-center text-gray-100 capitalize lg:text-3xl"
          >
            Achievement
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-4 text-center text-gray-100"
          >
            Several achievements and certifications in the field of programming
            and business planning
          </motion.p>

          <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-12 xl:gap-12 md:grid-cols-2 xl:grid-cols-2">
            {/* Achievement 1 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="overflow-hidden bg-cover rounded-lg cursor-pointer h-96 group"
              style={{
                backgroundImage: `url(${Foto1})`,
              }}
            >
              <div className="flex flex-col justify-center w-full h-full px-8 py-4 transition-opacity duration-700 opacity-0 backdrop-blur-sm bg-gray-800/60 group-hover:opacity-100">
                <h2 className="mt-4 text-xl font-semibold text-white capitalize">
                  Juara 3 BusinessPlan Competition 2.0
                </h2>
                <a
                  href="https://drive.google.com/file/d/1zk_cScsFbUZRm0FrY7pAPORKaQvKY-_i/view?usp=sharing"
                  className="text-blue-400 hover:underline"
                >
                  Universitas Hang Tuah
                </a>
              </div>
            </motion.div>

            {/* Achievement 2 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="overflow-hidden bg-cover rounded-lg cursor-pointer h-96 group"
              style={{
                backgroundImage: `url(${Foto2})`,
              }}
            >
              <div className="flex flex-col justify-center w-full h-full px-8 py-4 transition-opacity duration-700 opacity-0 backdrop-blur-sm bg-gray-800/60 group-hover:opacity-100">
                <h2 className="mt-4 text-xl font-semibold text-white capitalize">
                  Juara 3 Entrepreneur Fair 2024
                </h2>
                <a
                  href="https://drive.google.com/file/d/1Yyn07s-7JeOiC3JHZrX0zjbH9BTqdU_f/view?usp=sharing"
                  className="text-blue-400 hover:underline"
                >
                  Universitas Ma Chung
                </a>
              </div>
            </motion.div>

            {/* Achievement 3 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="overflow-hidden bg-cover rounded-lg cursor-pointer h-96 group"
              style={{
                backgroundImage: `url(${Foto3})`,
              }}
            >
              <div className="flex flex-col justify-center w-full h-full px-8 py-4 transition-opacity duration-700 opacity-0 backdrop-blur-sm bg-gray-800/60 group-hover:opacity-100">
                <h2 className="mt-4 text-xl font-semibold text-white capitalize">
                  Bootcamp Front End Developer React and Story Book
                </h2>
                <a
                  href="https://drive.google.com/file/d/1514MjxFCYS31RQg0csYH-SyCjL3NO131/view?usp=sharing"
                  className="text-blue-400 hover:underline"
                >
                  Lanius Machine Vision
                </a>
              </div>
            </motion.div>

            {/* Achievement 4 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="overflow-hidden bg-cover rounded-lg cursor-pointer h-96 group"
              style={{
                backgroundImage: `url(${Foto4})`,
              }}
            >
              <div className="flex flex-col justify-center w-full h-full px-8 py-4 transition-opacity duration-700 opacity-0 backdrop-blur-sm bg-gray-800/60 group-hover:opacity-100">
                <h2 className="mt-4 text-xl font-semibold text-white capitalize">
                  Finalis Business Plan Competition UWP 2024
                </h2>
                <a
                  href="https://drive.google.com/file/d/1Gd41rus3YFSlTif4KJiTg6ay3tSxPGxA/view?usp=sharing"
                  className="text-blue-400 hover:underline"
                >
                  Universitas Wijaya Putra
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default achievment;
