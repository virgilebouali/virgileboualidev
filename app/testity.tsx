'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register plugin
gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    name: "Sarah M.",
    role: "Fondatrice de Iminios",
    text: "Virgile a su transformer notre vision en un site Shopify moderne et fluide. Tout était clair, rapide, et livré dans les délais. On a vu une hausse directe de nos conversions.",
    avatar: "/testify.jpeg"
  },
  {
    name: "Julien L.",
    role: "Directeur MV Suisse Conseil",
    text: "Une super collaboration ! Virgile a compris nos enjeux métier et a développé un site clair, rapide et bien référencé. Très pro et autonome.",
    avatar: "/testify.jpeg"
  },
    {
      name: "Émilie R.",
      role: "Cheffe de projet chez Greenlight Films",
      text: "Virgile a intégré nos maquettes complexes avec précision. Le rendu final était exactement comme attendu, avec des animations fluides et un code propre.",
      avatar: "/testify.jpeg"
    }
    , 
    
];



export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLSpanElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      const cardsContainer = cardsContainerRef.current;
      const title = titleRef.current;
      const progress = progressRef.current;

      if (!section || !cardsContainer || !title || !progress) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=300%",
          pin: true,
          scrub: 1,
          onUpdate: (self) => {
            gsap.to(progress, {
              width: `${self.progress * 100}%`,
              duration: 0.1,
              ease: "none"
            });
          }
        }
      });

      // Animation du titre
      tl.fromTo(title,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }
      );

      // Animation de remplacement des cartes
      const cards = cardsContainer.children;
      const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
      for (let i = 0; i < cards.length; i++) {
        const card = cards[i];
        const nextCard = cards[i + 1];

        if (nextCard) {
          const yValue = isMobile ? 0 : 50 * (i + 10);
          tl.to(card, {
            opacity: 0,
            y: -10,
            scale: 0.8,
            duration: 0.5,
            ease: "power2.in"
          })
          .fromTo(nextCard,
            { 
              opacity: 0, 
              y: yValue,
              scale: isMobile ? 1 : 1.2
            },
            { 
              opacity: 1, 
              y: 0,
              scale: 1,
              duration: 0.5, 
              ease: "power2.out" 
            },
            "-=0.3"
          );
          tl.to({}, { duration: 2 });
        }
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="min-h-screen bg-white text-black py-20 relative overflow-hidden" id="testimonials">
      <div className="container mx-auto px-4 ">
        <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center bg-gradient-to-r from-pink-900 via-orange-400 to-purple-500 text-transparent bg-clip-text font-light">
        <span className="text-black font-bold">   Ce qu&apos;ils </span>  disent  de moi 🧡
          <span ref={titleRef} className="block text-sm font-normal mt-4 text-black/60">
            Quelques retours de mes clients
          </span>
        </h2>
        <img src="/testimonials.png" alt="testify" className="w-[45%] h-full xl:block hidden rounded-full object-cover absolute bottom-[-5%] right-[0%] -z-10" />
        <div ref={cardsContainerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:gap-8 gap-0">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white shadow-lg p-6 rounded-2xl relative before:absolute before:inset-0 before:p-[1px] before:rounded-2xl before:bg-gradient-to-r before:from-pink-500 before:via-orange-400 before:to-purple-500 before:-z-10 after:absolute after:inset-[1px] after:rounded-2xl after:bg-white after:-z-10">
              <p className="text-black/80 text-lg mb-4">&quot;{testimonial.text}&quot;</p>
              <div className="flex items-center gap-4">
                <img src={testimonial.avatar} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover" />
                <div>
                  <p className="text-black font-semibold">{testimonial.name}</p>
                  <p className="text-black/60 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="fixed xl:bottom-[10vh] top-[25vh] left-1/2 -translate-x-1/2 w-[90%] max-w-2xl h-1 bg-black/10 rounded-full overflow-hidden">
          <div ref={progressRef} className="h-full bg-gradient-to-r from-white via-orange-400 to-purple-500 rounded-full" style={{ width: '0%' }}></div>
        </div>
      </div>
    </section>
  );
}
