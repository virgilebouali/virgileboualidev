'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: "Prise de contact & définition de vos besoins 🤝",
    description: "Tout commence par un échange. Vous me parlez de votre activité, de vos objectifs, de vos envies. Je pose les bonnes questions pour cerner votre projet et vous proposer une solution sur-mesure.",
    image: "/contact.png",
    reverse: false
  },
  {
    title: "Cahier des charges & validation du devis 📝",
    description: "Une fois vos besoins définis, je rédige un cahier des charges clair et structuré. Vous validez le devis en toute transparence, avec un budget et un planning maîtrisé dès le départ.",
    image: "/agree.png",
    reverse: true
  },
  {
    title: "Création sur-mesure 🪡",
    description: "Je vous tiens informé à chaque étape clé, avec des points réguliers et un accompagnement réactif. Vous recevez un site professionnel, optimisé et prêt à l'emploi dans les délais annoncés.",
    image: "/work.png",
    reverse: false
  }
];

export default function Services() {
  const servicesRef = useRef<HTMLDivElement[]>([]);
  const sectionRef = useRef<HTMLElement>(null);
  const checkmarkRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      if (!section) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=400%",
          pin: true,
          scrub: 1,
          onUpdate: (self) => {
            const progress = self.progress;
            const index = Math.floor(progress * services.length);
            // Animation de la barre de progression
            const progressBar = document.querySelector('.services-progress-bar');
            if (progressBar) {
              gsap.to(progressBar, {
                height: `${progress * 100}%`,
                duration: 0.2,
                ease: 'power1.out'
              });
            }

            // Animation de l'emoji à la fin
            if (progress >= 0.99 && checkmarkRef.current) {
              gsap.fromTo(
                checkmarkRef.current,
                { 
                  opacity: 0,
                  scale: 0,
                  y: 20
                },
                {
                  opacity: 1,
                  scale: 1,
                  y: 0,
                  duration: 0.3,
                  ease: "back.out(1.7)",
                  onComplete: () => {
                    gsap.to(checkmarkRef.current, {
                      opacity: 1,
                      scale: 0,
                      y: 20,
                      duration: 0.2,
                      delay: 0.5,
                      ease: "power2.in"
                    });
                  }
                }
              );
            }
          }
        }
      });

      servicesRef.current.forEach((service, index) => {
        if (index === 0) {
          tl.fromTo(service,
            { opacity: 0, y: 100 },
            { opacity: 1, y: 0, duration: 10 }
          );
        } else {
          tl.to(servicesRef.current[index - 1], 
            { opacity: 0, y: -100, duration: 5 },
            "+=1"
          )
          .fromTo(service,
            { opacity: 0, y: 100 },
            { opacity: 1, y: 0, duration: 9 },
            "<"
          );
        }
      });

      tl.to({}, { duration: 20 });

    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="services" className="bg-[#05040b] min-h-screen text-white w-full overflow-hidden">
      <div className="container px-6 w-full h-screen flex items-center justify-center relative">
        
        {services.map((service, index) => (
            
          <div
            key={index}
            ref={el => {
              if (el) servicesRef.current[index] = el;
            }}
            className={`absolute border-t-2 py-12 border-gray-900 flex flex-col-reverse md:flex-row ${service.reverse ? 'md:flex-row-reverse' : ''} items-center gap-12 w-[90%]`}
          >
             
            <div className="md:w-1/2">
            <span 
                    className="mt-12 mb-6 inline-block px-4 py-1 rounded-full text-sm text-white/80 backdrop-blur-sm relative before:absolute before:inset-0 before:p-[1px] before:rounded-full before:bg-gradient-to-r before:from-pink-500 before:via-orange-400 before:to-purple-500 before:-z-10 after:absolute after:inset-[1px] after:rounded-full after:bg-[#110d21] after:-z-10"
                >
                    Les étapes de votre projet
                </span>
              <h3 className="xl:text-4xl text-2xl font-semibold mb-6">{service.title}</h3>
              <p className="text-white/70 text-lg leading-relaxed">{service.description}</p>
            </div>
            
            <div className="md:w-1/2 relative flex items-center justify-center">
              <span
                className="absolute inset-0 w-[80%] h-full rounded-xl blur-2xl opacity-30 z-0 bg-gradient-to-br from-pink-500 via-orange-400 to-purple-500"
                aria-hidden="true"
              ></span>
              <Image
                src={service.image}
                alt={service.title}
                width={500}
                height={500}
                className="relative rounded-xl shadow-3xl shadow-pink-500/20 border-2 border-white/40 z-10"
              />
            </div>
          </div>
        ))}
        
        <div className="absolute xl:right-8 -right-1 top-1/2 -translate-y-1/2 flex flex-col items-center justify-center h-[60vh]">
          <div
            ref={checkmarkRef}
            className="absolute -bottom-12 opacity-0 text-4xl hidden xl:block"
          >
            ✅
          </div>
          <div className="w-3 h-full bg-white/10 rounded-full overflow-hidden relative">
            <div className="services-progress-bar absolute left-0 bottom-0 w-full bg-gradient-to-b from-pink-500 via-orange-400 to-purple-500 rounded-full" style={{height: '0%'}}></div>
          </div>
        </div>
      </div>
    </section>
  );
}
