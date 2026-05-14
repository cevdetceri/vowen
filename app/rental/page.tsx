import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = { title: "Rental — VOWEN Studio" };

export default function RentalPage() {
  return (
    <main>
      <Navbar />
      <div className="pt-[64px] bg-[#faf8f5] min-h-screen">
        <div className="max-w-2xl mx-auto px-6 py-20">
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#b89a72] mb-3 font-inter">Sustainable Bridal</p>
          <h1 className="text-[2.8rem] md:text-[3.6rem] font-light text-[#1e1e1e] leading-tight mb-6"
            style={{ fontFamily: "var(--font-cormorant)" }}>
            Veil Rental
          </h1>
          <p className="text-[14px] text-[#7a7570] leading-relaxed mb-4 font-inter font-light">
            Our rental service allows you to wear one of our beautiful veils for your wedding day, then return it for another bride to enjoy. A thoughtful, sustainable choice.
          </p>
          <p className="text-[14px] text-[#7a7570] leading-relaxed mb-10 font-inter font-light">
            Each rental veil is professionally cleaned and restored between wearings. Rental pricing starts from £95 for a weekend hire.
          </p>
          <div className="border border-[#e5e0d8] p-8 bg-white mb-8">
            <h2 className="text-[1.4rem] font-light text-[#1e1e1e] mb-4" style={{ fontFamily: "var(--font-cormorant)" }}>
              How It Works
            </h2>
            <ul className="space-y-3">
              {[
                "Browse our rental collection and choose your veil",
                "Reserve your date — we hold it exclusively for you",
                "Your veil arrives 2 days before your wedding",
                "Return within 5 days using the prepaid label provided",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-[13px] text-[#7a7570] font-inter font-light">
                  <span className="text-[#b89a72] shrink-0">—</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <a href="mailto:hello@vowenstudio.com"
            className="inline-block px-10 py-3.5 bg-[#111111] text-white text-[11px] tracking-[0.2em] uppercase font-inter hover:bg-[#b89a72] transition-all duration-300">
            Enquire About Rental
          </a>
        </div>
      </div>
      <Footer />
    </main>
  );
}
