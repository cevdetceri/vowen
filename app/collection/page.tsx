import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = { title: "Collection — VOWEN Studio" };

export default function CollectionPage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const category = searchParams.category ?? "All";

  return (
    <main>
      <Navbar />
      <div className="pt-[64px] bg-[#faf8f5] min-h-screen">
        <div className="px-6 md:px-12 lg:px-20 pt-14 pb-8 border-b border-[#e5e0d8]">
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#b89a72] mb-2 font-inter">Collection</p>
          <h1 className="text-[2.4rem] md:text-[3.2rem] font-light text-[#1e1e1e]" style={{ fontFamily: "var(--font-cormorant)" }}>
            {category}
          </h1>
        </div>
        <div className="px-6 md:px-12 lg:px-20 py-20 text-center">
          <p className="text-[14px] text-[#7a7570] font-inter font-light">
            This collection is coming soon. In the meantime, explore our{" "}
            <a href="/earrings-1" className="text-[#b89a72] hover:underline">earrings</a>{" "}
            and <a href="/veils" className="text-[#b89a72] hover:underline">veils</a>.
          </p>
        </div>
      </div>
      <Footer />
    </main>
  );
}
