import productInterior from "@/assets/product-interior.png";
import productGallery from "@/assets/product-gallery.png";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export function ProductGallery() {
  const hero = useScrollAnimation();
  const detail = useScrollAnimation();
  const specs = useScrollAnimation();

  return (
    <section className="bg-background">
      {/* Hero Feature — Khaki Interior */}
      <div ref={hero.ref} className="py-24 lg:py-32">
        <div className="max-w-6xl mx-auto px-6">
          <div className={`text-center max-w-3xl mx-auto mb-12 lg:mb-16 scroll-hidden ${hero.isVisible ? 'scroll-visible' : ''}`}>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-foreground tracking-tight leading-[1.1] mb-5">
              砂金内饰，<br className="sm:hidden" />重新定义恢复舱的奢享。
            </h2>
            <p className="text-xl text-muted-foreground">
              触感细腻，呼吸般的光影。
            </p>
          </div>

          <div
            className={`relative aspect-[16/10] rounded-[2rem] overflow-hidden bg-gradient-subtle scroll-hidden ${hero.isVisible ? 'scroll-visible' : ''}`}
            style={{ transitionDelay: '0.15s' }}
          >
            <img
              src={productInterior}
              alt="Vitality 砂金内饰"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </div>

      {/* Multi-angle Gallery */}
      <div ref={detail.ref} className="py-24 lg:py-32 bg-muted/30">
        <div className="max-w-6xl mx-auto px-6">
          <div className={`text-center max-w-3xl mx-auto mb-12 lg:mb-16 scroll-hidden ${detail.isVisible ? 'scroll-visible' : ''}`}>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-foreground tracking-tight leading-[1.1] mb-5">
              每一个角度，<br className="sm:hidden" />都是精工。
            </h2>
            <p className="text-xl text-muted-foreground">
              从外壳曲面到内腔光带，毫米级雕琢。
            </p>
          </div>

          <div
            className={`rounded-[2rem] overflow-hidden bg-background shadow-sm scroll-hidden ${detail.isVisible ? 'scroll-visible' : ''}`}
            style={{ transitionDelay: '0.15s' }}
          >
            <img
              src={productGallery}
              alt="Vitality 多角度展示"
              className="w-full h-auto"
              loading="lazy"
            />
          </div>
        </div>
      </div>

      {/* Feature Highlights */}
      <div ref={specs.ref} className="py-20 lg:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-8">
            {[
              { value: "0.8m²", label: "紧凑占地面积" },
              { value: "42dB", label: "静音运行" },
              { value: "5分钟", label: "快速启动" },
            ].map((item, i) => (
              <div
                key={item.label}
                className={`text-center p-8 scroll-hidden ${specs.isVisible ? 'scroll-visible' : ''}`}
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <div className="text-5xl font-light text-foreground mb-4">{item.value}</div>
                <p className="text-muted-foreground">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
