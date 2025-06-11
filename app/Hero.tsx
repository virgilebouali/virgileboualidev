"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import Navbar from "./Navbar";

const adjectives = ["efficaces", "impactants", "modernes", "créatifs"];

export default function Hero() {
  const container = useRef(null);
  const title = useRef(null);
  const heroBg = useRef(null);
  const currentRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        container.current,
        { opacity: 0 },
        { opacity: 1, duration: 1, ease: "power2.out" }
      );
    }, container);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        title.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
      );
    }, title);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        heroBg.current,
        { opacity: 0 },
        { 
          opacity: 1, 
          duration: 2, 
          ease: "power2.out",
          delay: 0.5
        }
      );

      // Animation de mouvement subtil
      gsap.to(heroBg.current, {
        duration: 15,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }, heroBg);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    let wordIndex = 0;
    let letterIndex = 0;
    let isDeleting = false;
    let timeout: ReturnType<typeof setTimeout>;

    const animate = () => {
      const word = adjectives[wordIndex];
      const current = currentRef.current;
      if (current) {
        if (!isDeleting) {
          // Ajoute une lettre
          current.textContent = word.slice(0, letterIndex + 1);
          if (letterIndex < word.length - 1) {
            letterIndex++;
            timeout = setTimeout(animate, 60);
          } else {
            // Pause avant de supprimer
            isDeleting = true;
            timeout = setTimeout(animate, 1200);
          }
        } else {
          // Supprime une lettre
          current.textContent = word.slice(0, letterIndex);
          if (letterIndex > 0) {
            letterIndex--;
            timeout = setTimeout(animate, 40);
          } else {
            // Passe au mot suivant
            isDeleting = false;
            wordIndex = (wordIndex + 1) % adjectives.length;
            timeout = setTimeout(animate, 300);
          }
        }
      }
    };

    animate();

    return () => clearTimeout(timeout);
  }, []);

  return (
    <section
      ref={container}
      className="min-h-screen relative z-50 flex flex-col justify-center items-center text-center px-4 text-white bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#0f1117] via-[#12182a] to-[#2663f5] overflow-hidden"
    >
        <Navbar />
        
        <img 
          ref={heroBg}
          src="/herobg.png" 
          alt="herobg" 
          className="absolute top-0 left-0 w-full h-full object-cover" 
        />
         <span
                className="absolute inset-0 w-[70%] h-[70%] left-1/2 -translate-x-1/2 top-[50%] -translate-y-1/2 xl:hidden block rounded-xl blur-2xl opacity-20 z-0 bg-gradient-to-br from-pink-500 via-orange-400 to-purple-500"
                aria-hidden="true"
              ></span>
      <span className="mb-6 inline-block px-4 py-1 rounded-full text-sm text-white/80 backdrop-blur-sm relative before:absolute before:inset-0 before:p-[1px] before:rounded-full before:bg-gradient-to-r before:from-pink-500 before:via-orange-400 before:to-purple-500 before:-z-10 after:absolute after:inset-[1px] after:rounded-full after:bg-[#110d21] after:-z-10">
        Besoin de créer un site web ?
      </span>

      <h1 className="text-4xl md:text-6xl font-bold xl:leading-[10vh] max-w-4xl z-50" ref={title}>
        Développeur web,<br />
        j&apos;aide les marques à créer<br />
        <span className="bg-gradient-to-r from-pink-500 via-orange-400 to-purple-500 bg-clip-text text-transparent font-[var(--font-inter)] font-light">
          des sites <span ref={currentRef} className="inline-block"></span>
        </span>
      </h1>

      <p className="mt-6 text-base md:text-lg max-w-xl text-white/70 z-50">
  Développeur web actuellement en freelance,<br />
  j&apos;aime travailler sur des projets créatifs et innovants, en concevant des sites web qui répondent à vos besoins.
</p>

      <a
        href="https://calendly.com/virgile-bouali/discutons"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-10 inline-block rounded-full px-6 py-3 bg-white text-black font-medium transition-all duration-300 backdrop-blur relative before:absolute before:inset-0 before:p-[1px] before:rounded-full before:bg-gradient-to-r before:from-pink-500 before:via-orange-400 before:to-purple-500 before:-z-10 before:transition-all before:duration-300 hover:before:p-[3px] hover:before:blur-[2px] after:absolute after:inset-[1px] after:rounded-full after:bg-white after:-z-10 after:transition-all after:duration-300 hover:after:inset-[3px]"
      >
        Travaillons ensemble
      </a>
      
    </section>
  );
}
