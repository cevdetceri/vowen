"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingBag, Search, Menu, X, ChevronDown } from "lucide-react";
import { useCart } from "@/context/CartContext";

const shopCategories = [
  { label: "Earrings", href: "/earrings-1" },
  { label: "Veils", href: "/veils" },
  { label: "Neck Scarves & Bows", href: "/neck-scarves-bows" },
  { label: "Headbands", href: "/collection?category=Headbands" },
  { label: "Hairvines", href: "/collection?category=Hairvines" },
  { label: "Haircombs", href: "/collection?category=Haircombs" },
  { label: "Hairpins", href: "/collection?category=Hairpins" },
  { label: "The Bridal Bag", href: "/the-bridal-bag" },
];

const mainLinks = [
  { label: "Appointments", href: "/appointments" },
  { label: "Bespoke", href: "/bespoke" },
  { label: "Rental", href: "/rental" },
  { label: "Contact Us", href: "/contact-us" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const { totalQuantity, setCartOpen } = useCart();

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#111111] text-white">
        <div className="flex items-center px-5 md:px-10 h-[64px] gap-6">

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(true)}
            className="md:hidden p-1 hover:text-[#b89a72] transition-colors shrink-0"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Logo — left */}
          <Link href="/" className="shrink-0 flex items-center">
            {!logoError ? (
              <Image
                src="/voven-transparent.png"
                alt="VOWEN"
                width={160}
                height={52}
                className="invert brightness-200 object-contain max-h-[52px]"
                onError={() => setLogoError(true)}
                priority
              />
            ) : (
              <span
                className="font-light tracking-[0.3em] uppercase text-[20px] hover:text-[#b89a72] transition-colors"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                VOWEN
              </span>
            )}
          </Link>

          {/* Desktop nav links — right of logo */}
          <div className="hidden md:flex items-center gap-7 flex-1">
            {/* Shop dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setShopOpen(true)}
              onMouseLeave={() => setShopOpen(false)}
            >
              <button className="flex items-center gap-1 text-[11px] tracking-[0.2em] uppercase font-inter hover:text-[#b89a72] transition-colors h-[64px]">
                Shop <ChevronDown className="w-3 h-3" />
              </button>
              <div
                className={`absolute top-full left-0 transition-all duration-200 ${
                  shopOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-1 pointer-events-none"
                }`}
              >
                <div className="bg-[#1a1a1a] border border-white/10 min-w-[220px] py-2 shadow-xl">
                  {shopCategories.map((cat) => (
                    <a
                      key={cat.label}
                      href={cat.href}
                      className="block px-5 py-2.5 text-[11px] tracking-[0.15em] uppercase text-gray-300 hover:text-white hover:bg-white/5 transition-colors font-inter"
                    >
                      {cat.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {mainLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[11px] tracking-[0.2em] uppercase font-inter hover:text-[#b89a72] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right: search + bag */}
          <div className="flex items-center gap-4 ml-auto">
            <a href="/search" aria-label="Search" className="hover:text-[#b89a72] transition-colors">
              <Search className="w-[17px] h-[17px]" />
            </a>
            <button
              onClick={() => setCartOpen(true)}
              aria-label="Shopping bag"
              className="relative hover:text-[#b89a72] transition-colors"
            >
              <ShoppingBag className="w-[17px] h-[17px]" />
              {totalQuantity > 0 && (
                <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-[#b89a72] text-white text-[9px] flex items-center justify-center font-inter">
                  {totalQuantity}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile full-screen drawer */}
      {/* Backdrop */}
      <div
        onClick={() => setMobileOpen(false)}
        className={`fixed inset-0 z-[60] bg-black/50 md:hidden transition-opacity duration-300 ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Drawer panel */}
      <div
        className={`fixed top-0 left-0 bottom-0 z-[70] w-[80vw] max-w-[320px] bg-[#111111] flex flex-col md:hidden transition-transform duration-300 ease-in-out ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-5 h-[64px] border-b border-white/10 shrink-0">
          <span
            className="text-white font-light tracking-[0.3em] uppercase text-[18px]"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            VOWEN
          </span>
          <button
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
            className="p-1 hover:text-[#b89a72] transition-colors text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer links */}
        <nav className="flex-1 overflow-y-auto px-5 py-6">
          <p className="text-[9px] tracking-[0.3em] uppercase text-gray-500 mb-3 font-inter">Shop</p>
          <div className="flex flex-col">
            {shopCategories.map((cat) => (
              <a
                key={cat.label}
                href={cat.href}
                onClick={() => setMobileOpen(false)}
                className="py-3 text-[12px] tracking-[0.15em] uppercase text-gray-300 hover:text-white font-inter border-b border-white/5 transition-colors"
              >
                {cat.label}
              </a>
            ))}
          </div>

          <div className="mt-6 flex flex-col">
            <p className="text-[9px] tracking-[0.3em] uppercase text-gray-500 mb-3 font-inter">Menu</p>
            {mainLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="py-3 text-[12px] tracking-[0.15em] uppercase text-white hover:text-[#b89a72] font-inter border-b border-white/5 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </nav>

        {/* Drawer footer */}
        <div className="px-5 py-5 border-t border-white/10 shrink-0">
          <a
            href="mailto:hello@vowenstudio.com"
            className="text-[11px] text-gray-500 font-inter hover:text-gray-300 transition-colors"
          >
            hello@vowenstudio.com
          </a>
        </div>
      </div>
    </>
  );
}
