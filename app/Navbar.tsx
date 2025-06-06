"use client";

import { useState, useRef, useEffect } from "react";
import DownloadCV from "./DownloadCV";
import gsap from "gsap";
export default function Navbar() {
  const [isDarkSection, setIsDarkSection] = useState(false);
  const logoRef = useRef(null);
  const navRef = useRef(null);
  const ctaRef = useRef(null);
  const fake1Ref = useRef(null);
  const fake2Ref = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.fromTo(
        logoRef.current,
        { y: -50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "elastic.out(1, 0.5)" }
      )
      .fromTo(
        navRef.current,
        { y: -50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "elastic.out(1, 0.5)" },
        "-=0.5"
      )
      .fromTo(
        fake1Ref.current,
        { y: -50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "elastic.out(1, 0.5)" },
        "-=0.5"
      )
      .fromTo(
        fake2Ref.current,
        { y: -50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "elastic.out(1, 0.5)" },
        "-=0.5"
      )
      .fromTo(
        textRef.current,
        { y: -50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "elastic.out(1, 0.5)" },
        "-=0.5"
      );
    }, navRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    // Observer pour détecter les sections "sombres"
    const sections = [
      document.getElementById("testimonials"),
      document.getElementById("contact"),
      document.getElementById("parrainage"),
    ];
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      let found = false;
      for (const section of sections) {
        if (section) {
          const rect = section.getBoundingClientRect();
          const top = rect.top + scrollY;
          const bottom = rect.bottom + scrollY;
          if (
            scrollY + windowHeight / 2 >= top &&
            scrollY + windowHeight / 2 <= bottom
          ) {
            found = true;
            break;
          }
        }
      }
      setIsDarkSection(found);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-transparent backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div
          ref={logoRef}
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <img src="/logo.png" alt="logo" width={40} height={20} className="rounded-full " />
          <span className={isDarkSection ? "text-black font-semibold" : "text-white font-semibold"}>
            Virgile-Alexandre Bouali
          </span>
        </div>

        {/* Menu */}
        <nav ref={navRef} className={`hidden md:flex gap-8 text-sm font-medium transition-colors duration-300 ${isDarkSection ? "text-black" : "text-white"}`}>
          <a href="#exemples" className="hover:text-gray-400">Projets</a>
          <a href="#contact" className="hover:text-gray-400">Contact</a>
          <a href="#services" className="hover:text-gray-400">Services</a>
        </nav>

        {/* CTA */}
        <div ref={ctaRef} className={`hidden cursor-pointer md:flex items-center gap-2 border border-white/20 text-sm px-4 py-2 rounded-full transition ${isDarkSection ? "bg-white text-black hover:bg-black/90 hover:text-white" : "bg-slate-900 text-white hover:text-black hover:bg-white/90"}`}>
          <div className="flex -space-x-1">
            <img ref={fake1Ref} src="/icons8-speech-bubble (1).svg" alt="" width={24} height={24} className="rounded-full text-white" />
          </div>
          <span ref={textRef} className="font-medium">Demander un devis</span>
        </div>
        <DownloadCV />
      </div>
    </header>
  );
}
