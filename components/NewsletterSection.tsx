"use client";

import { useState } from "react";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <section className="py-20 md:py-28 px-6 bg-[#111111] text-white text-center">
      <div className="max-w-lg mx-auto">
        <p className="text-[10px] tracking-[0.35em] uppercase text-[#b89a72] mb-4 font-inter">
          Join the list
        </p>
        <h2
          className="text-[2rem] md:text-[2.6rem] font-light mb-3"
          style={{ fontFamily: "var(--font-cormorant)", letterSpacing: "0.02em" }}
        >
          Receive 10% off your order
        </h2>
        <p className="text-[13px] text-gray-400 mb-2 font-inter font-light">
          Be the first to hear about new arrivals, exclusive events and studio news.
        </p>
        <p className="text-[11px] text-gray-600 mb-10 font-inter tracking-[0.1em]">
          we never share your details
        </p>

        {submitted ? (
          <p className="text-[13px] text-[#b89a72] tracking-[0.15em] uppercase font-inter">
            Thank you — your 10% code is on its way.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-0">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="flex-1 bg-transparent border border-white/20 px-5 py-3.5 text-[13px] text-white placeholder-gray-600 outline-none focus:border-white/50 font-inter transition-colors"
            />
            <button
              type="submit"
              className="px-8 py-3.5 bg-white text-[#111] text-[11px] tracking-[0.2em] uppercase font-inter hover:bg-[#b89a72] hover:text-white transition-all duration-300 sm:border-l-0"
            >
              Subscribe
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
