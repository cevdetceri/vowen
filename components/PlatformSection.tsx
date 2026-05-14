"use client";

import { useRef, useEffect, useState } from "react";
import ScrollingIconBar from "./ScrollingIconBar";

export default function PlatformSection() {
  const ref = useRef<HTMLParagraphElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.25 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative z-10">
      <ScrollingIconBar />

      <div className="px-8 md:px-16 lg:px-24 py-28 max-w-screen-xl mx-auto">
        <p
          ref={ref}
          className={`font-display font-extrabold text-[#0d0d0d] leading-[1.04] tracking-tight max-w-5xl transition-all duration-1000 ease-out ${
            visible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
          style={{ fontSize: "clamp(1.9rem, 4.5vw, 4rem)" }}
        >
          CEVO is our agentic development platform, allowing anyone to build in
          the agent-first era.
        </p>
      </div>
    </section>
  );
}
