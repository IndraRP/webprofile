import "./App.css";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import BootScreen from "./components/bootscreen";
import { AnimatedTestimonialsDemo } from "./components/animated-testimonials";
import { FloatingDockDemo } from "./components/3d-Comp";
import Skills from "./components/skills";
import Achievment from "./components/achievment";
import { Certif } from "./components/certif";
import Project from "./components/project";
import Footer from "./components/footer";
import { TextHoverEffectDemo } from "./components/text";
import { GlobeDemo } from "./components/globe";
import RocketScrollTop from "./components/RocketScrollTop";
import InteractiveCursor from "./components/InteractiveCursor";
import ChatBox from "./components/Chatbox";
import Flow from "./components/flow";
import { OurServices } from "./components/services";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1800); // ⏱️ boot duration

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <BootScreen isVisible={loading} />

      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <InteractiveCursor />

          <FloatingDockDemo />
          <AnimatedTestimonialsDemo />
          <TextHoverEffectDemo />
          <OurServices />
          <Skills />
          <Project />
          <Achievment />
          <Certif />
          <Flow />
          <GlobeDemo />
          <Footer />
          <RocketScrollTop />
          <ChatBox />
        </motion.div>
      )}
    </>
  );
}

export default App;
