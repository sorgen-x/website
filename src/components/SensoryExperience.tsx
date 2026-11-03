import { Orbit, Sun, AudioWaveform, Wind } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const sensoryItems = [
  {
    icon: Orbit,
    title: "零重力",
    subtitle: "悬浮体感",
    description: "模拟失重状态，释放脊椎压力，让身体完全放松。",
  },
  {
    icon: Sun,
    title: "光疗",
    subtitle: "生物节律光",
    description: "自适应光谱调节，重塑自然昼夜节律。",
  },
  {
    icon: AudioWaveform,
    title: "声波",
    subtitle: "4D 脑波共振",
    description: "定制声频与脑波同步，引导深度放松与修复。",
  },
  {
    icon: Wind,
    title: "气蕴",
    subtitle: "微压富氧",
    description: "微正压富氧环境，提升细胞含氧量。",
  },
];

export function SensoryExperience() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="sensory" className="py-24 lg:py-32 bg-card">
      <div ref={ref} className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className={`text-center max-w-3xl mx-auto mb-16 stagger-item ${isVisible ? 'stagger-visible' : ''}`}>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-foreground tracking-tight mb-6">
            五感疗愈。
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            沉浸式修复系统，让身心归零。
          </p>
        </div>

        {/* Sensory Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {sensoryItems.map((item, index) => (
            <div
              key={item.title}
              className={`group relative p-8 rounded-3xl bg-background hover:shadow-medium transition-all duration-500 overflow-hidden stagger-item ${isVisible ? 'stagger-visible' : ''}`}
              style={{ transitionDelay: `${0.1 + index * 0.1}s` }}
            >
              {/* Background gradient on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-500">
                  <item.icon className="w-8 h-8 text-primary" />
                </div>
                
                <h3 className="text-2xl font-semibold text-foreground mb-1">
                  {item.title}
                </h3>
                <p className="text-sm font-medium text-primary mb-4">
                  {item.subtitle}
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
