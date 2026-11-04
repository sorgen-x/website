import { Orbit, Sun, AudioWaveform } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const sensoryItems = [
  {
    icon: Orbit,
    title: "姿态",
    subtitle: "全身承托",
    description: "坐下即被托住，让身体慢慢松下来。",
  },
  {
    icon: Sun,
    title: "光",
    subtitle: "柔和光带",
    description: "随场景调节亮度与色温，不刺眼。",
  },
  {
    icon: AudioWaveform,
    title: "声",
    subtitle: "安静声场",
    description: "低干扰环境，更容易进入短时恢复。",
  },
];

export function SensoryExperience() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="sensory" className="py-24 lg:py-32 bg-background">
      <div ref={ref} className="max-w-6xl mx-auto px-6">
        <div className={`text-center max-w-3xl mx-auto mb-16 stagger-item ${isVisible ? "stagger-visible" : ""}`}>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-foreground tracking-tight mb-6">
            坐进去，就能感到的三件事。
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">姿态 · 光 · 声</p>
        </div>

        <div className="grid sm:grid-cols-3 gap-6">
          {sensoryItems.map((item, index) => (
            <div
              key={item.title}
              className={`group relative p-8 rounded-3xl bg-card hover:shadow-medium transition-all duration-500 overflow-hidden stagger-item ${isVisible ? "stagger-visible" : ""}`}
              style={{ transitionDelay: `${0.1 + index * 0.1}s` }}
            >
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-500">
                  <item.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold text-foreground mb-1">{item.title}</h3>
                <p className="text-sm font-medium text-primary mb-4">{item.subtitle}</p>
                <p className="text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
