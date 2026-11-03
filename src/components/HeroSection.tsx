import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  const scrollToProduct = () => {
    document.getElementById("core-products")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-background pt-14">
      <div className="relative z-10 max-w-5xl mx-auto px-6 py-20 text-center">
        {/* Text Content */}
        <div className="space-y-6 animate-fade-up">
          <p className="text-primary text-lg font-medium tracking-wide">
            家庭级健康管理中枢
          </p>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-semibold leading-tight tracking-tight text-foreground">
            Vitality
          </h1>
          
          <p className="text-xl sm:text-2xl lg:text-3xl text-muted-foreground font-light">
            您的私人家庭医生，24小时待命
          </p>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            比症状早 48 小时预警 · 让每一个细胞重获活力
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button variant="hero" size="lg" onClick={scrollToProduct}>
              探索 Vitality
            </Button>
            <Button variant="appleOutline" size="lg" onClick={scrollToContact}>
              预约私享体验
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
