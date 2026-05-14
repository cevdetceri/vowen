"use client";

import { useRef, useEffect, useState } from "react";
import { Calendar, Sparkles, Tag } from "lucide-react";

const services = [
  {
    Icon: Calendar,
    title: "Appointments",
    id: "appointments",
    href: "/appointments",
    description:
      "Visit our studio for a private consultation. Try on pieces from our full collection and receive personalised styling advice from our team.",
    cta: "Book Appointment",
  },
  {
    Icon: Sparkles,
    title: "Bespoke",
    id: "bespoke",
    href: "/bespoke",
    description:
      "Have something unique in mind? Work with us to design a one-of-a-kind piece crafted around your vision, from sketch to finished accessory.",
    cta: "Enquire Now",
  },
  {
    Icon: Tag,
    title: "Rental",
    id: "rental",
    href: "/rental",
    description:
      "Borrow your dream accessory for your big day. Our rental service gives you access to our full collection at a fraction of the purchase price.",
    cta: "View Rental",
  },
];

export default function ServicesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="py-20 md:py-32 px-6 md:px-12 lg:px-20 bg-[#faf8f5]">
      <div className="max-w-screen-xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#b89a72] mb-3 font-inter">
            How we work
          </p>
          <h2
            className="text-[2rem] md:text-[2.8rem] font-light text-[#1e1e1e]"
            style={{ fontFamily: "var(--font-cormorant)", letterSpacing: "0.01em" }}
          >
            a studio built around you
          </h2>
        </div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-[#e5e0d8]">
          {services.map(({ Icon, title, id, href, description, cta }, i) => (
            <div
              key={title}
              id={id}
              className={`p-10 md:p-12 border-b md:border-b-0 md:border-r border-[#e5e0d8] last:border-0 transition-all duration-700 ease-out ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="w-10 h-10 flex items-center justify-center border border-[#e5e0d8] mb-8">
                <Icon className="w-4 h-4 text-[#b89a72]" />
              </div>
              <h3
                className="text-[1.5rem] font-light text-[#1e1e1e] mb-4"
                style={{ fontFamily: "var(--font-cormorant)", letterSpacing: "0.02em" }}
              >
                {title}
              </h3>
              <p className="text-[13px] text-[#7a7570] leading-relaxed mb-8 font-inter font-light">
                {description}
              </p>
              <a
                href={href}
                className="text-[11px] tracking-[0.2em] uppercase font-inter text-[#1e1e1e] border-b border-[#1e1e1e] pb-0.5 hover:text-[#b89a72] hover:border-[#b89a72] transition-colors"
              >
                {cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
