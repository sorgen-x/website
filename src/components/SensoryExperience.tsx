import { ResponsiveImage } from "@/components/ResponsiveImage";
import { siteImages, type SiteImage } from "@/lib/images";

type Chapter = {
  id: string;
  name: string;
  line: string;
  detail: string;
  image: SiteImage;
  alt: string;
  fit: "cover" | "contain";
};

const chapters: Chapter[] = [
  {
    id: "sound",
    name: "声",
    line: "安静，也可以被设计。",
    detail: "舒曼波、环境白噪音或氛围舒缓音乐，按这一次来。",
    image: siteImages.interior,
    alt: "Aether 内舱",
    fit: "cover",
  },
  {
    id: "light",
    name: "光",
    line: "光线，柔下来。",
    detail: "远红外与环境氛围灯，让舱内的光跟着这一次走。",
    image: siteImages.hero,
    alt: "Aether 家用恢复舱",
    fit: "cover",
  },
  {
    id: "heat",
    name: "热",
    line: "温度，刚刚好。",
    detail: "舱内温度控制，保持适合此刻的感觉。",
    image: siteImages.finishGold,
    alt: "Aether 外观",
    fit: "contain",
  },
  {
    id: "oxygen",
    name: "氧",
    line: "空气，随这一次调整。",
    detail: "氧气浓度与速率，按这次安排。",
    image: siteImages.topdown,
    alt: "Aether 俯视",
    fit: "cover",
  },
  {
    id: "posture",
    name: "姿态",
    line: "全身，被稳稳托住。",
    detail: "零重力座椅，记忆、通风、加热与按摩。",
    image: siteImages.door,
    alt: "Aether 舱门与座椅",
    fit: "cover",
  },
];

export function SensoryExperience() {
  return (
    <section id="sensory" className="bg-background">
      <div className="section-y pb-8 lg:pb-10">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-foreground tracking-tight mb-3">
            小元调度的五件事。
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground">每一次，按此刻的你安排好。</p>
        </div>
      </div>

      <div className="sticky top-14 z-40 border-y border-border/60 bg-background/85 backdrop-blur-xl">
        <nav
          aria-label="五维体验"
          className="max-w-6xl mx-auto px-6 h-12 flex items-center gap-1 overflow-x-auto scrollbar-none"
        >
          {chapters.map((chapter) => (
            <a
              key={chapter.id}
              href={`#dimension-${chapter.id}`}
              className="shrink-0 px-3 sm:px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {chapter.name}
            </a>
          ))}
        </nav>
      </div>

      {chapters.map((chapter, index) => {
        const imageLeft = index % 2 === 1;
        return (
          <article
            key={chapter.id}
            id={`dimension-${chapter.id}`}
            className="scroll-mt-28 border-b border-border/40 last:border-b-0"
          >
            <div className="max-w-6xl mx-auto px-6 py-16 lg:py-24 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              <div className={`space-y-5 ${imageLeft ? "lg:order-2" : ""}`}>
                <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">{chapter.name}</p>
                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground tracking-tight leading-tight">
                  {chapter.line}
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed max-w-md">{chapter.detail}</p>
                <a
                  href="/#contact"
                  className="inline-flex text-sm text-foreground underline-offset-4 hover:underline"
                >
                  预约体验
                </a>
              </div>
              <div className={imageLeft ? "lg:order-1" : ""}>
                <div className="relative aspect-[16/10] rounded-[1.75rem] overflow-hidden bg-muted/40">
                  <ResponsiveImage
                    image={chapter.image}
                    alt={chapter.alt}
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className={`h-full w-full ${chapter.fit === "contain" ? "object-contain p-6" : "object-cover"}`}
                  />
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </section>
  );
}
