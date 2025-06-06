'use client'

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const logos = [
  { src: '/icons8-react.svg', alt: 'React' },
  { src: '/icons8-nextjs.svg', alt: 'Next.js' },
  { src: '/icons8-tailwind-css.svg', alt: 'Tailwind CSS' },
  { src: '/icons8-github.svg', alt: 'GitHub' },
  { src: '/icons8-typescript.svg', alt: 'TypeScript' },
  { src: '/icons8-wordpress-500.png', alt: 'WordPress' },
  { src: '/icons8-shopify.svg', alt: 'Shopify' },
  { src: '/icons8-javascript.svg', alt: 'JavaScript' },
  { src: '/icons8-react.svg', alt: 'React' },
  { src: '/icons8-nextjs.svg', alt: 'Next.js' },
  { src: '/icons8-github.svg', alt: 'GitHub' },
  { src: '/icons8-tailwind-css.svg', alt: 'Tailwind CSS' },
  { src: '/icons8-typescript.svg', alt: 'TypeScript' },
  { src: '/icons8-wordpress-500.png', alt: 'WordPress' },
  { src: '/icons8-shopify.svg', alt: 'Shopify' },
  { src: '/icons8-javascript.svg', alt: 'JavaScript' },
  
];

export default function TechMarquee() {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!marqueeRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to('.marquee-track', {
        xPercent: -50,
        repeat: -1,
        duration: 60,
        ease: 'linear'
      });
    }, marqueeRef);

    return () => ctx.revert();
  }, []);

  return (
    
    <div className="overflow-hidden w-full  py-4 relative" ref={marqueeRef}>
      {/* Gradient de gauche */}
      <div className="absolute left-0 top-0 bottom-0 w-[20%] bg-gradient-to-r from-[#76163b] to-transparent z-10"></div>
      {/* Gradient de droite */}
      <div className="absolute right-0 top-0 bottom-0 w-[20%] bg-gradient-to-l from-[#24108F] to-transparent z-10"></div>
      <div className="flex marquee-track w-max gap-12 rounded-full">
        {[...logos, ...logos].map((logo, index) => (
          <div key={index} className="w-14 h-14 mt-1 flex items-center justify-center transition rounded-full">
            <Image src={logo.src} alt={logo.alt} width={90} height={64} />
          </div>
        ))}
      </div>
    </div>
  );
}
