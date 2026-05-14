"use client";

import { useRef, useEffect, useState } from "react";

const earrings = [
  { name: "Emma", variant: "18ct Gold", price: "£185", bg: "#e8e0d4" },
  { name: "Ada Pearl", variant: "18ct Gold", price: "£215", bg: "#ddd5c8" },
  { name: "Emma", variant: "Sterling Silver", price: "£145", bg: "#e4e4e4" },
  { name: "Ada", variant: "Sterling Silver", price: "£165", bg: "#dde0e4" },
  { name: "Ada", variant: "18ct Gold", price: "£195", bg: "#e8dfd0" },
];

function ProductCard({
  name,
  variant,
  price,
  bg,
  delay,
  visible,
}: {
  name: string;
  variant: string;
  price: string;
  bg: string;
  delay: number;
  visible: boolean;
}) {
  return (
    <div
      className={`group cursor-pointer transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Image placeholder */}
      <div
        className="relative aspect-[3/4] mb-4 overflow-hidden"
        style={{ backgroundColor: bg }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className="text-[11px] tracking-[0.2em] uppercase opacity-30 font-inter"
            style={{ color: "#555" }}
          >
            {name}
          </span>
        </div>
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/8 transition-all duration-500" />
        <button className="absolute bottom-0 left-0 right-0 py-3 bg-[#111] text-white text-[10px] tracking-[0.2em] uppercase font-inter translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          Quick View
        </button>
      </div>
      <h3
        className="text-[15px] font-light text-[#1e1e1e]"
        style={{ fontFamily: "var(--font-cormorant)", letterSpacing: "0.03em" }}
      >
        {name}
      </h3>
      <p className="text-[11px] tracking-[0.12em] text-[#7a7570] uppercase font-inter mt-0.5">
        {variant}
      </p>
      <p className="text-[14px] text-[#1e1e1e] mt-1 font-inter">{price}</p>
    </div>
  );
}

export default function ProductSection() {
  const earringsRef = useRef<HTMLDivElement>(null);
  const veilsRef = useRef<HTMLDivElement>(null);
  const [earringsVisible, setEarringsVisible] = useState(false);
  const [veilsVisible, setVeilsVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.target === earringsRef.current && e.isIntersecting) setEarringsVisible(true);
          if (e.target === veilsRef.current && e.isIntersecting) setVeilsVisible(true);
        });
      },
      { threshold: 0.1 }
    );
    if (earringsRef.current) obs.observe(earringsRef.current);
    if (veilsRef.current) obs.observe(veilsRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      {/* ── Earrings ── */}
      <section id="shop" className="py-20 md:py-32 px-6 md:px-12 lg:px-20 bg-[#faf8f5]">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-14">
            <div>
              <p className="text-[10px] tracking-[0.3em] uppercase text-[#b89a72] mb-3 font-inter">
                Collection
              </p>
              <h2
                className="text-[2.2rem] md:text-[3rem] font-light leading-tight text-[#1e1e1e]"
                style={{ fontFamily: "var(--font-cormorant)", letterSpacing: "0.01em" }}
              >
                shop statement earrings
              </h2>
              <p className="mt-3 text-[13px] text-[#7a7570] max-w-md leading-relaxed font-inter font-light">
                From cascading pearls to sculptural studs — each piece is finished
                in precious metals and crafted to last a lifetime.
              </p>
            </div>
            <a
              href="/earrings-1"
              className="mt-6 md:mt-0 self-start md:self-auto px-8 py-3 border border-[#1e1e1e] text-[11px] tracking-[0.2em] uppercase font-inter hover:bg-[#1e1e1e] hover:text-white transition-all duration-300"
            >
              Shop Now
            </a>
          </div>

          <div ref={earringsRef} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 md:gap-7">
            {earrings.map((e, i) => (
              <ProductCard key={i} {...e} delay={i * 80} visible={earringsVisible} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Veils ── */}
      <section id="veils" className="py-20 md:py-32 px-6 md:px-12 lg:px-20 bg-[#f0ece6]">
        <div className="max-w-screen-xl mx-auto">
          <div
            ref={veilsRef}
            className={`grid grid-cols-1 md:grid-cols-2 gap-12 items-center transition-all duration-1000 ${
              veilsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {/* Text */}
            <div>
              <p className="text-[10px] tracking-[0.3em] uppercase text-[#b89a72] mb-3 font-inter">
                Handmade in Britain
              </p>
              <h2
                className="text-[2.2rem] md:text-[3rem] font-light leading-tight text-[#1e1e1e] mb-6"
                style={{ fontFamily: "var(--font-cormorant)", letterSpacing: "0.01em" }}
              >
                shop veils
              </h2>
              <p className="text-[14px] text-[#7a7570] leading-relaxed mb-4 font-inter font-light">
                Ranging from minimal to intricately embellished, our veils are
                handmade to order in our British studio. Choose from soft ivory,
                blush, and champagne tones to complement your gown.
              </p>
              <p className="text-[14px] text-[#7a7570] leading-relaxed mb-10 font-inter font-light">
                Each veil is crafted with fine tulle and finished with meticulous
                hand-stitching — a timeless piece to carry down the aisle.
              </p>
              <a
                href="/veils"
                className="inline-block px-8 py-3 bg-[#111] text-white text-[11px] tracking-[0.2em] uppercase font-inter hover:bg-[#b89a72] transition-all duration-300"
              >
                Shop Now
              </a>
            </div>

            {/* Placeholder image */}
            <div className="relative aspect-[4/5] bg-[#ddd5c8] overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-[11px] tracking-[0.2em] uppercase opacity-25 font-inter text-[#555]">
                  Veil Collection
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
