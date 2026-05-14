"use client";

import { useEffect, useState } from "react";

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden bg-[#111111]">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 z-10" />

      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)",
          backgroundSize: "20px 20px",
        }}
      />

      {/* Content */}
      <div className="relative z-20 px-6 max-w-3xl mx-auto">
        <p
          className={`text-[10px] md:text-[11px] tracking-[0.35em] uppercase text-[#b89a72] mb-8 font-inter transition-all duration-1000 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: "0ms" }}
        >
          VOWEN Studio
        </p>

        <h1
          className={`font-cormorant text-white leading-[1.05] mb-8 transition-all duration-1000 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "clamp(2.4rem, 6vw, 5rem)",
            fontWeight: 300,
            letterSpacing: "0.02em",
            transitionDelay: "120ms",
          }}
        >
          luxury accessories
          <br />
          <em>for modern brides</em>
        </h1>

        <p
          className={`text-[13px] md:text-[14px] text-gray-300 leading-relaxed mb-4 font-inter font-light transition-all duration-1000 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: "240ms" }}
        >
          soft colour palettes, sculptural forms and intricate details
        </p>
        <p
          className={`text-[13px] md:text-[14px] text-gray-400 leading-relaxed mb-12 font-inter font-light transition-all duration-1000 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: "320ms" }}
        >
          handcrafted in the finest materials, using artisan techniques
        </p>

        <div
          className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-1000 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: "440ms" }}
        >
          <a
            href="/shop"
            className="w-full sm:w-auto px-10 py-3.5 bg-white text-[#111] text-[11px] tracking-[0.2em] uppercase font-inter hover:bg-[#b89a72] hover:text-white transition-all duration-300"
          >
            Shop Now
          </a>
          <a
            href="/appointments"
            className="w-full sm:w-auto px-10 py-3.5 border border-white/40 text-white text-[11px] tracking-[0.2em] uppercase font-inter hover:border-[#b89a72] hover:text-[#b89a72] transition-all duration-300"
          >
            Book Appointment
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className={`absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-all duration-1000 ${
          mounted ? "opacity-100" : "opacity-0"
        }`}
        style={{ transitionDelay: "700ms" }}
      >
        <span className="text-[9px] tracking-[0.3em] uppercase text-gray-500 font-inter">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-gray-500 to-transparent" />
      </div>
    </section>
  );
}
