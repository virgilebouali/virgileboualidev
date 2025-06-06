"use client"
import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import Image from 'next/image';

export default function Parrainage() {
  const cardRef = useRef<HTMLDivElement>(null);
  const waveRef = useRef<SVGSVGElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let ctx: gsap.Context;
    if (
      sectionRef.current &&
      cardRef.current &&
      waveRef.current &&
      badgeRef.current &&
      titleRef.current &&
      subtitleRef.current &&
      buttonRef.current &&
      infoRef.current
    ) {
      ctx = gsap.context(() => {
        // Timeline pour la card et les textes
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top center',
            end: 'bottom center',
            toggleActions: 'play reverse play reverse',
            pin: false,
          },
        });

        tl.fromTo(
          cardRef.current,
          { y: 100, opacity: 1, scale: 1 },
          { y: 0, opacity: 1, scale: 1, duration: 1, ease: 'power2.out' }
        )
          .fromTo(
            badgeRef.current,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
          )
          .fromTo(
            subtitleRef.current,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
          )
          .fromTo(
            infoRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }
          );

        // Animation de la largeur de la ligne SVG
        gsap.to(waveRef.current, {
          width: '140vw',
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }, sectionRef);
    }
    return () => ctx && ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="parrainage"
      className="w-full flex flex-col justify-center items-center min-h-screen py-24 bg-white relative overflow-hidden"
    >
      {/* Ligne ondulée décorative */}
      <svg
        ref={waveRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[300px] pointer-events-none select-none z-0"
        viewBox="0 0 1440 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ opacity: 0.5 }}
      >
        <path
          d="M0,160 C360,320 1080,0 1440,160"
          stroke="url(#gradient)"
          strokeWidth="12"
          fill="none"
        />
        <defs>
          <linearGradient id="gradient" x1="0" y1="0" x2="1440" y2="0" gradientUnits="userSpaceOnUse">
            <stop stopColor="#ec4899" />
            <stop offset="0.5" stopColor="#f59e42" />
            <stop offset="1" stopColor="#8b5cf6" />
          </linearGradient>
        </defs>
      </svg>
      <div ref={cardRef} className="relative z-10 bg-[#05040b] rounded-[56px] px-8 py-16 max-w-4xl w-full flex flex-col items-center shadow-2xl">
        {/* Badge */}
        <span ref={badgeRef} className="mb-8 inline-flex items-center gap-2 px-6 py-2 rounded-full border border-gradient-to-r from-pink-500 via-orange-400 to-purple-500 text-white font-medium text-sm relative before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-r before:from-pink-500 before:via-orange-400 before:to-purple-500 before:opacity-30 before:-z-10">
          <span role="img" aria-label="money">💶</span> Parrainage exclusif
        </span>
        {/* Titre */}
        <h2 ref={titleRef} className="text-3xl md:text-5xl text-center mb-6 font-[var(--font-poppins)]">
          <span className=" font-light">Obtenez une</span>  part du gâteau 🎂
        </h2>
        {/* Sous-titre */}
        <p ref={subtitleRef} className="text-lg md:text-xl text-white/80 text-center mb-10 max-w-2xl">
          Recevez <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-orange-400 to-purple-500">10% du montant</span> pour chaque nouveau client que vous me présentez et qui concrétise un projet.
        </p>
        {/* Bouton animé */}
        <style jsx>{`
          @keyframes spin-gradient {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
        <div ref={buttonRef} className="relative mb-6 group hover:scale-105 transition-all duration-300">
          <span
            className="absolute  inset-0 rounded-full p-[33px] bg-[conic-gradient(from_0deg,_#ec4899,_#f59e42,_#8b5cf6,_#ec4899)] animate-spin-gradient"
            style={{
              animation: '',
              zIndex: 0,
              display: 'block',
            }}
          ></span>
          <Link
            href="#contact"
            className="relative inline-flex items-center justify-center px-10 py-4 bg-white text-[#1a1a1a] font-semibold rounded-full text-lg shadow-lg transition border-2 border-transparent z-10"
            style={{
              backgroundClip: 'padding-box',
            }}
          >
            Je souhaite parrainer quelqu&apos;un
          </Link>
        </div>
        {/* Info bas */}
        <span ref={infoRef} className="text-xs font-light italic">
          Un bonus pour chaque projet réalisé grâce à vous
        </span>
      </div>
      <footer className="bg-transparent text-white absolute xl:bottom-0 bottom-[5vh] w-full">
        <div className="container mx-auto px-4 flex flex-col items-center justify-center gap-6">
          <div className="flex gap-6 items-center">
            <a href="https://www.malt.fr/profile/virgilebouali" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition transform">
              <Image src="/malt.svg" alt="Malt" width={50} height={24} />
            </a>
            <a href="https://www.linkedin.com/in/virgile-bouali/" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition transform">
              <Image src="/linkedin.svg" alt="LinkedIn" width={30} height={24} />
            </a>
            <a href="https://wa.me/33612345678" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition transform">
              <Image src="/whatsapp.svg" alt="WhatsApp" width={30} height={24} />
            </a>
            <a href="mailto:contact@virgilebouali.dev" className="hover:scale-110 transition transform">
              <Image src="/gmail.svg" alt="Gmail" width={30} height={24} />
            </a>
          </div>
          <div className="w-full max-w-[200px] h-[1px] bg-black/30"></div>
          <div className="text-center text-black">
            <p>© {new Date().getFullYear()} Virgile Bouali. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </section>
  );
} 