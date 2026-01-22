import "./App.css";
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

function App() {
  return (
    <>
      <InteractiveCursor />
      <div>
        <FloatingDockDemo />
        <AnimatedTestimonialsDemo />
        <TextHoverEffectDemo />
        <Skills />
        <Flow />
        <Achievment />
        <Certif />
        <Project />
        <GlobeDemo />
        <Footer />
        <RocketScrollTop />
        <ChatBox />
      </div>
    </>
  );
}

export default App;
