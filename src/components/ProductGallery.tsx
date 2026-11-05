import productInterior from "@/assets/product-interior.png";
import productDoor from "@/assets/product-door.png";
import productTopdown from "@/assets/product-topdown.png";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export function ProductGallery() {
  const hero = useScrollAnimation();
  const detail = useScrollAnimation();

  return (
    <section id="gallery" className="bg-background">
      <div ref={hero.ref} className="py-24 lg:py-32">
        <div className="max-w-6xl mx-auto px-6">
          <div className={`text-center max-w-3xl mx-auto mb-12 lg:mb-16 scroll-hidden ${hero.isVisible ? "scroll-visible" : ""}`}>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-foreground tracking-tight leading-[1.1] mb-5">
              内舱，为恢复而设计。
            </h2>
            <p className="text-xl text-muted-foreground">
              Aether · 安静、承托、可独自完成的短时恢复
            </p>
          </div>

          <div
            className={`relative aspect-[16/10] rounded-[2rem] overflow-hidden bg-gradient-subtle scroll-hidden ${hero.isVisible ? "scroll-visible" : ""}`}
            style={{ transitionDelay: "0.15s" }}
          >
            <img
              src={productInterior}
              alt="Aether 内舱"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </div>

      <div ref={detail.ref} className="py-24 lg:py-32 bg-muted/30">
        <div className="max-w-6xl mx-auto px-6">
          <div className={`text-center max-w-3xl mx-auto mb-12 lg:mb-16 scroll-hidden ${detail.isVisible ? "scroll-visible" : ""}`}>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-foreground tracking-tight leading-[1.1] mb-5">
              每一个角度，<br className="sm:hidden" />都经得起细看。
            </h2>
            <p className="text-xl text-muted-foreground">
              从外壳曲面到舱门细节，为家庭空间而打磨。
            </p>
          </div>

          <div
            className={`grid md:grid-cols-2 gap-6 scroll-hidden ${detail.isVisible ? "scroll-visible" : ""}`}
            style={{ transitionDelay: "0.15s" }}
          >
            <div className="rounded-[1.5rem] overflow-hidden bg-background shadow-sm aspect-[16/10]">
              <img src={productDoor} alt="Aether 舱门" className="w-full h-full object-cover" loading="lazy" />
            </div>
            <div className="rounded-[1.5rem] overflow-hidden bg-background shadow-sm aspect-[16/10]">
              <img src={productTopdown} alt="Aether 俯视图" className="w-full h-full object-cover" loading="lazy" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
