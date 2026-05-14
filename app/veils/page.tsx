import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import VeilsGrid from "@/components/pages/VeilsGrid";

export const metadata = {
  title: "Veils — VOWEN Studio",
  description: "Handmade bridal veils. From minimal to intricately embellished, made to order in our British studio.",
};

export default function VeilsPage() {
  return (
    <main>
      <Navbar />
      <div className="pt-[64px]">
        <VeilsGrid />
      </div>
      <Footer />
    </main>
  );
}
