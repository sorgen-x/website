import { AudioWaveform, Sun, Thermometer, Wind, Orbit } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const sensoryItems = [
  {
    icon: AudioWaveform,
    title: "声",
    subtitle: "舒曼波 · 白噪音 · 音乐",
    description: "舒曼波、环境白噪音与氛围舒缓音乐一起组成舱内声场，跟着这次方案走。",
  },
  {
    icon: Sun,
    title: "光",
    subtitle: "远红外与氛围灯",
    description: "远红外与环境氛围灯一起调节，亮度与氛围随当次方案。",
  },
  {
    icon: Thermometer,
    title: "热",
    subtitle: "温度控制",
    description: "舱内温度按当下状态控制，你不用自己去调。",
  },
  {
    icon: Wind,
    title: "氧",
    subtitle: "浓度与速率",
    description: "氧气浓度与供氧速率纳入方案，状态以舱端为准。",
  },
  {
    icon: Orbit,
    title: "姿态",
    subtitle: "零重力座椅",
    description: "零重力座椅承托全身；记忆、通风、加热、按摩随方案一起安排。",
  },
];

export function SensoryExperience() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="sensory" className="py-24 lg:py-32 bg-background">
      <div ref={ref} className="max-w-6xl mx-auto px-6">
        <div className={`text-center max-w-3xl mx-auto mb-16 stagger-item ${isVisible ? "stagger-visible" : ""}`}>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-foreground tracking-tight mb-6">
            小元调度的五件事。
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            声 · 光 · 热 · 氧 · 姿态。每一次，按你此刻的状态一次安排好。
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {sensoryItems.map((item, index) => (
            <div
              key={item.title}
              className={`group relative p-6 lg:p-7 rounded-3xl bg-card hover:shadow-medium transition-all duration-500 overflow-hidden stagger-item ${isVisible ? "stagger-visible" : ""}`}
              style={{ transitionDelay: `${0.1 + index * 0.08}s` }}
            >
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-500">
                  <item.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold text-foreground mb-1">{item.title}</h3>
                <p className="text-sm font-medium text-primary mb-3">{item.subtitle}</p>
                <p className="text-muted-foreground leading-relaxed text-sm">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
