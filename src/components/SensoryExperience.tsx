import { useScrollAnimation } from "@/hooks/useScrollAnimation";

type Dimension = {
  glyph: string;
  line: string;
  detail: string;
  /** Material tone shown until a close-up photo exists. */
  tone: string;
};

const dimensions: Dimension[] = [
  {
    glyph: "声",
    line: "安静，也可以被设计。",
    detail: "舒曼波 · 环境白噪音 · 氛围舒缓音乐",
    tone: "linear-gradient(160deg, #EEEBE6 0%, #DAD5CD 100%)",
  },
  {
    glyph: "光",
    line: "光线，柔下来。",
    detail: "远红外 · 环境氛围灯",
    tone: "linear-gradient(160deg, #F3ECE1 0%, #E2D6C4 100%)",
  },
  {
    glyph: "热",
    line: "温度，刚刚好。",
    detail: "舱内温度控制",
    tone: "linear-gradient(160deg, #EFE4D8 0%, #DCCAB8 100%)",
  },
  {
    glyph: "氧",
    line: "空气，随这一次调整。",
    detail: "氧气浓度与速率控制",
    tone: "linear-gradient(160deg, #E9ECEC 0%, #D3D8D9 100%)",
  },
  {
    glyph: "姿态",
    line: "全身，被稳稳托住。",
    detail: "零重力座椅 · 记忆 · 通风 · 加热 · 按摩",
    tone: "linear-gradient(160deg, #E8E5E0 0%, #CFCAC2 100%)",
  },
];

export function SensoryExperience() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="sensory" className="section-y bg-background overflow-hidden">
      <div ref={ref} className="max-w-6xl mx-auto px-6">
        <div className={`text-center max-w-3xl mx-auto mb-14 lg:mb-20 stagger-item ${isVisible ? "stagger-visible" : ""}`}>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-foreground tracking-tight mb-5">
            小元调度的五件事。
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground">每一次，按此刻的你安排好。</p>
        </div>

        <ul
          className="-mx-6 px-6 flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-px-6 pb-2 no-scrollbar lg:mx-0 lg:px-0 lg:grid lg:grid-cols-5 lg:gap-6 lg:overflow-visible"
          aria-label="声、光、热、氧、姿态"
        >
          {dimensions.map((item, index) => (
            <li
              key={item.glyph}
              className={`snap-start shrink-0 w-[72%] sm:w-[44%] lg:w-auto stagger-item ${isVisible ? "stagger-visible" : ""}`}
              style={{ transitionDelay: `${0.08 + index * 0.07}s` }}
            >
              <div
                className="aspect-[4/5] rounded-[1.75rem] flex items-end p-6 lg:p-7"
                style={{ background: item.tone }}
                aria-hidden
              >
                <span className="text-6xl lg:text-[4.25rem] font-semibold leading-none tracking-tight text-foreground/85">
                  {item.glyph}
                </span>
              </div>
              <p className="mt-5 text-[17px] font-medium text-foreground leading-snug">{item.line}</p>
              <p className="mt-2 text-[13px] text-muted-foreground leading-relaxed">{item.detail}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
