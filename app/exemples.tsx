'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const cards = [
    {
      title: "Kvitka Films",
      description: "Site vitrine sur mesure pour une créatrice de contenus artistiques. Intégration responsive et animations modernes faites sur Wordpress, Elementor avec du Javascript Vanilla.",
      image: "/kvitka.png",
      link: "https://kvitka.fr",
    },
    {
      title: "Iminios",
      description: "Boutique Shopify customisée pour une marque de vêtements. Intégration produits, design, optimisation mobile et tunnel de vente.",
      image: "/iminios.png",
      link: "https://iminios.com",
    },
    {
      title: "Greenlight Films",
      description: "Intégration pixel perfect de maquettes Readymag en HTML, Tailwind CSS et Nunjucks pour un CMS interne. Animations GSAP.",
      image: "/readymag.png",
      link: "https://greenlightfilms.fr",
    },
    {
      title: "MV Suisse Conseil",
      description: "Site WordPress pour un cabinet d'assurance suisse. Design professionnel, formulaire de contact automatisé avec Zapier vers un CRM interne.",
      image: "/mvsuisse.png",
      link: "https://mvsuisse.ch",
    },
  ];
  

export default function Exemples() {
    const sectionRef = useRef<HTMLElement>(null);
    const cardsContainerRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const section = sectionRef.current;
            const cardsContainer = cardsContainerRef.current;
            const title = titleRef.current;

            if (!section || !cardsContainer || !title) return;

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: "top top",
                    end: "+=300%",
                    pin: true,
                    scrub: 1,
                    markers: true, 

                }
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
                    ease: "power2.out",
                }
            );

            // Animation du conteneur des cards
            tl.to(cardsContainer, {
                x: () => {
                    if (window.innerWidth < 768) {
                        return -(cardsContainer.scrollWidth - window.innerWidth / 1.03);
                    } else if (window.innerWidth < 1280) {
                        return -(cardsContainer.scrollWidth - window.innerWidth / 1.5);
                    } else {
                        return -(cardsContainer.scrollWidth - window.innerWidth / 1.05);
                    }
                },
                ease: "none",
                duration: 2,
            }, "+=0.5");
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} id="exemples" className="bg-[#05040b] min-h-[100vh] w-full mb-4 overflow-hidden">
            <div className="container mx-auto px-4 flex flex-col items-center w-full">
                <div className="flex flex-col items-center">
                <span 
                    className="mt-12 mb-6 inline-block px-4 py-1 rounded-full text-sm text-white/80 backdrop-blur-sm relative before:absolute before:inset-0 before:p-[1px] before:rounded-full before:bg-gradient-to-r before:from-pink-500 before:via-orange-400 before:to-purple-500 before:-z-10 after:absolute after:inset-[1px] after:rounded-full after:bg-[#110d21] after:-z-10"
                >
                    Mes réalisations
                </span>
            <h2 className="text-4xl md:text-5xl mb-16 text-center text-white font-light">
            Mes derniers  <span className=" font-light">projets   </span>  
         <div className="text-white/70 text-sm leading-relaxed mt-4">
         Ils m&apos;ont fait confiance pour créer leurs présence en ligne.
         </div>
            </h2>
            </div>

                <div ref={cardsContainerRef} className="flex gap-8 w-full mt-4 xl:pl-24 pl-10">
                    {cards.map((card, index) => (
                        <div 
                            key={index} 
                            className="xl:min-w-[50vw] min-w-[100vw] hover:scale-105 transition-all duration-300 cursor-pointer bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden relative before:absolute before:inset-0 before:p-[1px] before:rounded-2xl before:bg-gradient-to-r before:from-pink-500 before:via-orange-400 before:to-purple-500 before:-z-10 after:absolute after:inset-[1px] after:rounded-2xl after:bg-[#05040b] after:-z-10"
                            onClick={() => window.open(card.link, '_blank')}>
                            <div className="h-[60vh] w-full overflow-hidden">
                                <img 
                                    src={card.image} 
                                    alt={card.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="p-4 bg-transparent">
                                <h3 className="text-2xl font-bold mb-4 text-white uppercase">{card.title}</h3>
                                <p className="text-white/70">{card.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}