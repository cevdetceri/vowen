import Link from "next/link";
import { Instagram, Facebook } from "lucide-react";

const footerLinks = [
  { label: "Care Guide", href: "#" },
  { label: "Gift Card", href: "#" },
  { label: "Stockists", href: "#" },
  { label: "Delivery", href: "#" },
  { label: "Returns Policy", href: "#" },
  { label: "Clearpay", href: "#" },
];

export default function Footer() {
  return (
    <footer id="contact" className="bg-[#111111] text-white pt-16 pb-10 px-6 md:px-12 lg:px-20">
      <div className="max-w-screen-xl mx-auto">
        {/* Top */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-12 border-b border-white/10">
          {/* Logo + tagline */}
          <div>
            <Link
              href="/"
              className="font-light tracking-[0.35em] uppercase text-[22px] hover:text-[#b89a72] transition-colors"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              GAMZE
            </Link>
            <p className="mt-4 text-[12px] text-gray-500 leading-relaxed font-inter font-light max-w-xs">
              Luxury bridal accessories, handcrafted in the finest materials
              using artisan techniques.
            </p>
            <div className="flex items-center gap-4 mt-6">
              <a
                href="https://instagram.com/gamzestudio"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-gray-500 hover:text-[#b89a72] transition-colors"
              >
                <Instagram className="w-[18px] h-[18px]" />
              </a>
              <a
                href="https://facebook.com/gamzestudio"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-gray-500 hover:text-[#b89a72] transition-colors"
              >
                <Facebook className="w-[18px] h-[18px]" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <p className="text-[10px] tracking-[0.25em] uppercase text-gray-500 mb-5 font-inter">
              Information
            </p>
            <ul className="flex flex-col gap-3">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-[12px] tracking-[0.1em] text-gray-400 hover:text-white transition-colors font-inter"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-[10px] tracking-[0.25em] uppercase text-gray-500 mb-5 font-inter">
              Get in touch
            </p>
            <a
              href="mailto:hello@gamzestudio.com"
              className="text-[13px] text-gray-400 hover:text-white transition-colors font-inter"
            >
              hello@gamzestudio.com
            </a>
            <p className="mt-4 text-[12px] text-gray-600 leading-relaxed font-inter">
              For bespoke enquiries, appointments and general questions — we
              typically respond within 24 hours.
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8">
          <p className="text-[11px] text-gray-600 font-inter tracking-[0.05em]">
            © {new Date().getFullYear()} GAMZE Studio. All rights reserved.
          </p>
          <p className="text-[11px] text-gray-700 font-inter">
            Luxury bridal accessories for modern brides
          </p>
        </div>
      </div>
    </footer>
  );
}
