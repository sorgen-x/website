import { ResponsiveImage } from "@/components/ResponsiveImage";
import { siteImages } from "@/lib/images";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export function ProductGallery() {
  const hero = useScrollAnimation();
  const detail = useScrollAnimation();

  return (
    <section id="gallery" className="bg-background">
      <div ref={hero.ref} className="section-y">
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
            <ResponsiveImage
              image={siteImages.interior}
              alt="Aether 内舱"
              sizes="(min-width: 1152px) 1104px, 100vw"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      <div ref={detail.ref} className="section-y bg-muted/30">
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
              <ResponsiveImage image={siteImages.door} alt="Aether 舱门" sizes="(min-width: 768px) 50vw, 100vw" className="w-full h-full object-cover" />
            </div>
            <div className="rounded-[1.5rem] overflow-hidden bg-background shadow-sm aspect-[16/10]">
              <ResponsiveImage image={siteImages.topdown} alt="Aether 俯视图" sizes="(min-width: 768px) 50vw, 100vw" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
