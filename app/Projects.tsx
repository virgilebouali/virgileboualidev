'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)


const cards = [
    {
      title: "Kvitka Films",
      description: "Site vitrine sur mesure pour Anastasia Mikova, journaliste et réalisatrice. Réalisé sous WordPress avec Elementor, entièrement responsive, avec des animations modernes dont certaines codées en JavaScript pour plus de fluidité et de personnalisation.",
      image: "/kvitka.png",
      link: "https://anastasiamikova.com/",
      logos: [
        { src: "/icons8-wordpress-500.png", alt: "WordPress" },
        { src: "/icons8-javascript.svg", alt: "JavaScript" }
      ]
    },
    {
      title: "Iminios",
      description: "Boutique Shopify customisée pour une marque de vêtements. Schéma & settings en liquid, intégration produits, design, optimisation mobile et tunnel de vente.",
      image: "/iminios.png",
      link: "https://iminios.com",
      logos: [
        { src: "/icons8-shopify.svg", alt: "Shopify" }
      ]
    },
    {
      title: "SHOWREEL (A VENIR)",
      description: "Intégration de 10 maquettes Readymag en HTML à l'aide de Tailwind CSS, GSAP pour les animations et Nunjucks pour le templating, au sein d'un CMS interne. Travail pixel perfect conformément aux designs fournis.",
      image: "/readymag.png",
      link: "#",
      logos: [
        { src: "/icons8-javascript.svg", alt: "JavaScript" },
        { src: "/icons8-github.svg", alt: "Git" }
      ]
    },
    {
      title: "MV Suisse Conseil",
      description: "Site WordPress pour un cabinet d'assurance suisse. Design professionnel, formulaire de contact automatisé avec Zapier vers un CRM interne.",
      image: "/mvsuisse.png",
      link: "https://mv-suisseconseil.ch/",
      logos: [
        { src: "/icons8-wordpress-500.png", alt: "WordPress" },
        { src: "/icons8-javascript.svg", alt: "JavaScript" }
      ]
    },
  ];
  

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsContainerRef = useRef<HTMLDivElement>(null)
  const rocketRef = useRef<HTMLSpanElement>(null)
  const borderRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const cardsContainer = cardsContainerRef.current;
    const rocket = rocketRef.current;

    if (!section || !cardsContainer || !rocket) return;

    const totalScroll = cardsContainer.scrollWidth - window.innerWidth;

    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const scrollMultiplier = isMobile ? 1.2 : 1.7;

    // Animation du scroll horizontal
    gsap.to(cardsContainer, {
      x: -totalScroll,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: () => `+=${cardsContainer.scrollWidth / scrollMultiplier}`,
        scrub: true,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      }
    });

    // Animation de la rocket avec scrub pour un mouvement fluide dans les deux sens
    gsap.to(rocket, {
      x: isMobile ? 3000 : 6000,
      y: isMobile ? -2000 : -700,
      scale: isMobile ? 10 : 20,
      zIndex: 1000,
      rotate: isMobile ? 0 : 40,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: () => `+=${cardsContainer.scrollWidth / scrollMultiplier}`,
        scrub: 1,
      }
    });

    // Animation GSAP des bordures dégradées
    borderRefs.current.forEach((ref) => {
      if (ref) {
        gsap.to(ref, {
          backgroundPosition: '200% 0',
          duration: 3,
          repeat: -1,
          ease: 'linear',
        });
      }
    });

    // Nettoyage
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="w-full min-h-screen relative overflow-hidden bg-[#05040b]"
    >
        
      <div
        ref={cardsContainerRef}
        className="flex w-fit gap-8 min-h-screen pl-10 xl:px-24 mt-24"
      >
         <div className="flex flex-col items-center xl:w-[40vw] mt-27 mr-10">
                <span 
                    className="mt-12 mb-6 inline-block px-4 py-1 rounded-full text-sm text-white/80 backdrop-blur-sm relative before:absolute before:inset-0 before:p-[1px] before:rounded-full before:bg-gradient-to-r before:from-pink-500 before:via-orange-400 before:to-purple-500 before:-z-10 after:absolute after:inset-[1px] after:rounded-full after:bg-[#110d21] after:-z-10"
                >
                    Mes réalisations
                </span>
            <h2 className="text-7xl md:text-5xl mb-16 text-center text-white font-light z-50">
            Mes derniers <span className="font-light">projets <span ref={rocketRef} className="inline-block">🚀</span></span>
         <div className="text-white/70 text-sm leading-relaxed mt-4">
         Ils m&apos;ont fait confiance pour créer leurs présence en ligne.
         </div>
            </h2>
            </div>
        {cards.map((card, i) => (
          <div
            key={i}
            className="min-w-[100vw] xl:h-[80vh] h-[85vh] xl:min-w-[50vw] bg-white/5 rounded-2xl backdrop-blur-sm overflow-hidden relative hover:scale-105 transition-transform duration-300 cursor-pointer"
            onClick={() => window.open(card.link, '_blank')}
          >
            <div className="h-[60vh] w-full overflow-hidden">
              <img src={card.image} alt={card.title} className="w-full h-full object-cover" />
            </div>
            <div className="p-4 items-center">
              <h3 className="text-2xl font-bold text-white uppercase mb-4">
                {card.title}
                {card.logos.map((logo, idx) => (
                  <img
                    key={idx}
                    src={logo.src}
                    alt={logo.alt}
                    className="w-8 h-8 inline-block ml-2"
                  />
                ))}
              </h3>
              <p className="text-white/70">{card.description}</p>
            </div>
            {/* Bordure basse animée */}
            <span
              ref={(el) => { borderRefs.current[i] = el }}
              className="absolute left-0 bottom-0 w-full h-[3px]"
              style={{
                background: 'linear-gradient(90deg, #ec4899, #fb923c, #a21caf, #ec4899)',
                backgroundSize: '200% 100%',
                backgroundPosition: '0% 0%',
                display: 'block',
                borderBottomLeftRadius: '1rem',
                borderBottomRightRadius: '1rem',
              }}
            />
          </div>
        ))}
      </div>
    </section>
  )
}
