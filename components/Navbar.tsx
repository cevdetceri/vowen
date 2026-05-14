"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingBag, Search, Menu, X, ChevronDown } from "lucide-react";

const shopCategories = [
  "Earrings",
  "Veils",
  "Neck Scarves & Bows",
  "Headbands",
  "Hairvines",
  "Haircombs",
  "Hairpins",
  "The Bridal Bag",
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#111111] text-white">
        {/* Top bar */}
        <div className="flex items-center justify-between px-6 md:px-10 h-[60px]">
          {/* Left: hamburger (mobile) + shop dropdown (desktop) */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => setMobileOpen((o) => !o)}
              className="md:hidden p-1"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-7">
              <div className="relative group">
                <button
                  className="flex items-center gap-1 text-[12px] tracking-[0.18em] uppercase font-inter hover:text-[#b89a72] transition-colors"
                  onMouseEnter={() => setShopOpen(true)}
                  onMouseLeave={() => setShopOpen(false)}
                >
                  Shop <ChevronDown className="w-3 h-3" />
                </button>
                {shopOpen && (
                  <div
                    className="absolute top-full left-0 pt-4"
                    onMouseEnter={() => setShopOpen(true)}
                    onMouseLeave={() => setShopOpen(false)}
                  >
                    <div className="bg-[#111] border border-white/10 min-w-[200px] py-3">
                      {shopCategories.map((cat) => (
                        <a
                          key={cat}
                          href="#shop"
                          className="block px-5 py-2 text-[11px] tracking-[0.15em] uppercase text-gray-300 hover:text-white hover:bg-white/5 transition-colors font-inter"
                        >
                          {cat}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              {["Appointments", "Bespoke", "Rental"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-[12px] tracking-[0.18em] uppercase font-inter hover:text-[#b89a72] transition-colors"
                >
                  {item}
                </a>
              ))}
              <a
                href="#contact"
                className="text-[12px] tracking-[0.18em] uppercase font-inter hover:text-[#b89a72] transition-colors"
              >
                Contact Us
              </a>
            </div>
          </div>

          {/* Centre: logo */}
          <Link
            href="/"
            className="absolute left-1/2 -translate-x-1/2 font-cormorant text-[22px] md:text-[26px] font-light tracking-[0.35em] uppercase hover:text-[#b89a72] transition-colors"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            GAMZE
          </Link>

          {/* Right: search + bag */}
          <div className="flex items-center gap-4">
            <button aria-label="Search" className="hover:text-[#b89a72] transition-colors">
              <Search className="w-[18px] h-[18px]" />
            </button>
            <button aria-label="Shopping bag" className="hover:text-[#b89a72] transition-colors">
              <ShoppingBag className="w-[18px] h-[18px]" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
          mobileOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <div
          className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
            mobileOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setMobileOpen(false)}
        />
        <div
          className={`absolute top-[60px] left-0 right-0 bg-[#111] border-t border-white/10 transition-all duration-300 ${
            mobileOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
          }`}
        >
          <div className="px-6 py-6 flex flex-col gap-1">
            <p className="text-[10px] tracking-[0.25em] uppercase text-gray-500 mb-2 font-inter">Shop</p>
            {shopCategories.map((cat) => (
              <a
                key={cat}
                href="#shop"
                onClick={() => setMobileOpen(false)}
                className="py-2.5 text-[13px] tracking-[0.12em] uppercase text-gray-300 hover:text-white font-inter border-b border-white/5"
              >
                {cat}
              </a>
            ))}
            <div className="mt-4 flex flex-col gap-1">
              {["Appointments", "Bespoke", "Rental", "Contact Us"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(" ", "-")}`}
                  onClick={() => setMobileOpen(false)}
                  className="py-2.5 text-[13px] tracking-[0.12em] uppercase text-white hover:text-[#b89a72] font-inter"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
