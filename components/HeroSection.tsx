"use client";

import { useEffect, useState } from "react";

function CevoMark() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <path d="M10 7L42 24L10 41V31.5L30 24L10 16.5V7Z" fill="#0d0d0d" />
    </svg>
  );
}

function WindowsIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801" />
    </svg>
  );
}

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center px-6 pt-16 pb-16">
      {/* Logo mark */}
      <div
        className={`flex items-center gap-3 mb-6 md:mb-10 transition-all duration-700 ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
        }`}
        style={{ transitionDelay: "0ms" }}
      >
        <CevoMark />
        <span className="text-[13px] md:text-[15px] font-sans font-medium text-gray-400 tracking-[0.2em] uppercase">
          CEVO
        </span>
      </div>

      {/* Headline */}
      <h1
        className={`font-display font-extrabold leading-[1] md:leading-[0.9] tracking-tight text-[#0d0d0d] max-w-[900px] mb-7 md:mb-12 transition-all duration-700 ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
        style={{
          fontSize: "clamp(2rem, 7vw, 6.5rem)",
          transitionDelay: "80ms",
        }}
      >
        Experience liftoff with the next-gen agent platform
      </h1>

      {/* CTAs */}
      <div
        className={`flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto transition-all duration-700 ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
        style={{ transitionDelay: "180ms" }}
      >
        <a
          href="#try-cevo"
          className="flex items-center justify-center gap-3 w-full sm:w-auto bg-[#0d0d0d] text-white px-7 py-3.5 md:px-8 md:py-4 rounded-full text-[14px] md:text-[15px] font-medium hover:bg-[#1a1a1a] transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-black/10"
        >
          <WindowsIcon />
          Download for Windows
        </a>
        <a
          href="#features"
          className="flex items-center justify-center w-full sm:w-auto px-7 py-3.5 md:px-8 md:py-4 rounded-full border border-gray-300 text-[14px] md:text-[15px] font-medium text-gray-600 hover:bg-white/60 hover:border-gray-400 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          Explore use cases
        </a>
      </div>

      {/* Scroll line */}
      <div
        className={`absolute bottom-10 flex flex-col items-center gap-0 transition-all duration-700 ${
          mounted ? "opacity-100" : "opacity-0"
        }`}
        style={{ transitionDelay: "400ms" }}
      >
        <div className="w-px h-14 bg-gradient-to-b from-gray-300 to-transparent" />
      </div>
    </section>
  );
}
