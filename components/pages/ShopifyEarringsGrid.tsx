"use client";

import { useState } from "react";
import Image from "next/image";
import { ShopifyProduct, formatPrice, getFirstImage } from "@/lib/shopify";
import { useCart } from "@/context/CartContext";

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
          <div className="text-center py-20">
            <p className="text-[14px] text-[#7a7570] font-inter font-light">
              Ürünler yükleniyor... Shopify token'ınızı ekleyin.
            </p>
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
