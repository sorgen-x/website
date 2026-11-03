import { Users, Heart, Briefcase, Target, Check } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const audiences = [
  { icon: Heart, text: "追求高品质生活的中高净值家庭" },
  { icon: Briefcase, text: "高强度工作、注重效率的企业高管" },
  { icon: Target, text: "关注预防医学的健康意识先锋" },
  { icon: Users, text: "希望为家人提供更好健康保障的人群" },
];

const scenarios = [
  {
    title: "为挚爱父母",
    features: [
      "无需复杂操作，入舱即享",
      "异常指标实时预警，子女远程可见",
      "比体检更早发现潜在问题",
    ],
    note: "让关爱不再只是周末的电话",
  },
  {
    title: "为忙碌的自己",
    features: [
      "每日 15 分钟深度修复",
      "追踪压力、睡眠与疲劳变化",
      "在家完成专业级健康管理",
    ],
    note: "高效人士的健康投资",
  },
];

const principles = [
  "比症状早 48 小时预警",
  "四维修复自动执行",
  "全家共享健康守护",
  "数据安全本地加密",
];

export function TargetAudience() {
  const { ref, isVisible } = useScrollAnimation();
  
  return (
    <section id="audience" className="py-24 lg:py-32 bg-card">
      <div ref={ref} className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className={`text-center max-w-3xl mx-auto mb-16 stagger-item ${isVisible ? 'stagger-visible' : ''}`}>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-foreground tracking-tight mb-6">
            为谁而造
          </h2>
        </div>

        {/* Audience Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
          {audiences.map((audience, index) => (
            <div
              key={index}
              className={`p-6 rounded-2xl bg-background hover:shadow-medium transition-all duration-500 stagger-item ${isVisible ? 'stagger-visible' : ''}`}
              style={{ transitionDelay: `${0.1 + index * 0.1}s` }}
            >
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                <audience.icon className="w-6 h-6 text-primary" />
              </div>
              <p className="text-foreground">{audience.text}</p>
            </div>
          ))}
        </div>

        {/* Scenarios */}
        <div className="grid lg:grid-cols-2 gap-8 mb-20">
          {scenarios.map((scenario, index) => (
            <div
              key={index}
              className={`p-8 rounded-3xl bg-background stagger-item ${isVisible ? 'stagger-visible' : ''}`}
              style={{ transitionDelay: `${0.5 + index * 0.15}s` }}
            >
              <h3 className="text-xl font-semibold text-foreground mb-6">
                {scenario.title}
              </h3>
              <ul className="space-y-3 mb-6">
                {scenario.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="bg-primary/5 border border-primary/10 rounded-xl p-4">
                <p className="text-sm text-muted-foreground italic">
                  {scenario.note}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Principles */}
        <div className={`text-center stagger-item ${isVisible ? 'stagger-visible' : ''}`} style={{ transitionDelay: '0.8s' }}>
          <h3 className="text-2xl font-semibold text-foreground mb-8">
            Vitality 承诺
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {principles.map((principle, index) => (
              <div
                key={index}
                className={`flex items-center gap-2 px-5 py-3 rounded-full bg-background stagger-item ${isVisible ? 'stagger-visible' : ''}`}
                style={{ transitionDelay: `${0.9 + index * 0.1}s` }}
              >
                <Check className="w-4 h-4 text-primary" />
                <span className="text-foreground">{principle}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
