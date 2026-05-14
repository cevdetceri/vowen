import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata = { title: "Shop — VOWEN Studio" };

const categories = [
  { label: "Earrings", href: "/earrings-1", desc: "Statement studs, drops and hoops in 18ct gold and sterling silver.", bg: "#e8e0d4" },
  { label: "Veils", href: "/veils", desc: "Handmade bridal veils — from minimal to intricately embellished.", bg: "#f0ece6" },
  { label: "Neck Scarves & Bows", href: "/neck-scarves-bows", desc: "Silk neck scarves and statement bows for the modern bride.", bg: "#e4e4e4" },
  { label: "Headbands", href: "/collection?category=Headbands", desc: "Delicate and bold headbands for every bridal style.", bg: "#dde0e4" },
  { label: "Hairvines", href: "/collection?category=Hairvines", desc: "Cascading hairvines crafted in fine metals and pearls.", bg: "#ece6de" },
  { label: "Hairpins", href: "/collection?category=Hairpins", desc: "Sculptural hairpins designed to be worn and treasured.", bg: "#e8dfd0" },
  { label: "The Bridal Bag", href: "/the-bridal-bag", desc: "Our curated bridal bag — everything you need on your day.", bg: "#ddd5c8" },
];

export default function ShopPage() {
  return (
    <main>
      <Navbar />
      <div className="pt-[64px] bg-[#faf8f5] min-h-screen">
        <div className="px-6 md:px-12 lg:px-20 pt-14 pb-8 border-b border-[#e5e0d8]">
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#b89a72] mb-2 font-inter">Collections</p>
          <h1 className="text-[2.4rem] md:text-[3.2rem] font-light text-[#1e1e1e]" style={{ fontFamily: "var(--font-cormorant)" }}>
            Shop
          </h1>
        </div>
        <div className="px-6 md:px-12 lg:px-20 py-12 max-w-screen-xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat) => (
              <Link key={cat.label} href={cat.href}
                className="group block border border-[#e5e0d8] bg-white hover:border-[#b89a72] transition-all duration-300">
                <div className="aspect-[4/3]" style={{ backgroundColor: cat.bg }}>
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-[11px] tracking-[0.2em] uppercase opacity-25 font-inter text-[#555]">{cat.label}</span>
                  </div>
                </div>
                <div className="p-5">
                  <h2 className="text-[1.2rem] font-light text-[#1e1e1e] mb-1" style={{ fontFamily: "var(--font-cormorant)" }}>{cat.label}</h2>
                  <p className="text-[12px] text-[#7a7570] font-inter font-light">{cat.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
