import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = { title: "Book an Appointment — VOWEN Studio" };

export default function AppointmentsPage() {
  return (
    <main>
      <Navbar />
      <div className="pt-[64px] bg-[#faf8f5] min-h-screen">
        <div className="max-w-2xl mx-auto px-6 py-20">
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#b89a72] mb-3 font-inter">The Studio</p>
          <h1 className="text-[2.8rem] md:text-[3.6rem] font-light text-[#1e1e1e] leading-tight mb-6"
            style={{ fontFamily: "var(--font-cormorant)" }}>
            Book an Appointment
          </h1>
          <p className="text-[14px] text-[#7a7570] leading-relaxed mb-4 font-inter font-light">
            We welcome brides-to-be for private studio appointments where you can try on our full collection of earrings, veils, and accessories in a relaxed, intimate setting.
          </p>
          <p className="text-[14px] text-[#7a7570] leading-relaxed mb-10 font-inter font-light">
            Appointments last approximately one hour. To book, please email us with your preferred date and time.
          </p>
          <div className="border border-[#e5e0d8] p-8 bg-white">
            <h2 className="text-[1.4rem] font-light text-[#1e1e1e] mb-6" style={{ fontFamily: "var(--font-cormorant)" }}>
              Request an Appointment
            </h2>
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] tracking-[0.15em] uppercase text-[#7a7570] mb-2 font-inter">First Name</label>
                  <input type="text" className="w-full border border-[#e5e0d8] px-3 py-2.5 text-[13px] font-inter outline-none focus:border-[#b89a72] bg-[#faf8f5]" />
                </div>
                <div>
                  <label className="block text-[11px] tracking-[0.15em] uppercase text-[#7a7570] mb-2 font-inter">Last Name</label>
                  <input type="text" className="w-full border border-[#e5e0d8] px-3 py-2.5 text-[13px] font-inter outline-none focus:border-[#b89a72] bg-[#faf8f5]" />
                </div>
              </div>
              <div>
                <label className="block text-[11px] tracking-[0.15em] uppercase text-[#7a7570] mb-2 font-inter">Email</label>
                <input type="email" className="w-full border border-[#e5e0d8] px-3 py-2.5 text-[13px] font-inter outline-none focus:border-[#b89a72] bg-[#faf8f5]" />
              </div>
              <div>
                <label className="block text-[11px] tracking-[0.15em] uppercase text-[#7a7570] mb-2 font-inter">Preferred Date</label>
                <input type="date" className="w-full border border-[#e5e0d8] px-3 py-2.5 text-[13px] font-inter outline-none focus:border-[#b89a72] bg-[#faf8f5]" />
              </div>
              <div>
                <label className="block text-[11px] tracking-[0.15em] uppercase text-[#7a7570] mb-2 font-inter">Message</label>
                <textarea rows={3} className="w-full border border-[#e5e0d8] px-3 py-2.5 text-[13px] font-inter outline-none focus:border-[#b89a72] bg-[#faf8f5] resize-none" placeholder="Tell us about your wedding date and what you're looking for..." />
              </div>
              <button type="submit" className="w-full py-3.5 bg-[#111111] text-white text-[11px] tracking-[0.2em] uppercase font-inter hover:bg-[#b89a72] transition-all duration-300">
                Send Request
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
