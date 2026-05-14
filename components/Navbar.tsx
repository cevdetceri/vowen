"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronDown, Download, Menu, X } from "lucide-react";

function CevoMark({ size = 26 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
      <path d="M6 4L24 14L6 24V18.5L18 14L6 9.5V4Z" fill="currentColor" />
    </svg>
  );
}

const navLinks = [
  { label: "Product", href: "#features", hasDropdown: false },
  { label: "Use Cases", href: "#try-cevo", hasDropdown: true },
  { label: "Pricing", href: "#pricing", hasDropdown: false },
  { label: "Blog", href: "#blog", hasDropdown: false },
  { label: "Resources", href: "#resources", hasDropdown: true },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Mobil menü açıkken scroll kilit
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-8 py-4 transition-all duration-300 ${
          scrolled || mobileOpen
            ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100/80"
            : "bg-transparent"
        }`}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 text-[#0d0d0d] hover:opacity-80 transition-opacity">
          <CevoMark />
          <span className="font-display font-semibold text-[17px] tracking-tight">
            CEVO
          </span>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="flex items-center gap-1 text-[13.5px] text-gray-600 hover:text-black transition-colors font-sans"
            >
              {link.label}
              {link.hasDropdown && (
                <ChevronDown className="h-3.5 w-3.5 opacity-50" />
              )}
            </a>
          ))}
        </div>

        {/* Sağ: Desktop CTA + Mobil hamburger */}
        <div className="flex items-center gap-3">
          <a
            href="#try-cevo"
            className="flex items-center gap-2 bg-[#0d0d0d] text-white text-[13px] font-medium px-5 py-2.5 rounded-full hover:bg-[#222] transition-all active:scale-95"
          >
            <Download className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Download</span>
          </a>

          {/* Hamburger — sadece mobilde */}
          <button
            onClick={() => setMobileOpen((o) => !o)}
            aria-label={mobileOpen ? "Menüyü kapat" : "Menüyü aç"}
            className="md:hidden flex items-center justify-center w-9 h-9 rounded-full hover:bg-gray-100 transition-colors text-[#0d0d0d]"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobil menü paneli */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
          mobileOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-300 ${
            mobileOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setMobileOpen(false)}
        />

        {/* Panel */}
        <div
          className={`absolute top-[65px] left-0 right-0 bg-white border-b border-gray-100 shadow-lg transition-all duration-300 ${
            mobileOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3"
          }`}
        >
          <div className="px-6 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-between py-3.5 border-b border-gray-50 last:border-0 text-[15px] text-gray-700 hover:text-black font-sans transition-colors"
              >
                <span>{link.label}</span>
                {link.hasDropdown && (
                  <ChevronDown className="h-4 w-4 opacity-40" />
                )}
              </a>
            ))}

            <a
              href="#try-cevo"
              onClick={() => setMobileOpen(false)}
              className="mt-3 flex items-center justify-center gap-2 bg-[#0d0d0d] text-white text-[14px] font-medium px-6 py-3.5 rounded-full hover:bg-[#222] transition-all active:scale-95"
            >
              <Download className="h-4 w-4" />
              Download for Windows
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
