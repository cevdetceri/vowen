import Navbar from "@/components/Navbar";
import ParticleCanvas from "@/components/ParticleCanvas";
import HeroSection from "@/components/HeroSection";
import PlatformSection from "@/components/PlatformSection";
import TryCevoSection from "@/components/TryCevoSection";
import FeaturesSection from "@/components/FeaturesSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative">
      <ParticleCanvas />
      <Navbar />
      <HeroSection />
      <PlatformSection />
      <TryCevoSection />
      <FeaturesSection />
      <Footer />
    </main>
  );
}
