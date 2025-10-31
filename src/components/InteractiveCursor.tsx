import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const InteractiveCursor: React.FC = () => {
  const [hovering, setHovering] = useState(false);

  // posisi mouse
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // animasi gerakan halus (spring)
  const springX = useSpring(cursorX, { stiffness: 200, damping: 20 });
  const springY = useSpring(cursorY, { stiffness: 200, damping: 20 });

  // gerakkan cursor mengikuti mouse
  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 15);
      cursorY.set(e.clientY - 15);
    };
    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, [cursorX, cursorY]);

  // deteksi hover elemen interaktif
  useEffect(() => {
    const interactiveElements = document.querySelectorAll(
      "button, a, .hoverable, input, textarea, img"
    );

    const handleMouseEnter = () => setHovering(true);
    const handleMouseLeave = () => setHovering(false);

    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []);

  return (
    <>
      {/* Custom Cursor */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none"
        style={{
          x: springX,
          y: springY,
        }}
      >
        <motion.div
          animate={
            hovering
              ? {
                  scale: 2.2,
                  backgroundColor: "rgba(0, 255, 255, 0.35)", // lebih terang
                  border: "2px solid rgba(0, 255, 255, 0.8)",
                  boxShadow:
                    "0 0 15px rgba(0, 255, 255, 0.7), 0 0 30px rgba(0, 255, 255, 0.4)",
                }
              : {
                  scale: 1,
                  backgroundColor: "rgba(255,255,255,0.25)",
                  border: "1px solid rgba(255,255,255,0.6)",
                  boxShadow:
                    "0 0 10px rgba(255,255,255,0.3), 0 0 20px rgba(255,255,255,0.1)",
                }
          }
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="w-6 h-6 rounded-full backdrop-blur-md mix-blend-difference"
        />
      </motion.div>

      {/* Efek lingkaran luar halus */}
      <motion.div
        animate={
          hovering
            ? {
                scale: [1, 1.3, 1],
                opacity: [0.8, 0.5, 0.8],
              }
            : {
                scale: 1,
                opacity: 0.4,
              }
        }
        transition={{
          duration: 1.2,
          repeat: hovering ? Infinity : 0,
          ease: "easeInOut",
        }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 9998,
          pointerEvents: "none",
          x: springX,
          y: springY,
        }}
        className="w-10 h-10 rounded-full border border-cyan-300/60"
      />
    </>
  );
};

export default InteractiveCursor;
