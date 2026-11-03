import { Brain, Zap, Shield, Wifi, Heart, Sparkles } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI 智能监测",
    description: "深度学习算法实时分析身体状态，精准识别健康隐患",
  },
  {
    icon: Zap,
    title: "太赫兹科技",
    description: "独创太赫兹波疗愈技术，深层激活细胞活力",
  },
  {
    icon: Shield,
    title: "全息防护",
    description: "360°环绕式健康防护，全方位守护您的身心",
  },
  {
    icon: Wifi,
    title: "云端互联",
    description: "实时同步健康数据，随时随地掌握健康动态",
  },
  {
    icon: Heart,
    title: "心率监测",
    description: "精准心率变异性分析，实时追踪心血管健康",
  },
  {
    icon: Sparkles,
    title: "个性方案",
    description: "基于AI分析生成专属恢复计划，千人千面",
  },
];

export function ProductFeatures() {
  return (
    <section id="product" className="py-24 lg:py-32 bg-card">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-24">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-foreground tracking-tight mb-6">
            重新定义健康科技
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Vitality 融合前沿AI技术与太赫兹波疗愈科技，为您带来前所未有的智能恢复体验
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group p-8 rounded-2xl bg-background hover:shadow-medium transition-all duration-500"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-500">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {feature.title}
              </h3>
              
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
