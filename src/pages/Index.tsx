import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { ProductGallery } from "@/components/ProductGallery";
import { SensoryExperience } from "@/components/SensoryExperience";
import { ProductConfig } from "@/components/ProductConfig";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Disclaimer } from "@/components/Disclaimer";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <ProductGallery />
      <SensoryExperience />
      <About />
      <ProductConfig />
      <Contact />
      <Disclaimer />
      <Footer />
    </main>
  );
};

export default Index;
