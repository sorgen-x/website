import { Brain, Lock, Sparkles } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "个人基线",
    description: "持续感知身体节奏，用克制的方式呈现变化。",
  },
  {
    icon: Sparkles,
    title: "舱内恢复",
    description: "光、声、姿态协同，短时沉浸式体验。",
  },
  {
    icon: Lock,
    title: "本地优先",
    description: "敏感数据默认本地处理，同步需你授权。",
  },
];

export function ProductFeatures() {
  return (
    <section id="product" className="py-24 lg:py-32 bg-card">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-24">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-foreground tracking-tight mb-6">
            重新定义恢复体验
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            SORGEN 以硬件为中心，把可感知的恢复带进家庭。
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group p-8 rounded-2xl bg-background hover:shadow-medium transition-all duration-500"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-500">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
