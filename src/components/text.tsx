import { TextHoverEffect } from "./ui/text-hover-effect";
import { motion } from "framer-motion";

export function TextHoverEffectDemo() {
  return (
    <motion.div
      className="lg:h-[40rem] h-[5rem] flex items-center justify-center"
      initial={{ opacity: 0.8, scale: 1 }}
      whileHover={{ opacity: 1, scale: 1.1 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      {" "}
      <TextHoverEffect text="INDRA" />
    </motion.div>
  );
}
