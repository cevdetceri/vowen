"use client";

import { useRef, useEffect, useState } from "react";
import { Instagram } from "lucide-react";

const posts = [
  { bg: "#e8e0d4", label: "Gold Studs" },
  { bg: "#ddd5c8", label: "Pearl Drop" },
  { bg: "#e4e4e4", label: "Veil Detail" },
  { bg: "#dde0e4", label: "Hairvine" },
  { bg: "#e8dfd0", label: "Bridal Bag" },
  { bg: "#e0ddd8", label: "Neckscarf" },
];

export default function InstagramSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="py-20 md:py-28 px-6 md:px-12 lg:px-20 bg-[#faf8f5]">
      <div className="max-w-screen-xl mx-auto">
        <div className="flex items-center justify-center gap-3 mb-12">
          <Instagram className="w-5 h-5 text-[#b89a72]" />
          <p className="text-[12px] tracking-[0.25em] uppercase text-[#1e1e1e] font-inter">
            Follow us on Instagram{" "}
            <a
              href="https://instagram.com/vowenstudio"
              className="text-[#b89a72] hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              @vowenstudio
            </a>
          </p>
        </div>

        <div
          ref={ref}
          className="grid grid-cols-3 md:grid-cols-6 gap-1.5"
        >
          {posts.map((post, i) => (
            <div
              key={i}
              className={`relative aspect-square overflow-hidden cursor-pointer group transition-all duration-700 ease-out ${
                visible ? "opacity-100 scale-100" : "opacity-0 scale-95"
              }`}
              style={{
                backgroundColor: post.bg,
                transitionDelay: `${i * 60}ms`,
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-[9px] tracking-[0.15em] uppercase opacity-25 font-inter text-[#333]">
                  {post.label}
                </span>
              </div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                <Instagram className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
