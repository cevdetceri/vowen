"use client";

const veils = [
  { id: "1", name: "Arlo Wedding Veil", variant: "Cathedral Length", price: "from £375.00", bg: "#f5f0ea" },
  { id: "2", name: "Gigi Mantilla Veil", variant: "Lace Edge", price: "from £255.00", bg: "#ede7df" },
  { id: "3", name: "Emily Two-Tier Wedding Veil", variant: "Raw Cut Edge", price: "from £445.00", bg: "#e8e2da" },
  { id: "4", name: "Olivia Pearl Two-Tier", variant: "Pearl Edge", price: "from £345.00", bg: "#f0ece6" },
  { id: "5", name: "Sofia Wedding Veil", variant: "Classic", price: "from £125.00", bg: "#ede7df" },
  { id: "6", name: "Millie Short Wedding Veil", variant: "Blusher", price: "£155.00", bg: "#f5f0ea" },
  { id: "7", name: "Sofia Two-Tier Wedding Veil", variant: "Classic Layered", price: "from £185.00", bg: "#e8e2da" },
  { id: "8", name: "Wren Two-Tier Wedding Veil", variant: "Soft Tulle", price: "from £175.00", bg: "#ede7df" },
  { id: "9", name: "Gigi Wedding Veil", variant: "Lace Edge", price: "from £225.00", bg: "#f0ece6" },
  { id: "10", name: "Harriet Wedding Veil", variant: "Classic", price: "from £175.00", bg: "#f5f0ea" },
  { id: "11", name: "Olivia Pearl Wedding Veil", variant: "Pearl Drop", price: "from £295.00", bg: "#ede7df" },
  { id: "12", name: "Pippa Wedding Veil", variant: "Appliqué", price: "from £275.00", bg: "#e8e2da" },
  { id: "13", name: "Daisy Wedding Veil", variant: "Appliqué Daisy", price: "from £325.00", bg: "#f0ece6" },
  { id: "14", name: "Otillie Beaded Wedding Veil", variant: "Beaded Edge", price: "from £245.00", bg: "#f5f0ea" },
  { id: "15", name: "Florence Wedding Veil", variant: "Wildflower", price: "from £345.00", bg: "#ede7df" },
  { id: "16", name: "Claremont Wedding Veil", variant: "Cathedral", price: "from £375.00", bg: "#e8e2da" },
];

const sorts = ["Featured", "Price: Low to High", "Price: High to Low"];

export default function VeilsGrid() {
  return (
    <div className="bg-[#f0ece6] min-h-screen">
      {/* Header */}
      <div className="px-6 md:px-12 lg:px-20 pt-14 pb-8 border-b border-[#ddd5c8]">
        <p className="text-[10px] tracking-[0.3em] uppercase text-[#b89a72] mb-2 font-inter">Handmade in Britain</p>
        <h1
          className="text-[2.4rem] md:text-[3.2rem] font-light text-[#1e1e1e] leading-tight"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          Wedding Veils
        </h1>
        <p className="mt-2 text-[13px] text-[#7a7570] font-inter font-light max-w-xl">
          From minimal and understated to intricately embellished — each veil is handmade to order in our British studio.
        </p>
      </div>

      {/* Grid */}
      <div className="px-6 md:px-12 lg:px-20 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-8">
          {veils.map((item) => (
            <div key={item.id} className="group cursor-pointer">
              <div
                className="relative aspect-[3/4] mb-4 overflow-hidden"
                style={{ backgroundColor: item.bg }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-[10px] tracking-[0.15em] uppercase opacity-25 font-inter text-[#555] text-center px-3">{item.name}</span>
                </div>
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
