import { Brain, Smartphone, Box, Check } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const systemComponents = [
  {
    icon: Brain,
    title: "小元",
    subtitle: "AI 健康预测引擎",
    features: [
      "实时健康状态监测与预警",
      "个性化健康趋势分析",
      "智能干预方案推荐",
    ],
  },
  {
    icon: Smartphone,
    title: "Vitality App",
    subtitle: "随身健康管家",
    features: [
      "全家健康数据一目了然",
      "远程关爱与异常提醒",
      "专属健康顾问随时在线",
    ],
  },
  {
    icon: Box,
    title: "Vitality Pod",
    subtitle: "家用恢复舱",
    features: [
      "每日 15 分钟深度修复",
      "四维疗愈自动执行",
      "全家共享健康空间",
    ],
  },
];

export function Solutions() {
  const { ref, isVisible } = useScrollAnimation();
  
  return (
    <section id="solutions" className="py-24 lg:py-32 bg-background">
      <div ref={ref} className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className={`text-center max-w-3xl mx-auto mb-16 stagger-item ${isVisible ? 'stagger-visible' : ''}`}>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-foreground tracking-tight mb-6">
            三位一体健康系统
          </h2>
          <p className="text-xl text-muted-foreground">
            「预测 · 预警 · 修复」完整闭环
          </p>
        </div>

        {/* System Components */}
        <div className="grid lg:grid-cols-3 gap-8">
          {systemComponents.map((component, index) => (
            <div
              key={component.title}
              className={`group p-8 rounded-3xl bg-card hover:shadow-medium transition-all duration-500 stagger-item ${isVisible ? 'stagger-visible' : ''}`}
              style={{ transitionDelay: `${0.1 + index * 0.15}s` }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-500">
                  <component.icon className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground">
                    {component.title}
                  </h3>
                  <p className="text-sm text-primary font-medium">
                    {component.subtitle}
                  </p>
                </div>
              </div>
              
              <ul className="space-y-3">
                {component.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
