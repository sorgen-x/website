import { Button } from "@/components/ui/button";
import { ResponsiveImage } from "@/components/ResponsiveImage";
import { siteImages } from "@/lib/images";

export function HeroSection() {
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-end overflow-hidden bg-black pt-14">
      <div className="absolute inset-0">
        <ResponsiveImage
          image={siteImages.hero}
          alt="Aether 家用恢复舱"
          sizes="100vw"
          priority
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/40" />
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 pb-20 pt-32 text-center">
        <div className="space-y-5 animate-fade-up">
          <p className="text-sm uppercase tracking-[0.2em] text-white/60">SORGEN</p>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight text-white">
            Aether
          </h1>
          <p className="text-lg sm:text-xl text-white/80 font-light tracking-wide">
            家用恢复舱
          </p>
          <p className="text-sm sm:text-base text-white/55 font-light tracking-wide max-w-xl mx-auto">
            小元根据你当下状态，调度声、光、热、氧、姿态。
          </p>
          <div className="pt-4">
            <Button
              variant="hero"
              size="lg"
              onClick={scrollToContact}
              className="min-w-[160px]"
            >
              预约体验
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
