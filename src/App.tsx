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
import WahanaKantinForm from "./pages/WahanaKantinForm";
import AllProjects from "./pages/AllProjects";

// Helper pengecekan route hidden page /wahanakantin-form
const isWahanaKantinRoute = (): boolean => {
  if (typeof window === "undefined") return false;
  const path = window.location.pathname.toLowerCase().replace(/\/+$/, "");
  const hash = window.location.hash.toLowerCase().replace(/^#\/?/, "");
  return (
    path.endsWith("/wahanakantin-form") ||
    hash === "wahanakantin-form" ||
    hash.startsWith("wahanakantin-form")
  );
};

// Helper pengecekan route halaman View All Projects (/projects atau #/projects)
const isAllProjectsRoute = (): boolean => {
  if (typeof window === "undefined") return false;
  const path = window.location.pathname.toLowerCase().replace(/\/+$/, "");
  const hash = window.location.hash.toLowerCase().replace(/^#\/?/, "");
  return (
    path.endsWith("/projects") ||
    path.endsWith("/all-projects") ||
    hash === "projects" ||
    hash === "all-projects"
  );
};

function App() {
  const [loading, setLoading] = useState(true);
  const [isKantinPage, setIsKantinPage] = useState<boolean>(isWahanaKantinRoute);
  const [isProjectsPage, setIsProjectsPage] = useState<boolean>(isAllProjectsRoute);

  // Listener untuk perubahan URL browser (popstate / hashchange)
  useEffect(() => {
    const handleLocationChange = () => {
      setIsKantinPage(isWahanaKantinRoute());
      setIsProjectsPage(isAllProjectsRoute());
    };

    window.addEventListener("popstate", handleLocationChange);
    window.addEventListener("hashchange", handleLocationChange);

    return () => {
      window.removeEventListener("popstate", handleLocationChange);
      window.removeEventListener("hashchange", handleLocationChange);
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1800); // ⏱️ boot duration

    return () => clearTimeout(timer);
  }, []);

  // Jika sedang membuka route /wahanakantin-form, render halaman form transaksi kantin
  if (isKantinPage) {
    return <WahanaKantinForm />;
  }

  // Jika sedang membuka route View All Projects (#/projects), render halaman daftar semua project
  if (isProjectsPage) {
    return <AllProjects />;
  }

  // Halaman utama portfolio
  return (
    <div>
      <BootScreen isVisible={loading} />

      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <InteractiveCursor />

          <FloatingDockDemo />
          <div>
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
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default App;
