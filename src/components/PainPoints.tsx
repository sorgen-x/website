import { Shield, Sparkles } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const healthCards = [
  {
    tag: "未病先防",
    title: "洞察细微，防患未然。",
    description: "Vitality 并非只在您生病时介入。通过每日 15 分钟扫描，追踪 2,000+ 项指标，比症状出现早 48 小时预警。",
    icon: Shield,
  },
  {
    tag: "深层修复",
    title: "身心归零，焕然新生。",
    description: "自动生成光、音、气、磁四维修复方案。在零重力状态下，让每一个细胞重获活力。",
    icon: Sparkles,
  },
];

export function PainPoints() {
  const { ref, isVisible } = useScrollAnimation();
  
  return (
    <section className="py-24 lg:py-32 bg-card">
      <div ref={ref} className="max-w-5xl mx-auto px-6">
        {/* Section Header */}
        <div className={`text-center max-w-3xl mx-auto mb-16 stagger-item ${isVisible ? 'stagger-visible' : ''}`}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground tracking-tight mb-6">
            主动健康，
            <span className="text-primary">从此不一样。</span>
          </h2>
        </div>

        {/* Health Cards Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {healthCards.map((card, index) => (
            <div
              key={index}
              className={`group p-10 rounded-3xl bg-background hover:shadow-medium transition-all duration-500 stagger-item ${isVisible ? 'stagger-visible' : ''}`}
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
              <p className="text-lg text-muted-foreground leading-relaxed">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
