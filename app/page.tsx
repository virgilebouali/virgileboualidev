import Hero from "./Hero";
import Navbar from "./Navbar";
import Exemples from "./exemples";
import TechMarquee from "./infinitelogo";
import Services from "./Services";
import CalltoAction from "./CalltoAction";
import Testimonials from "./testity";
import FAQ from "./faq";
import Parrainage from "./Parrainage";
import Projects from "./Projects";
import Stack from "./Stack";

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
    </main>
  );
}