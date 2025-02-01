import "./App.css";
import { AnimatedTestimonialsDemo } from "./components/animated-testimonials";
import { FloatingDockDemo } from "./components/3d-Comp";
import Skills from "./components/skills";
import Achievment from "./components/achievment";
import { Hero } from "./components/hero";
import Project from "./components/project";
import Footer from "./components/footer";
import { TextHoverEffectDemo } from "./components/text";
import { GlobeDemo } from "./components/globe";

function App() {
  return (
    <div>
      <FloatingDockDemo />
      <AnimatedTestimonialsDemo />
      <TextHoverEffectDemo />
      <Skills />
      <Achievment />
      <Hero />
      <Project />
      <GlobeDemo />
      <Footer />
    </div>
  );
}

export default App;
