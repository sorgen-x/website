import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ResponsiveImage } from "@/components/ResponsiveImage";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { siteImages, type SiteImage } from "@/lib/images";

type Finish = {
  id: string;
  name: string;
  swatch: string;
  image: SiteImage;
};

const finishes: Finish[] = [
  { id: "pearl", name: "珍珠白", swatch: "#F2EFEA", image: siteImages.finishPearl },
  { id: "obsidian", name: "曜石黑", swatch: "#1A1A1C", image: siteImages.finishObsidian },
  { id: "gold", name: "鎏光金", swatch: "#C4A15A", image: siteImages.finishGold },
  { id: "silver", name: "星河银", swatch: "#C6CAD0", image: siteImages.finishSilver },
];

const interiors = ["亚麻", "Nappa 真皮", "Alcantara"];

export function ProductConfig() {
  const [selectedId, setSelectedId] = useState(finishes[0].id);
  const { ref, isVisible } = useScrollAnimation();
  const selected = finishes.find((f) => f.id === selectedId) ?? finishes[0];

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="configure" className="section-y bg-background">
      <div ref={ref} className="max-w-6xl mx-auto px-6">
        <div className={`text-center max-w-3xl mx-auto mb-12 lg:mb-16 stagger-item ${isVisible ? "stagger-visible" : ""}`}>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-foreground tracking-tight">
            材质与色彩。
          </h2>
        </div>

        <div
          className={`relative aspect-[16/10] rounded-[2rem] overflow-hidden bg-card stagger-item ${isVisible ? "stagger-visible" : ""}`}
          style={{ transitionDelay: "0.1s" }}
        >
          {finishes.map((finish) => {
            const active = finish.id === selected.id;
            return (
              <ResponsiveImage
                key={finish.id}
                image={finish.image}
                alt={active ? `Aether · ${finish.name}` : ""}
                sizes="(min-width: 1152px) 1104px, 100vw"
                priority={finish.id === "pearl"}
                loading="eager"
                decoding="async"
                className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-700 ease-in-out ${
                  active ? "opacity-100" : "opacity-0"
                }`}
                aria-hidden={!active}
              />
            );
          })}
        </div>

        <div
          className={`mt-10 flex flex-col items-center stagger-item ${isVisible ? "stagger-visible" : ""}`}
          style={{ transitionDelay: "0.18s" }}
        >
          <div role="radiogroup" aria-label="外观颜色" className="flex items-center gap-5">
            {finishes.map((finish) => {
              const active = finish.id === selected.id;
              return (
                <button
                  key={finish.id}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  aria-label={finish.name}
                  onClick={() => setSelectedId(finish.id)}
                  className={`h-9 w-9 rounded-full p-[3px] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                    active ? "ring-1 ring-foreground/70" : "ring-1 ring-transparent hover:ring-foreground/20"
                  }`}
                >
                  <span
                    className="block h-full w-full rounded-full border border-black/10"
                    style={{ backgroundColor: finish.swatch }}
                  />
                </button>
              );
            })}
          </div>

          <p className="mt-5 text-base font-medium text-foreground" aria-live="polite">
            {selected.name}
          </p>
          <p className="mt-2 text-sm text-muted-foreground tracking-wide">
            内饰 · {interiors.join(" / ")}
          </p>

          <Button variant="hero" size="lg" onClick={scrollToContact} className="mt-10 min-w-[180px]">
            预约了解配置
          </Button>
        </div>
      </div>
    </section>
  );
}
