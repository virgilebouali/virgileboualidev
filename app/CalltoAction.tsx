'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function CallToAction() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const iconsRef = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      const content = contentRef.current;
      const circle = circleRef.current;
      if (!section || !content || !circle) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=200%",
          pin: true,
          scrub: 1,
        }
      });
    
     
      tl.fromTo(content,
        { opacity: 0, y: 100 },
        { opacity: 1, y: 0, duration: 4 }
      );

      // Animation des icônes dans la timeline principale
      const icons = document.querySelectorAll('.social-icon');
      icons.forEach((icon, index) => {
        tl.fromTo(icon,
          { 
            opacity: 0,
            y: 100
          },
          {
            opacity: 1,
            y: 0,
            delay: index * 0.2,
            duration: 1,
            ease: "power2.out"
          },
          "-=0.1"
        );
      }, "<" );
      tl.fromTo(circle, {
        x: -200,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
      }, {
        x: 0,
        scale: 1,
        opacity: 1,
        duration: 5,
        ease: "power2.out",
      }, "<" );

      // 3e animation : grossir le cercle après la précédente
      tl.to(circle, {
        scale: 1,      // Ajuste la valeur selon l'effet désiré
        duration: 10,   // Durée de l'animation de grossissement
        ease: "power2.out",
      });
      tl.to({}, { duration: 8 });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-white min-h-screen text-[#05040b] overflow-hidden"
      id="contact"
    >

      <div 
        ref={contentRef}
        className="container mx-auto h-screen flex flex-col md:flex-row items-center justify-center xl:px-24 px-10"
      >
        {/* Image gauche */}
        <div className="w-full md:w-1/2 mx-auto relative">
          <div ref={circleRef} className="absolute xl:top-8 top-[-50%] xl:right-24 right-2 w-[520px] h-[520px] rounded-full bg-orange-300 -z-10 shadow-3xl"></div>
          <Image
            src="/me.jpg"
            alt="Illustration contact"
            width={500}
            height={500}
            className="rounded-full border border-gradient-to-br from-pink-500 via-orange-400 to-purple-500 shadow-3xl  relative z-10"
          />
        </div>
        
        {/* Texte + bouton */}
        <div className="w-full md:w-1/2">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight w-[90%]">
            Vous avez un projet en tête ?
            <br />
            <span className="bg-gradient-to-r from-pink-500 via-orange-400 to-purple-500 text-transparent bg-clip-text font-light">
              Parlons-en. 📨
            </span>
          </h2>
          <p className="text-[#05040b]/70 text-lg mb-8">
          Un site web clair, beau et efficace : je m’occupe du design, du développement et de l’accompagnement pour vous aider à atteindre vos objectifs.          </p>
          <div className="flex flex-col gap-6">
            <Link
              href="#contact"
              className="inline-block xl:px-8 px-6 py-2 bg-white text-[#05040b] hover:text-gray-700 font-semibold rounded-full scale-105 transition transform xl:w-fit w-[50%] relative before:absolute before:inset-0 before:p-[1px] before:rounded-full before:bg-gradient-to-br before:from-pink-500 before:via-orange-400 before:to-purple-500 before:-z-10 after:absolute after:inset-[1px] after:rounded-full after:bg-white after:-z-10"
            >
On fait équipe ?
            </Link>
            <div className="flex gap-4 items-center justify-around">
              <a href="https://www.malt.fr/profile/virgilebouali" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition transform social-icon">
                <Image src="/malt.svg" alt="Malt" width={50} height={24} />
              </a>
              <a href="https://www.linkedin.com/in/virgile-bouali/" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition transform social-icon">
                <Image src="/linkedin.svg" alt="LinkedIn" width={30} height={24} />
              </a>
              <a href="https://wa.me/33612345678" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition transform social-icon">
                <Image src="/whatsapp.svg" alt="WhatsApp" width={30} height={24} />
              </a>
              <a href="mailto:contact@virgilebouali.dev" className="hover:scale-110 transition transform social-icon">
                <Image src="/gmail.svg" alt="Gmail" width={30} height={24} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
