import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconRocket } from "@tabler/icons-react";

const RocketScrollTop: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [launch, setLaunch] = useState(false);
  const [shake, setShake] = useState(false);

  // Tampilkan tombol saat user scroll ke bawah
  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fungsi animasi roket terbang ke atas
  const scrollToTop = () => {
    setLaunch(true);
    setShake(true); // mulai efek getar halus
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 600);

    // hentikan efek setelah animasi selesai
    setTimeout(() => {
      setLaunch(false);
      setShake(false);
    }, 2000);
  };

  return (
    <motion.div
      animate={
        shake
          ? {
              x: [-3, 3, -2, 2, -1, 1, 0],
              y: [0, -1, 1, -1, 1, 0],
            }
          : {}
      }
      transition={{
        duration: 0.6,
        repeat: shake ? Infinity : 0,
        ease: "easeInOut",
      }}
      className="fixed bottom-6 right-12 z-50"
    >
      <AnimatePresence>
        {visible && (
          <motion.button
            key="rocket"
            onClick={scrollToTop}
            className="relative bg-gradient-to-br from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white rounded-full p-4 shadow-lg shadow-cyan-900/40 border border-cyan-700/50"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              animate={
                launch
                  ? {
                      y: [0, -10, -800], // Terbang ke atas
                      opacity: [1, 1, 0],
                      rotate: [0, -2, 2, 0],
                    }
                  : { y: [0, -2, 0] } // Idle animation halus
              }
              transition={{
                duration: launch ? 2 : 2.5,
                ease: "easeInOut",
                repeat: launch ? 0 : Infinity,
              }}
            >
              <IconRocket
                size={28}
                className="text-white"
                style={{ transform: "rotate(-45deg)" }} // putar agar roket menghadap ke atas
              />
            </motion.div>
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default RocketScrollTop;
