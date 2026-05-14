"use client";

import { useState } from "react";
import Image from "next/image";
import { ShopifyProduct, formatPrice, getFirstImage } from "@/lib/shopify";
import { useCart } from "@/context/CartContext";

const FALLBACK_EARRINGS = [
  { title: "Bridal Pearl Earrings", img: "https://i.etsystatic.com/65843420/r/il/114e3e/8032919737/il_fullxfull.8032919737_epvh.jpg", bg: "#e8e0d4" },
  { title: "Sculptural Gold Earrings", img: "https://i.etsystatic.com/65843420/r/il/6da6f5/7982843862/il_fullxfull.7982843862_gsba.jpg", bg: "#ddd5c8" },
  { title: "Crystal Drop Earrings", img: "https://i.etsystatic.com/65843420/r/il/a65866/8030815681/il_fullxfull.8030815681_6hcl.jpg", bg: "#e4e4e4" },
  { title: "Pearl Cluster Earrings", img: "https://i.etsystatic.com/65843420/r/il/7d5f4c/8030684221/il_fullxfull.8030684221_n8pc.jpg", bg: "#dde0e4" },
  { title: "Statement Bridal Earrings", img: "https://i.etsystatic.com/65843420/r/il/927005/8035338565/il_fullxfull.8035338565_4zsx.jpg", bg: "#e8dfd0" },
  { title: "Delicate Drop Earrings", img: "https://i.etsystatic.com/65843420/r/il/0fd0c0/8032940881/il_fullxfull.8032940881_een4.jpg", bg: "#ece6de" },
  { title: "Pearl Hoop Earrings", img: "https://i.etsystatic.com/65843420/r/il/114e3e/8032919737/il_fullxfull.8032919737_epvh.jpg", bg: "#e8e0d4" },
  { title: "Vintage Style Earrings", img: "https://i.etsystatic.com/65843420/r/il/6da6f5/7982843862/il_fullxfull.7982843862_gsba.jpg", bg: "#ddd5c8" },
];

const sorts = ["Featured", "Price: Low to High", "Price: High to Low"];

export default function ShopifyEarringsGrid({ products }: { products: ShopifyProduct[] }) {
  const [sort, setSort] = useState("Featured");
  const { addToCart, loading } = useCart();

  const sorted = [...products].sort((a, b) => {
    const pa = parseFloat(a.priceRange.minVariantPrice.amount);
    const pb = parseFloat(b.priceRange.minVariantPrice.amount);
    if (sort === "Price: Low to High") return pa - pb;
    if (sort === "Price: High to Low") return pb - pa;
    return 0;
  });

  const handleAddToCart = async (product: ShopifyProduct) => {
    const firstVariant = product.variants.edges[0]?.node;
    if (!firstVariant) return;
    await addToCart(firstVariant.id);
  };

  return (
    <div className="bg-[#faf8f5] min-h-screen">
      {/* Header */}
      <div className="px-6 md:px-12 lg:px-20 pt-14 pb-8 border-b border-[#e5e0d8]">
        <p className="text-[10px] tracking-[0.3em] uppercase text-[#b89a72] mb-2 font-inter">Collection</p>
        <h1 className="text-[2.4rem] md:text-[3.2rem] font-light text-[#1e1e1e] leading-tight"
          style={{ fontFamily: "var(--font-cormorant)" }}>
          Earrings
        </h1>
        <p className="mt-2 text-[13px] text-[#7a7570] font-inter font-light">{sorted.length} products</p>
      </div>

      {/* Sort bar */}
      <div className="sticky top-[64px] z-30 bg-[#faf8f5]/95 backdrop-blur-sm border-b border-[#e5e0d8] px-6 md:px-12 lg:px-20 py-3 flex items-center justify-end">
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
        {sorted.length === 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-7">
            {FALLBACK_EARRINGS.map((e, i) => (
              <div key={i} className="group cursor-pointer">
                <div className="relative aspect-[3/4] mb-4 overflow-hidden" style={{ background: e.bg }}>
                  <Image
                    src={e.img}
                    alt={e.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
                <h3 className="text-[15px] font-light text-[#1e1e1e]" style={{ fontFamily: "var(--font-cormorant)" }}>
                  {e.title}
                </h3>
                <p className="text-[14px] text-[#1e1e1e] mt-1 font-inter">—</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-7">
            {sorted.map((product) => {
              const img = getFirstImage(product);
              const price = product.priceRange.minVariantPrice;
              return (
                <div key={product.id} className="group cursor-pointer">
                  <div className="relative aspect-[3/4] mb-4 overflow-hidden bg-[#e8e0d4]">
                    {img ? (
                      <Image
                        src={img.url}
                        alt={img.altText ?? product.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-[10px] tracking-[0.15em] uppercase opacity-25 font-inter text-[#555] text-center px-3">{product.title}</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/8 transition-all duration-500" />
                    <button
                      onClick={() => handleAddToCart(product)}
                      disabled={loading}
                      className="absolute bottom-0 left-0 right-0 py-3 bg-[#111] text-white text-[10px] tracking-[0.2em] uppercase font-inter text-center translate-y-full group-hover:translate-y-0 transition-transform duration-300 disabled:opacity-60"
                    >
                      Sepete Ekle
                    </button>
                  </div>
                  <h3 className="text-[15px] font-light text-[#1e1e1e]" style={{ fontFamily: "var(--font-cormorant)" }}>
                    {product.title}
                  </h3>
                  <p className="text-[14px] text-[#1e1e1e] mt-1 font-inter">
                    {formatPrice(price.amount, price.currencyCode)}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
