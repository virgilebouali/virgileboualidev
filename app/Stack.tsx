'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const technologies = [
  { name: 'React', src: '/react-2.svg' },
  { name: 'Next.js', src: '/next-js.svg' },
  { name: 'Tailwind CSS', src: '/Tailwind_CSS_Logo.svg' },
  { name: 'JavaScript', src: '/icons8-javascript.svg' },
  { name: 'TypeScript', src: '/icons8-typescript.svg' },
  { name: 'Node.js', src: '/nodejs-1.svg' },
  { name: 'Express', src: '/express-109.svg' },
  { name: 'Prisma', src: '/prisma-2.svg' },
  { name: 'PostgreSQL', src: '/postgresql-ar21.svg' },
  { name: 'MongoDB', src: '/mongodb-ar21.svg' },
];

const cms = [
  { name: 'Shopify', src: '/shopify-2.svg' },
  { name: 'WordPress', src: '/wordpress-icon-1.svg' },
];

const tools = [
  { name: 'GitHub', src: '/github-2.svg' },
  { name: 'Vercel', src: '/vercel.svg' },
  { name: 'Notion', src: '/notion-2.svg' },
];

function getRandom(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export default function TechStackSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const gradientBarRef = useRef<HTMLSpanElement>(null);
  const linesRef = useRef<(HTMLSpanElement | null)[]>([]);
  const gradientRef = useRef<HTMLSpanElement>(null);

  // Génère 50 lignes avec des tailles et positions aléatoires
  const lines = Array.from({ length: 50 }).map(() => ({
    left: getRandom(0, 90), // en %
    width: getRandom(10, 80), // px
    opacity: getRandom(0.3, 0.5),
    duration: getRandom(2.5, 5),
    delay: getRandom(0, 3),
  }));

  useEffect(() => {
    const ctx = gsap.context(() => {
      const section = containerRef.current;
      if (!section) return;

      const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
      const logos = section.querySelectorAll('.tech-logo');
      gsap.set(logos, { opacity: 0, y: 60 });

      gsap.to(logos, {
        opacity: 1,
        y: 0,
        stagger: 0.15,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=100%',
          pin: !isMobile,
          scrub: 1,
        }
      });

      // Animation GSAP du dégradé de la bordure top
      if (gradientBarRef.current) {
        gsap.to(gradientBarRef.current, {
          backgroundPosition: '200% 0',
          duration: 3,
          repeat: -1,
          ease: 'linear',
        });
      }

      // Animation GSAP pour chaque ligne pluie
      linesRef.current.forEach((line, i) => {
        if (line) {
          gsap.set(line, { top: '-10%' });
          gsap.to(line, {
            top: '110%',
            duration: lines[i].duration,
            repeat: -1,
            ease: 'linear',
            delay: lines[i].delay,
          });
          gsap.to(line, {
            backgroundPosition: '200% 0',
            duration: 3,
            repeat: -1,
            ease: 'linear',
          });
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Animation indépendante des lignes de pluie
  useEffect(() => {
    const timelines: gsap.core.Tween[] = [];
    linesRef.current.forEach((line, i) => {
      if (line) {
        const start = -10 + Math.random() * 120;
        gsap.set(line, { top: `${start}%` });
        const t1 = gsap.to(line, {
          top: '110%',
          duration: lines[i].duration,
          repeat: -1,
          ease: 'linear',
          delay: lines[i].delay,
        });
        const t2 = gsap.to(line, {
          backgroundPosition: '200% 0',
          duration: 3,
          repeat: -1,
          ease: 'linear',
        });
        timelines.push(t1, t2);
      }
    });
    return () => {
      timelines.forEach(tl => tl.kill());
    };
  }, [lines]);

  return (
    <section className="bg-[#05040b] text-white py-24 px-4 relative overflow-hidden min-h-screen" id="stack">
      {/* Lignes pluie animées en background */}
      <div className="absolute inset-0 w-full h-full z-10 pointer-events-none">
        {lines.map((line, i) => (
          <span
            key={i}
            ref={el => { linesRef.current[i] = el; }}
            className="block absolute h-[2px] rounded-full"
            style={{
              left: `${line.left}%`,
              width: `${line.width}px`,
              opacity: line.opacity,
              rotate: '90deg',
              background: 'linear-gradient(90deg, #ec4899, #fb923c, #a21caf, #ec4899)',
              backgroundSize: '200% 100%',
              backgroundPosition: '0% 0%',
            }}
          />
        ))}
      </div>
      <span
        ref={gradientBarRef}
        className="absolute top-0 left-0 w-full h-[2px] xl:block hidden"
        style={{
          background: 'linear-gradient(90deg, #ec4899, #fb923c, #a21caf, #ec4899)',
          backgroundSize: '200% 100%',
          backgroundPosition: '0% 0%',
          display: 'block',
        }}
      />
      
      <span
        className="absolute -z-10 left-0 top-0 w-full h-full pointer-events-none xl:block hidden"
        style={{
          background: "linear-gradient(to bottom, rgba(5,4,11,0) 0%, rgba(5,4,11,0.8) 100%)"
        }}
      />
      
      <div className="max-w-6xl mx-auto text-center" ref={containerRef}>
      <span ref={gradientRef} className="absolute -z-10 left-1/2 -translate-x-1/2 top-[-5%] -translate-y-1/2 w-[1700px] h-[750px] bg-gradient-to-br from-pink-500 via-orange-400 to-purple-500 blur-2xl opacity-40 rotate-0 slow-pulse"></span>

        <span 
          className=" mb-6 inline-block px-4 py-1 mt-[10vh] rounded-full text-sm text-white/80 backdrop-blur-sm relative before:absolute before:inset-0 before:p-[1px] before:rounded-full before:bg-gradient-to-r before:from-pink-500 before:via-orange-400 before:to-purple-500 before:-z-10 after:absolute after:inset-[1px] after:rounded-full after:bg-[#110d21] after:-z-10"
        >
          Technologies
        </span>
        <h2 className="xl:text-7xl text-4xl xl:font-bold mb-6 font-poppins">
        Mon setup tech ⚡
        </h2>
        <p className="text-white/80 max-w-2xl mx-auto mb-12 font-inter">
          Je construis des applications web performantes et sur-mesure en combinant les meilleurs outils du moment :
          <span className="font-semibold text-white"> React</span>,
          <span className="font-semibold text-white"> Next.js</span>,
          <span className="font-semibold text-white"> Tailwind</span>,
          <span className="font-semibold text-white"> Prisma</span>,
          <span className="font-semibold text-white"> Shopify</span> et
          <span className="font-semibold text-white"> WordPress</span>.
          Je maîtrise à la fois le front-end (UI/UX, animations, responsive…) et le back-end (API, base de données, sécurité), pour livrer des projets modernes et fluides.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 justify-center items-center mb-16">
          {technologies.map((tech, i) => (
            <div key={i} className="tech-logo group relative">
              <div className="relative w-20 h-20 mx-auto mb-3 flex items-center justify-center">
                <span className="absolute inset-0 rounded-full bg-transparent"></span>
                <Image
                  src={tech.src}
                  alt={tech.name}
                  fill
                  className="object-contain filter brightness-0 invert relative z-20 opacity-100 group-hover:opacity-100 transition-opacity"
                />
              </div>
              <p className="text-sm font-inter text-white/80 group-hover:text-white transition-colors">{tech.name}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div>
            <h3 className="text-2xl font-bold mb-8 font-poppins">CMS</h3>
            <div className="grid grid-cols-2 gap-8 justify-center items-center">
              {cms.map((tech, i) => (
                <div key={i} className="tech-logo group relative">
                  <div className="relative w-20 h-20 mx-auto mb-3 flex items-center justify-center">
                    <span className="absolute inset-0 rounded-full "></span>
                    <Image
                      src={tech.src}
                      alt={tech.name}
                      fill
                      className="object-contain filter brightness-0 invert relative z-10 opacity-80 group-hover:opacity-100 transition-opacity"
                    />
                  </div>
                  <p className="text-sm font-inter text-white/80 group-hover:text-white transition-colors">{tech.name}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-8 font-poppins">Outils</h3>
            <div className="grid grid-cols-3 gap-8 justify-center items-center">
              {tools.map((tech, i) => (
                <div key={i} className="tech-logo group relative">
                  <div className="relative w-20 h-20 mx-auto mb-3 flex items-center justify-center">
                    <span className="absolute inset-0 rounded-full"></span>
                    <Image
                      src={tech.src}
                      alt={tech.name}
                      fill
                      className="object-contain filter brightness-0 invert relative z-10 opacity-80 group-hover:opacity-100 transition-opacity"
                    />
                  </div>
                  <p className="text-sm font-inter text-white/80 group-hover:text-white transition-colors">{tech.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
