import Hero from "./Hero";
import TechMarquee from "./infinitelogo";
import Services from "./Services";
import CalltoAction from "./CalltoAction";
import Testimonials from "./testity";
import Parrainage from "./Parrainage";
import Projects from "./Projects";
import Stack from "./Stack";
import ScrollDown from "./components/ScrollDown";

export default function Home() {
  return (
    <main className="w-full h-full overflow-hidden">
      <Hero />
      <TechMarquee />
      <Projects />
      <Stack />
      <Services />
      <CalltoAction />
      <Testimonials />
      <Parrainage />
      <ScrollDown />
    </main>
  );
}