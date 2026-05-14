import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = { title: "Bespoke — VOWEN Studio" };

export default function BespokePage() {
  return (
    <main>
      <Navbar />
      <div className="pt-[64px] bg-[#faf8f5] min-h-screen">
        <div className="max-w-2xl mx-auto px-6 py-20">
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#b89a72] mb-3 font-inter">Made for You</p>
          <h1 className="text-[2.8rem] md:text-[3.6rem] font-light text-[#1e1e1e] leading-tight mb-6"
            style={{ fontFamily: "var(--font-cormorant)" }}>
            Bespoke Service
          </h1>
          <p className="text-[14px] text-[#7a7570] leading-relaxed mb-4 font-inter font-light">
            Our bespoke service allows you to create a truly unique piece — whether that's a one-of-a-kind veil, a custom pair of earrings, or a personalised headpiece designed around your gown and vision.
          </p>
          <p className="text-[14px] text-[#7a7570] leading-relaxed mb-10 font-inter font-light">
            The process begins with a consultation, either in-studio or via email. We'll guide you through materials, silhouettes and details to create something entirely your own.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
            {[
              { step: "01", title: "Consultation", desc: "We discuss your vision, wedding date, and the look you're hoping to achieve." },
              { step: "02", title: "Design", desc: "We sketch and source materials, keeping you updated throughout the process." },
              { step: "03", title: "Creation", desc: "Your piece is handcrafted and delivered in time for your wedding day." },
            ].map((s) => (
              <div key={s.step} className="border border-[#e5e0d8] p-6 bg-white">
                <p className="text-[10px] tracking-[0.3em] uppercase text-[#b89a72] mb-3 font-inter">{s.step}</p>
                <h3 className="text-[1.2rem] font-light text-[#1e1e1e] mb-2" style={{ fontFamily: "var(--font-cormorant)" }}>{s.title}</h3>
                <p className="text-[12px] text-[#7a7570] leading-relaxed font-inter font-light">{s.desc}</p>
              </div>
            ))}
          </div>
          <a href="mailto:hello@vowenstudio.com"
            className="inline-block px-10 py-3.5 bg-[#111111] text-white text-[11px] tracking-[0.2em] uppercase font-inter hover:bg-[#b89a72] transition-all duration-300">
            Get in Touch
          </a>
        </div>
      </div>
      <Footer />
    </main>
  );
}
