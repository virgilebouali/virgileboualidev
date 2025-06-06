'use client';

import { useRef } from "react";
import gsap from "gsap";
import { FaDownload } from "react-icons/fa";

export default function DownloadCV() {
  const checkmarkRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    if (checkmarkRef.current) {
      gsap.fromTo(
        checkmarkRef.current,
        { 
          opacity: 0,
          scale: 0,
          x: -20
        },
        {
          opacity: 1,
          scale: 1,
          x: 0,
          duration: 0.3,
          ease: "back.out(1.7)",
          onComplete: () => {
            gsap.to(checkmarkRef.current, {
              opacity: 0,
              scale: 0,
              x: -20,
              duration: 0.2,
              delay: 0.5,
              ease: "power2.in"
            });
          }
        }
      );
    }
  };

  return (
    <div className="relative flex items-center">
      <div
        ref={checkmarkRef}
        className="absolute -left-16 opacity-0 text-2xl"
      >
        ✅
      </div>
      <a
        href="/CV 2025 .pdf"
        download
        onClick={handleClick}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#967095] to-[#908fed] text-white font-semibold shadow-lg hover:scale-105 transition"
      >
        <FaDownload className="w-5 h-5" />
        CV
      </a>
    </div>
  );
}
