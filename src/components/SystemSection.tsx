import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const pillars = [
  {
    eyebrow: "舱",
    title: "坐进去，就是全部。",
    body: "识别你是谁，采进舱这一刻的身体，再把声、光、热、氧、姿态一次安排好。门一推就开，开了或关上，都会给你反馈。",
  },
  {
    eyebrow: "小元",
    title: "越用，越懂你。",
    body: "小元会把你授权的全天穿戴数据，和进舱瞬间的体征放在一起，给出此刻最适合的一套方案。用得越久，对你的理解越深，下一次也更贴合——这些会留下来。",
  },
  {
    eyebrow: "App",
    title: "出门前准备，离开后仍看见。",
    body: "人还没到，就能预热；无人时可以杀菌。到家看门是开还是关，推门进去。授权常用手表后，今天的身体会在识别身份时自动带上；没戴也没关系。离开后随时看报告，看见自己一次次更稳。",
  },
];

export function SystemSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="system" className="py-24 lg:py-32 bg-card">
      <div ref={ref} className="max-w-6xl mx-auto px-6">
        <div className={`text-center max-w-3xl mx-auto mb-16 stagger-item ${isVisible ? "stagger-visible" : ""}`}>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-foreground tracking-tight mb-6">
            舱、小元、与 App。
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            三件东西连在一起。你用得越久，就越不愿意丢掉已经积累下来的理解。
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {pillars.map((item, index) => (
            <div
              key={item.eyebrow}
              className={`p-8 lg:p-10 rounded-3xl bg-background hover:shadow-medium transition-all duration-500 stagger-item ${isVisible ? "stagger-visible" : ""}`}
              style={{ transitionDelay: `${0.1 + index * 0.1}s` }}
            >
              <p className="text-sm font-medium tracking-wide text-primary mb-4">{item.eyebrow}</p>
              <h3 className="text-2xl font-semibold text-foreground mb-4 tracking-tight">{item.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
