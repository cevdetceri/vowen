"use client";

import { useState } from "react";
import Image from "next/image";

const allEarrings = [
  { id: "1", name: "Emma Stud Earrings", variant: "18ct Gold", price: "£165.00", bg: "#e8e0d4", img: "https://images.squarespace-cdn.com/content/v1/58e3bd26d1758ec11574dc63/9ad3c638-84ad-4724-bfdc-2ee6b64c1632/Emma+Studs+gold+plated+eden+b+studio+15.jpg" },
  { id: "2", name: "Emma Stud Earrings", variant: "Sterling Silver", price: "£165.00", bg: "#e4e4e4", img: null },
  { id: "3", name: "Ada Pearl Earrings", variant: "18ct Gold", price: "£165.00", bg: "#ddd5c8", img: null },
  { id: "4", name: "Ada Pearl Earrings", variant: "Sterling Silver", price: "£165.00", bg: "#e0ddd8", img: null },
  { id: "5", name: "Nova Drop Earrings", variant: "Bridal Collection", price: "£175.00", bg: "#dde0e4", img: null },
  { id: "6", name: "Leni Drop Earrings", variant: "Sterling Silver", price: "£125.00", bg: "#e8dfd0", img: null },
  { id: "7", name: "Lottie Studs", variant: "Bridal Collection", price: "£155.00", bg: "#ece6de", img: null },
  { id: "8", name: "Lyla Pearl Stud Earrings", variant: "18ct Gold", price: "£165.00", bg: "#e8e0d4", img: null },
  { id: "9", name: "Mini Emma Stud Earrings", variant: "Sterling Silver", price: "£125.00", bg: "#ddd5c8", img: null },
  { id: "10", name: "Etta Hoop", variant: "Bridal Collection", price: "£155.00", bg: "#e4e4e4", img: null },
  { id: "11", name: "Nora Drop Earrings", variant: "Mini", price: "£75.00", bg: "#dde0e4", img: null },
  { id: "12", name: "Teddi Drop Earrings", variant: "Statement", price: "£195.00", bg: "#e8dfd0", img: null },
  { id: "13", name: "Mia Drop Earrings", variant: "Bridal Collection", price: "£115.00", bg: "#ece6de", img: null },
  { id: "14", name: "Ada Drop Earrings", variant: "18ct Gold", price: "£135.00", bg: "#e8e0d4", img: null },
  { id: "15", name: "Kit Stud Earrings", variant: "Sterling Silver", price: "£155.00", bg: "#ddd5c8", img: null },
  { id: "16", name: "Kit Drop Earrings", variant: "18ct Gold", price: "£195.00", bg: "#e0ddd8", img: null },
  { id: "17", name: "Lola Drop Earrings", variant: "Bridal Collection", price: "£165.00", bg: "#dde0e4", img: null },
  { id: "18", name: "Nona Drop Earrings", variant: "Statement", price: "£175.00", bg: "#e8dfd0", img: null },
  { id: "19", name: "Alba Drop Earrings", variant: "Sterling Silver", price: "£125.00", bg: "#ece6de", img: null },
  { id: "20", name: "Freya Drop Earrings", variant: "18ct Gold", price: "£165.00", bg: "#e8e0d4", img: null },
  { id: "21", name: "Cecily Stud Earrings", variant: "Various", price: "from £75.00", bg: "#ddd5c8", img: null },
  { id: "22", name: "Elmley Drop Earrings", variant: "Bridal Collection", price: "£95.00", bg: "#e4e4e4", img: null },
  { id: "23", name: "Elmley Hoop Earrings", variant: "Sterling Silver", price: "£125.00", bg: "#dde0e4", img: null },
];

const filters = ["All", "Studs", "Drops", "Hoops"];
const sorts = ["Featured", "Price: Low to High", "Price: High to Low"];

export default function EarringsGrid() {
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("Featured");

  const filtered = allEarrings.filter((e) => {
    if (filter === "All") return true;
    if (filter === "Studs") return e.name.toLowerCase().includes("stud");
    if (filter === "Drops") return e.name.toLowerCase().includes("drop");
    if (filter === "Hoops") return e.name.toLowerCase().includes("hoop");
    return true;
  }).sort((a, b) => {
    const pa = parseFloat(a.price.replace(/[^0-9.]/g, ""));
    const pb = parseFloat(b.price.replace(/[^0-9.]/g, ""));
    if (sort === "Price: Low to High") return pa - pb;
    if (sort === "Price: High to Low") return pb - pa;
    return 0;
  });

  return (
    <div className="bg-[#faf8f5] min-h-screen">
      {/* Header */}
      <div className="px-6 md:px-12 lg:px-20 pt-14 pb-8 border-b border-[#e5e0d8]">
        <p className="text-[10px] tracking-[0.3em] uppercase text-[#b89a72] mb-2 font-inter">Collection</p>
        <h1
          className="text-[2.4rem] md:text-[3.2rem] font-light text-[#1e1e1e] leading-tight"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          Earrings
        </h1>
        <p className="mt-2 text-[13px] text-[#7a7570] font-inter font-light">{filtered.length} products</p>
      </div>

      {/* Filters + sort */}
      <div className="sticky top-[64px] z-30 bg-[#faf8f5]/95 backdrop-blur-sm border-b border-[#e5e0d8] px-6 md:px-12 lg:px-20 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 flex-wrap">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3.5 py-1.5 text-[11px] tracking-[0.1em] uppercase font-inter transition-all ${
                filter === f
                  ? "bg-[#1e1e1e] text-white"
                  : "border border-[#c8c0b4] text-[#7a7570] hover:border-[#1e1e1e] hover:text-[#1e1e1e]"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="text-[11px] font-inter text-[#7a7570] bg-transparent border border-[#c8c0b4] px-3 py-1.5 outline-none cursor-pointer"
        >
          {sorts.map((s) => <option key={s}>{s}</option>)}
        </select>
      </div>

      {/* Grid */}
      <div className="px-6 md:px-12 lg:px-20 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-7">
          {filtered.map((item) => (
            <div key={item.id} className="group cursor-pointer">
              <div
                className="relative aspect-[3/4] mb-4 overflow-hidden"
                style={{ backgroundColor: item.bg }}
              >
                {item.img ? (
                  <Image
                    src={item.img}
                    alt={item.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-[10px] tracking-[0.15em] uppercase opacity-25 font-inter text-[#555] text-center px-3">{item.name}</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/8 transition-all duration-500" />
                <button className="absolute bottom-0 left-0 right-0 py-3 bg-[#111] text-white text-[10px] tracking-[0.2em] uppercase font-inter text-center translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  Quick View
                </button>
              </div>
              <h3 className="text-[15px] font-light text-[#1e1e1e]" style={{ fontFamily: "var(--font-cormorant)" }}>
                {item.name}
              </h3>
              <p className="text-[11px] tracking-[0.1em] text-[#7a7570] uppercase font-inter mt-0.5">{item.variant}</p>
              <p className="text-[14px] text-[#1e1e1e] mt-1 font-inter">{item.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
