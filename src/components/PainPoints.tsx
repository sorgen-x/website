import { Shield, Sparkles } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const healthCards = [
  {
    tag: "感知",
    title: "更早看见变化。",
    description: "入舱扫描，建立个人基线。在身体发出明确信号之前，帮助你察觉细微波动。",
    icon: Shield,
  },
  {
    tag: "恢复",
    title: "把恢复留给舱内。",
    description: "光、声、气、姿态协同。一次短时沉浸，让身心回到可继续的状态。",
    icon: Sparkles,
  },
];

export function PainPoints() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-24 lg:py-32 bg-card">
      <div ref={ref} className="max-w-5xl mx-auto px-6">
        <div className={`text-center max-w-3xl mx-auto mb-16 stagger-item ${isVisible ? "stagger-visible" : ""}`}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground tracking-tight mb-6">
            少说多做，
            <span className="text-primary">坐进去就懂。</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {healthCards.map((card, index) => (
            <div
              key={index}
              className={`group p-10 rounded-3xl bg-background hover:shadow-medium transition-all duration-500 stagger-item ${isVisible ? "stagger-visible" : ""}`}
              style={{ transitionDelay: `${0.1 + index * 0.15}s` }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-500">
                  <card.icon className="w-6 h-6 text-primary" />
                </div>
                <span className="text-sm font-medium text-primary tracking-wide uppercase">
                  {card.tag}
                </span>
              </div>
              <h3 className="text-2xl lg:text-3xl font-semibold text-foreground mb-4 leading-tight">
                {card.title}
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed">{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
