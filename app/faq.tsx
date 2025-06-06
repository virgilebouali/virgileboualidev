'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

const faqs = [
    {
      question: "Avec quelles technologies développez-vous ?",
      answer:
        "Je travaille principalement avec React.js, Next.js et Tailwind CSS pour des interfaces modernes et performantes. J'intègre également WordPress et Shopify selon les besoins du projet."
    },
    {
      question: "Quel type de projets réalisez-vous ?",
      answer:
        "Je conçois des sites sur-mesures, des e-commerces et des landing pages orientés performance et conversion. J'interviens aussi bien pour des refontes que pour des créations complètes."
    },
    {
      question: "Comment se déroule la collaboration ?",
      answer:
        "Je démarre par une prise de brief claire, puis j'avance en autonomie avec des points de validation réguliers. Mon objectif est de vous livrer un site fiable, responsive et prêt à l'emploi."
    },
    {
      question: "Quels sont vos délais de livraison ?",
      answer:
        "Un site vitrine peut être livré en 2 à 4 semaines. Un site e-commerce ou un projet plus complexe prend généralement entre 4 et 8 semaines."
    },
    {
      question: "Proposez-vous un accompagnement post-livraison ?",
      answer:
        "Oui, un support technique est inclus pendant 30 jours. Je propose aussi des forfaits de maintenance ou des évolutions au besoin."
    },
    {
      question: "Est-ce que vous pouvez gérer l'hébergement et le nom de domaine ?",
      answer:
        "Absolument. Je peux vous conseiller sur la meilleure solution (Vercel, o2switch, Infomaniak…), et m'occuper de la mise en ligne complète."
    }
  ];
  

export default function FAQ() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      const cardsContainer = cardsContainerRef.current;
      const title = titleRef.current;
      const footer = document.querySelector('footer');
      const button = buttonRef.current;

      if (!section || !cardsContainer || !title || !footer || !button) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=600%",
          pin: true,
          scrub: 1,
        },
      });

      // Animation du titre
      tl.fromTo(title,
        { 
          x: -20, 
          opacity: 0,
        },
        { 
          x: 0, 
          opacity: 1, 
          duration: 0.5, 
          ease: "power3.out" 
        }
      );

      // Animation des cartes
      const cards = cardsContainer.children;
      for (let i = 0; i < cards.length; i++) {
        const card = cards[i];
        
        // Position initiale de la carte
        gsap.set(card, {
          position: 'absolute',
          top: '50%',
          left: '50%',
          xPercent: -50,
          yPercent: -50,
          opacity: 0,
          scale: 1.2
        });

        // Animation d'apparition
        tl.to(card, {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: "power2.out"
        });

        // Animation de disparition
        if (i < cards.length - 1) {
          tl.to(card, {
            opacity: 0,
            scale: 0.8,
            duration: 0.5,
            ease: "power2.in"
          }, "+=2");
        }
      }

      // Animation du footer
      tl.fromTo(footer,
        {
          y: 100,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out"
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="h-screen bg-[#05040b] text-white relative py-24 overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 ref={titleRef} className="relative text-4xl md:text-5xl font-bold text-center transition-all duration-500 ">
          <span className="absolute -z-10 left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[1700px] h-[200px] bg-gradient-to-br from-pink-500 via-orange-400 to-purple-500 blur-2xl opacity-60 rotate-12 slow-pulse"></span>
          Questions <span className=" text-white font-light">(fréquentes ?)</span>
          <span className="block text-sm font-normal mt-4 text-white/60">
            Vous vous posez sûrement une de ces questions 
          </span>
        </h2>
        <img src="/faq6.png" alt="testify" className="w-[40vw] object-cover absolute bottom-[0%] left-[-2%] -z-10" />

        <div ref={cardsContainerRef} className="relative w-[0%] h-[300px] xl:ml-[65%] mx-auto mt-10">
          {faqs.map((faq, index) => (
            <div key={index} className="w-[90vw] md:w-[60vw] lg:w-[50vw] mx-auto bg-white/5 backdrop-blur-sm p-8 rounded-2xl before:absolute before:inset-0 before:p-[1px] before:rounded-2xl before:bg-gradient-to-r before:from-pink-500 before:via-orange-400 before:to-purple-500 before:-z-10 after:absolute after:inset-[1px] after:rounded-2xl after:bg-[#05040b] after:-z-10">
              <h3 className="text-2xl font-semibold mb-4 text-white">{faq.question}</h3>
              <p className="text-white/80 text-lg">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center xl:ml-[25%] ml-[20%] xl:mt-10 mt-30">
        <Link
          ref={buttonRef}
          href="#contact"
          className="group inline-flex items-center gap-2 px-8 py-2 bg-white text-[#05040b] hover:text-gray-500 font-semibold rounded-full scale-105 transition transform relative before:absolute before:inset-0 before:p-[1px] before:rounded-full before:bg-gradient-to-br before:from-pink-500 before:via-orange-400 before:to-purple-500 before:-z-10 after:absolute after:inset-[1px] after:rounded-full after:bg-white after:-z-10"
        >
          <span>Travaillons ensemble</span>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5 group-hover:translate-x-1 transition-transform" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M13 7l5 5m0 0l-5 5m5-5H6" 
            />
          </svg>
        </Link>
      </div>

    </section>
  );
}
