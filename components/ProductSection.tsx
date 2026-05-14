"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";

interface EtsyProduct {
  id: number;
  title: string;
  description: string;
  price: string;
  url: string;
  thumbnail: string;
  images: string[];
  videos: string[];
  category: string;
}

const FALLBACK_EARRINGS = [
  { name: "VOWEN", variant: "Bridal Collection", price: "—", img: "https://i.etsystatic.com/65843420/r/il/114e3e/8032919737/il_fullxfull.8032919737_epvh.jpg", bg: "#e8e0d4", href: "/earrings-1" },
  { name: "VOWEN", variant: "Bridal Collection", price: "—", img: "https://i.etsystatic.com/65843420/r/il/6da6f5/7982843862/il_fullxfull.7982843862_gsba.jpg", bg: "#ddd5c8", href: "/earrings-1" },
  { name: "VOWEN", variant: "Bridal Collection", price: "—", img: "https://i.etsystatic.com/65843420/r/il/a65866/8030815681/il_fullxfull.8030815681_6hcl.jpg", bg: "#e4e4e4", href: "/earrings-1" },
  { name: "VOWEN", variant: "Bridal Collection", price: "—", img: "https://i.etsystatic.com/65843420/r/il/7d5f4c/8030684221/il_fullxfull.8030684221_n8pc.jpg", bg: "#dde0e4", href: "/earrings-1" },
  { name: "VOWEN", variant: "Bridal Collection", price: "—", img: "https://i.etsystatic.com/65843420/r/il/927005/8035338565/il_fullxfull.8035338565_4zsx.jpg", bg: "#e8dfd0", href: "/earrings-1" },
  { name: "VOWEN", variant: "Bridal Collection", price: "—", img: "https://i.etsystatic.com/65843420/r/il/0fd0c0/8032940881/il_fullxfull.8032940881_een4.jpg", bg: "#ece6de", href: "/earrings-1" },
  { name: "VOWEN", variant: "Bridal Collection", price: "—", img: "https://i.etsystatic.com/65843420/r/il/114e3e/8032919737/il_fullxfull.8032919737_epvh.jpg", bg: "#e8e0d4", href: "/earrings-1" },
  { name: "VOWEN", variant: "Bridal Collection", price: "—", img: "https://i.etsystatic.com/65843420/r/il/6da6f5/7982843862/il_fullxfull.7982843862_gsba.jpg", bg: "#ddd5c8", href: "/earrings-1" },
];

const FALLBACK_VEILS = [
  { name: "VOWEN", price: "—", desc: "Handmade bridal veil — crafted to order in fine tulle with a timeless silhouette.", img: "https://i.etsystatic.com/65843420/r/il/306e0b/7984953242/il_fullxfull.7984953242_698t.jpg", bg: "#f5f0ea", href: "/veils" },
  { name: "VOWEN", price: "—", desc: "A delicate layered veil with raw cut edge. Our most popular style, made to order.", img: "https://i.etsystatic.com/65843420/r/il/df9790/8036499517/il_fullxfull.8036499517_ncji.jpg", bg: "#ede7df", href: "/veils" },
  { name: "VOWEN", price: "—", desc: "Pearl-embellished veil with hand-stitched clusters along the edge.", img: "https://i.etsystatic.com/65843420/r/il/86a944/7984988548/il_fullxfull.7984988548_drzf.jpg", bg: "#e8e0d6", href: "/veils" },
];

const CARD_BGS = ["#e8e0d4", "#ddd5c8", "#e4e4e4", "#dde0e4", "#e8dfd0", "#ece6de"];
const CARD_W = 220;
const CARD_GAP = 20;

function VideoCard({ videoSrc, posterSrc }: { videoSrc: string; posterSrc: string }) {
  const [hasVideo, setHasVideo] = useState(true);

  return (
    <div
      className="shrink-0 sticky left-0 z-10"
      style={{ width: CARD_W, background: "#faf8f5", paddingRight: CARD_GAP / 2 }}
    >
      <div className="relative overflow-hidden" style={{ width: CARD_W, aspectRatio: "3/4" }}>
        {hasVideo ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            poster={posterSrc}
            className="w-full h-full object-cover"
            onError={() => setHasVideo(false)}
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        ) : (
          <Image src={posterSrc} alt="VOWEN" fill className="object-cover" sizes="220px" />
        )}
        {/* Video badge */}
        <div className="absolute top-3 left-3 bg-[#111]/70 text-white text-[9px] tracking-[0.2em] uppercase px-2 py-1 font-inter backdrop-blur-sm">
          Video
        </div>
      </div>
      <h3 className="text-[15px] font-light text-[#1e1e1e] mt-4" style={{ fontFamily: "var(--font-cormorant)", letterSpacing: "0.03em" }}>VOWEN</h3>
      <p className="text-[11px] tracking-[0.12em] text-[#7a7570] uppercase font-inter mt-0.5">Bridal Collection</p>
    </div>
  );
}

function ProductCard({ name, variant, price, img, bg, href, delay, visible }: {
  name: string; variant: string; price: string; img: string;
  bg: string; href: string; delay: number; visible: boolean;
}) {
  return (
    <a
      href={href}
      className={`shrink-0 group cursor-pointer transition-all duration-700 ease-out block ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
      style={{ width: CARD_W, transitionDelay: `${delay}ms`, scrollSnapAlign: "start" }}
    >
      <div className="relative overflow-hidden" style={{ width: CARD_W, aspectRatio: "3/4", backgroundColor: bg }}>
        {img ? (
          <Image src={img} alt={name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="220px" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[11px] tracking-[0.2em] uppercase opacity-30 font-inter text-center px-2" style={{ color: "#555" }}>{name}</span>
          </div>
        )}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/8 transition-all duration-500" />
        <div className="absolute bottom-0 left-0 right-0 py-3 bg-[#111] text-white text-[10px] tracking-[0.2em] uppercase font-inter text-center translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          View
        </div>
      </div>
      <h3 className="text-[15px] font-light text-[#1e1e1e] mt-4" style={{ fontFamily: "var(--font-cormorant)", letterSpacing: "0.03em" }}>{name}</h3>
      <p className="text-[11px] tracking-[0.12em] text-[#7a7570] uppercase font-inter mt-0.5">{variant}</p>
      <p className="text-[14px] text-[#1e1e1e] mt-1 font-inter">{price}</p>
    </a>
  );
}

function VeilCard({ name, price, desc, img, bg, href, delay, visible }: {
  name: string; price: string; desc: string; img: string;
  bg: string; href: string; delay: number; visible: boolean;
}) {
  return (
    <a href={href}
      className={`group cursor-pointer block transition-all duration-700 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
      style={{ transitionDelay: `${delay}ms` }}>
      <div className="relative aspect-[3/4] mb-5 overflow-hidden" style={{ backgroundColor: bg }}>
        {img ? (
          <Image src={img} alt={name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="(max-width: 768px) 100vw, 33vw" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[11px] tracking-[0.2em] uppercase opacity-25 font-inter text-[#555] text-center px-4">{name}</span>
          </div>
        )}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-500" />
      </div>
      <h3 className="text-[20px] md:text-[22px] font-light text-[#1e1e1e] mb-2" style={{ fontFamily: "var(--font-cormorant)", letterSpacing: "0.02em" }}>{name}</h3>
      <p className="text-[13px] text-[#7a7570] leading-relaxed font-inter font-light mb-3">{desc}</p>
      <p className="text-[14px] text-[#1e1e1e] font-inter">{price}</p>
    </a>
  );
}

export default function ProductSection() {
  const earringsRef = useRef<HTMLDivElement>(null);
  const veilsRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [earringsVisible, setEarringsVisible] = useState(false);
  const [veilsVisible, setVeilsVisible] = useState(false);
  const [videoSrc, setVideoSrc] = useState("/product-video.mp4");

  const [earrings, setEarrings] = useState(FALLBACK_EARRINGS);
  const [veils, setVeils] = useState(FALLBACK_VEILS);

  useEffect(() => {
    fetch("/etsy-products.json")
      .then((r) => r.ok ? r.json() : null)
      .then((data) => {
        if (!data) return;
        if (data.earrings?.length > 0) {
          const cards = data.earrings.slice(0, 8).map((p: EtsyProduct, i: number) => ({
            name: p.title,
            variant: "Bridal Collection",
            price: p.price,
            img: p.thumbnail,
            bg: CARD_BGS[i % CARD_BGS.length],
            href: "/earrings-1",
          }));
          setEarrings(cards);
          // Use first video if available
          const firstVideo = data.earrings.find((p: EtsyProduct) => p.videos?.length > 0)?.videos[0];
          if (firstVideo) setVideoSrc(firstVideo);
        }
        if (data.veils?.length > 0) {
          setVeils(
            data.veils.slice(0, 3).map((p: EtsyProduct) => ({
              name: p.title,
              price: p.price,
              desc: p.description || "Handmade bridal veil — crafted to order in fine tulle.",
              img: p.thumbnail,
              bg: "#f5f0ea",
              href: "/veils",
            }))
          );
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.target === earringsRef.current && e.isIntersecting) setEarringsVisible(true);
        if (e.target === veilsRef.current && e.isIntersecting) setVeilsVisible(true);
      });
    }, { threshold: 0.1 });
    if (earringsRef.current) obs.observe(earringsRef.current);
    if (veilsRef.current) obs.observe(veilsRef.current);
    return () => obs.disconnect();
  }, []);

  // Scroll arrows
  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir === "left" ? -(CARD_W + CARD_GAP) * 2 : (CARD_W + CARD_GAP) * 2, behavior: "smooth" });
  };

  const posterSrc = earrings[0]?.img || "https://i.etsystatic.com/65843420/r/il/114e3e/8032919737/il_fullxfull.8032919737_epvh.jpg";

  return (
    <>
      {/* Earrings — horizontal scroll */}
      <section id="shop" className="py-20 md:py-28 bg-[#faf8f5]">
        <div className="max-w-screen-xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10 px-6 md:px-12 lg:px-20">
            <div>
              <p className="text-[10px] tracking-[0.3em] uppercase text-[#b89a72] mb-3 font-inter">Collection</p>
              <h2 className="text-[2.2rem] md:text-[3rem] font-light leading-tight text-[#1e1e1e]" style={{ fontFamily: "var(--font-cormorant)", letterSpacing: "0.01em" }}>
                shop statement earrings
              </h2>
              <p className="mt-3 text-[13px] text-[#7a7570] max-w-md leading-relaxed font-inter font-light">
                From cascading freshwater pearls to sculptural studs — each piece is finished in precious metals and crafted to last a lifetime.
              </p>
            </div>
            <div className="flex items-center gap-4 mt-6 md:mt-0">
              {/* Scroll arrows */}
              <div className="flex gap-2">
                <button onClick={() => scroll("left")}
                  className="w-10 h-10 border border-[#1e1e1e]/30 flex items-center justify-center hover:border-[#1e1e1e] transition-colors"
                  aria-label="Scroll left">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 3L5 8L10 13" stroke="#1e1e1e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
                <button onClick={() => scroll("right")}
                  className="w-10 h-10 border border-[#1e1e1e]/30 flex items-center justify-center hover:border-[#1e1e1e] transition-colors"
                  aria-label="Scroll right">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 3L11 8L6 13" stroke="#1e1e1e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
              </div>
              <a href="/earrings-1"
                className="px-8 py-3 border border-[#1e1e1e] text-[11px] tracking-[0.2em] uppercase font-inter hover:bg-[#1e1e1e] hover:text-white transition-all duration-300">
                Shop All
              </a>
            </div>
          </div>

          {/* Scroll track */}
          <div ref={earringsRef} className="relative">
            <div
              ref={scrollRef}
              className="flex overflow-x-auto pb-8"
              style={{
                gap: CARD_GAP,
                scrollSnapType: "x mandatory",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                paddingLeft: "clamp(24px, 5vw, 80px)",
                paddingRight: "clamp(24px, 5vw, 80px)",
              }}
            >
              {/* Sticky video card — stays fixed while rest scrolls */}
              <VideoCard videoSrc={videoSrc} posterSrc={posterSrc} />

              {/* Product cards */}
              {earrings.map((e, i) => (
                <ProductCard key={i} {...e} delay={i * 60} visible={earringsVisible} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Banner */}
      <section className="py-16 px-6 md:px-12 lg:px-20 bg-[#1e1e1e] text-white text-center">
        <p className="text-[10px] tracking-[0.35em] uppercase text-[#b89a72] mb-4 font-inter">Handcrafted</p>
        <h2 className="text-[2rem] md:text-[3.2rem] font-light leading-tight mb-6" style={{ fontFamily: "var(--font-cormorant)", letterSpacing: "0.02em" }}>
          the precious metals collection
        </h2>
        <p className="text-[13px] text-gray-400 max-w-xl mx-auto leading-relaxed font-inter font-light mb-8">
          Every piece is hand-finished in 18ct gold or sterling silver — designed to be worn on your wedding day and treasured forever.
        </p>
        <a href="/shop"
          className="inline-block px-10 py-3.5 border border-white/40 text-white text-[11px] tracking-[0.2em] uppercase font-inter hover:border-[#b89a72] hover:text-[#b89a72] transition-all duration-300">
          Explore the Collection
        </a>
      </section>

      {/* Veils */}
      <section id="veils" className="py-20 md:py-32 px-6 md:px-12 lg:px-20 bg-[#f0ece6]">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-14">
            <div>
              <p className="text-[10px] tracking-[0.3em] uppercase text-[#b89a72] mb-3 font-inter">Handmade</p>
              <h2 className="text-[2.2rem] md:text-[3rem] font-light leading-tight text-[#1e1e1e]" style={{ fontFamily: "var(--font-cormorant)", letterSpacing: "0.01em" }}>
                shop veils
              </h2>
              <p className="mt-3 text-[13px] text-[#7a7570] max-w-md leading-relaxed font-inter font-light">
                From minimal and understated to intricately embellished — handmade to order in our studio.
              </p>
            </div>
            <a href="/veils"
              className="mt-6 md:mt-0 self-start md:self-auto px-8 py-3 border border-[#1e1e1e] text-[11px] tracking-[0.2em] uppercase font-inter hover:bg-[#1e1e1e] hover:text-white transition-all duration-300">
              Shop All Veils
            </a>
          </div>
          <div ref={veilsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            {veils.map((v, i) => <VeilCard key={i} {...v} delay={i * 100} visible={veilsVisible} />)}
          </div>
        </div>
      </section>
    </>
  );
}
