'use client';

import { useState, useEffect } from 'react';

const ScrollDown = () => {
  const [isDarkSection, setIsDarkSection] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const sections = [
      document.getElementById("testimonials"),
      document.getElementById("contact"),
      document.getElementById("parrainage"),
    ];

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      let found = false;
      
      // Vérifier si nous sommes dans la section Parrainage
      const parrainageSection = document.getElementById("parrainage");
      if (parrainageSection) {
        const rect = parrainageSection.getBoundingClientRect();
        const top = rect.top + scrollY;
        if (scrollY + windowHeight / 2 >= top) {
          setIsVisible(false);
          return;
        } else {
          setIsVisible(true);
        }
      }

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

  if (!isVisible) return null;

  return (
    <div className={`fixed bottom-5 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 animate-bounce border-2 ${isDarkSection ? 'border-black' : 'border-white'} rounded-full px-2`}>
      <span className={`text-sm font-medium ${isDarkSection ? 'text-black' : 'text-white'}`}></span>
      <svg 
        className={`w-4 h-4 ${isDarkSection ? 'text-black' : 'text-white'}`}
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M19 14l-7 7m0 0l-7-7m7 7V3" 
        />
      </svg>
    </div>
  );
};

export default ScrollDown; 