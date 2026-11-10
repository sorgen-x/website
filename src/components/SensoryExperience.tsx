import type { SVGProps } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

type Dimension = {
  name: string;
  line: string;
  detail: string;
  Icon: typeof SoundIcon;
};

function iconProps(props: SVGProps<SVGSVGElement>) {
  return {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.75,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    ...props,
  };
}

function SoundIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...iconProps(props)}>
      <circle cx="5.4" cy="12" r="1.7" fill="currentColor" stroke="none" />
      <path d="M8.7 8.5 A 3.7 3.7 0 0 1 11.25 12 A 3.7 3.7 0 0 1 8.7 15.5" />
      <path d="M12.4 6.6 A 6.5 6.5 0 0 1 15.4 12 A 6.5 6.5 0 0 1 12.4 17.4" />
      <path d="M15.75 4.7 A 8.2 8.2 0 0 1 20.25 12 A 8.2 8.2 0 0 1 15.75 19.3" />
    </svg>
  );
}

function LightIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...iconProps(props)}>
      <circle cx="12" cy="12" r="3.6" />
      <path d="M12 3.2v1.8M12 19v1.8M3.2 12h1.8M19 12h1.8" />
      <path d="m5.7 5.7 1.25 1.25M17.05 17.05l1.25 1.25M5.7 18.3l1.25-1.25M17.05 6.95l1.25-1.25" />
    </svg>
  );
}

function HeatIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...iconProps(props)}>
      <path d="M8.2 6.6c1.55 1.9 1.55 3.5 0 5.4s-1.55 3.5 0 5.4" />
      <path d="M12 5c1.55 1.9 1.55 3.5 0 5.4s-1.55 3.5 0 5.4 1.55 3.5 0 5.4" />
      <path d="M15.8 6.6c1.55 1.9 1.55 3.5 0 5.4s-1.55 3.5 0 5.4" />
    </svg>
  );
}

function OxygenIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...iconProps(props)}>
      <circle cx="6.35" cy="12" r="3.3" />
      <circle cx="17.65" cy="12" r="3.3" />
    </svg>
  );
}

function PostureIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...iconProps(props)}>
      <path d="M4 15h11.2" />
      <path d="M7 15v5.2" />
      <path d="M15.2 15 16.8 20.4" />
      <path d="M15.2 15 18.2 9 19.2 4.8" />
    </svg>
  );
}

const dimensions: Dimension[] = [
  {
    name: "声",
    line: "安静，也可以被设计。",
    detail: "舒曼波 · 环境白噪音 · 氛围舒缓音乐",
    Icon: SoundIcon,
  },
  {
    name: "光",
    line: "光线，柔下来。",
    detail: "远红外 · 环境氛围灯",
    Icon: LightIcon,
  },
  {
    name: "热",
    line: "温度，刚刚好。",
    detail: "舱内温度控制",
    Icon: HeatIcon,
  },
  {
    name: "氧",
    line: "空气，随这一次调整。",
    detail: "氧气浓度与速率控制",
    Icon: OxygenIcon,
  },
  {
    name: "姿态",
    line: "全身，被稳稳托住。",
    detail: "零重力座椅 · 记忆 · 通风 · 加热 · 按摩",
    Icon: PostureIcon,
  },
];

export function SensoryExperience() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="sensory" className="section-y bg-background">
      <div ref={ref} className="max-w-6xl mx-auto px-6">
        <div className={`text-center max-w-3xl mx-auto mb-8 lg:mb-10 stagger-item ${isVisible ? "stagger-visible" : ""}`}>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-foreground tracking-tight mb-3">
            小元调度的五件事。
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground">每一次，按此刻的你安排好。</p>
        </div>

        <ul className="max-w-3xl mx-auto border-t border-border" aria-label="声、光、热、氧、姿态">
          {dimensions.map((item, index) => (
            <li
              key={item.name}
              aria-label={item.name}
              className={`grid grid-cols-[1.75rem_1fr] sm:grid-cols-[2rem_minmax(0,1fr)_auto] gap-x-5 sm:gap-x-8 items-baseline sm:items-center border-b border-border py-5 sm:py-6 stagger-item ${isVisible ? "stagger-visible" : ""}`}
              style={{ transitionDelay: `${0.08 + index * 0.07}s` }}
            >
              <item.Icon className="h-7 w-7 sm:h-8 sm:w-8 text-foreground self-center" />
              <p className="text-base sm:text-lg font-medium text-foreground leading-snug">{item.line}</p>
              <p className="col-start-2 sm:col-start-3 mt-1 sm:mt-0 text-sm text-muted-foreground leading-relaxed sm:pl-8 sm:text-right">{item.detail}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
