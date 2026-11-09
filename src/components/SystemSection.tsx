import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const loopSteps = [
  { key: "sense", title: "采集", desc: "读这一次" },
  { key: "plan", title: "方案", desc: "专属生成" },
  { key: "run", title: "执行", desc: "舱内落地" },
  { key: "feedback", title: "反馈", desc: "看见变化" },
  { key: "learn", title: "学习", desc: "下次更准" },
] as const;

const whoFits = [
  { id: "stress", label: "压力急救", who: "焦虑、高压、想慢下来时" },
  { id: "morning", label: "晨间提神", who: "醒不来、脑雾、马上要开工时" },
  { id: "noon", label: "午间补能", who: "午后犯困、精力低谷时" },
  { id: "recovery", label: "运动后修复", who: "练完、重体力后想恢复时" },
] as const;

const SCENE_MS = 3500;
const NODE_MS = 2200;
const NODE_COUNT = loopSteps.length;

function polar(index: number, radiusPct: number) {
  const angle = (-90 + (index * 360) / NODE_COUNT) * (Math.PI / 180);
  return {
    angle,
    left: `${50 + radiusPct * Math.cos(angle)}%`,
    top: `${50 + radiusPct * Math.sin(angle)}%`,
    // Push label outward along the same radius (px)
    labelX: Math.cos(angle) * 34,
    labelY: Math.sin(angle) * 34,
  };
}

export function SystemSection() {
  const { ref, isVisible } = useScrollAnimation();
  const [scene, setScene] = useState(0);
  const [paused, setPaused] = useState(false);
  const [activeNode, setActiveNode] = useState(0);
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);

  const current = whoFits[scene];
  const revealIndex = hoveredNode ?? activeNode;

  const pickScene = useCallback((index: number) => {
    setScene(index);
    setPaused(true);
  }, []);

  useEffect(() => {
    if (!isVisible || paused) return;
    const id = window.setInterval(() => {
      setScene((prev) => (prev + 1) % whoFits.length);
    }, SCENE_MS);
    return () => window.clearInterval(id);
  }, [isVisible, paused, scene]);

  useEffect(() => {
    if (!isVisible) return;
    const id = window.setInterval(() => {
      setActiveNode((prev) => (prev + 1) % NODE_COUNT);
    }, NODE_MS);
    return () => window.clearInterval(id);
  }, [isVisible]);

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="system" className="py-24 lg:py-32 bg-card">
      <div ref={ref} className="max-w-6xl mx-auto px-6">
        <div
          className={`text-center max-w-3xl mx-auto mb-14 stagger-item ${isVisible ? "stagger-visible" : ""}`}
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-foreground tracking-tight mb-5">
            小元怎么给出这一次
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            读状态、给处方、守边界。舱落地；App 来前准备、走后看见。
          </p>
        </div>

        {/* Premium orbital visualization — living system, not a 5-step chart */}
        <div
          className={`max-w-lg mx-auto mb-12 stagger-item ${isVisible ? "stagger-visible" : ""}`}
          style={{ transitionDelay: "0.08s" }}
        >
          <div className="px-2 py-4 sm:px-6 sm:py-8">
            <div
              className="relative mx-auto aspect-square w-full max-w-[300px] sm:max-w-[400px]"
              role="img"
              aria-label="小元闭环：采集、方案、执行、反馈、学习；越用越懂你，细小变化也能提前察觉"
            >
              {/* Soft ambient bloom behind core */}
              <div
                aria-hidden
                className="xy-breathe-centered pointer-events-none absolute left-1/2 top-1/2 h-[48%] w-[48%] rounded-full bg-primary/[0.08] blur-3xl"
              />

              <svg
                className="absolute inset-0 h-full w-full overflow-visible"
                viewBox="0 0 400 400"
                aria-hidden
              >
                <defs>
                  <linearGradient id="xy-ring-base" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="hsl(210 100% 50%)" stopOpacity="0.16" />
                    <stop offset="55%" stopColor="hsl(210 30% 60%)" stopOpacity="0.05" />
                    <stop offset="100%" stopColor="hsl(210 100% 50%)" stopOpacity="0.12" />
                  </linearGradient>
                  <linearGradient id="xy-ring-sweep" gradientUnits="userSpaceOnUse" x1="200" y1="40" x2="200" y2="200">
                    <stop offset="0%" stopColor="hsl(210 100% 55%)" stopOpacity="0.55" />
                    <stop offset="100%" stopColor="hsl(210 100% 55%)" stopOpacity="0" />
                  </linearGradient>
                </defs>

                {/* Hairline orbit */}
                <circle
                  cx="200"
                  cy="200"
                  r="148"
                  fill="none"
                  stroke="url(#xy-ring-base)"
                  strokeWidth="0.85"
                />

                {/* Continuous luminous sweep — quiet confidence */}
                <g className="xy-orbit-spin" style={{ transformOrigin: "200px 200px" }}>
                  <circle
                    cx="200"
                    cy="200"
                    r="148"
                    fill="none"
                    stroke="url(#xy-ring-sweep)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 148 * 0.14} ${2 * Math.PI * 148}`}
                    opacity="0.9"
                  />
                </g>

                {/* Soft accent that eases to the active node */}
                <circle
                  cx="200"
                  cy="200"
                  r="148"
                  fill="none"
                  stroke="hsl(210 100% 50%)"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 148 * 0.06} ${2 * Math.PI * 148}`}
                  strokeDashoffset={-((2 * Math.PI * 148) / NODE_COUNT) * activeNode}
                  className="transition-[stroke-dashoffset] duration-1000 ease-in-out"
                  opacity="0.4"
                  transform="rotate(-90 200 200)"
                />
              </svg>

              {/* Core: luminous typography, not a badge/card */}
              <div className="absolute left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center">
                <div
                  aria-hidden
                  className="xy-breathe-centered pointer-events-none absolute left-1/2 top-1/2 h-28 w-28 rounded-full bg-primary/[0.1] blur-2xl"
                />
                <span className="relative text-[22px] sm:text-[26px] font-semibold tracking-[0.22em] text-foreground">
                  小元
                </span>
                <span className="relative mt-2.5 text-[9px] uppercase tracking-[0.48em] text-muted-foreground/60">
                  AI
                </span>
              </div>

              {/* Discreet nodes: ring dots + typographically quiet labels */}
              {loopSteps.map((step, index) => {
                const { left, top, labelX, labelY } = polar(index, 42);
                const active = index === activeNode;
                const revealed = index === revealIndex;
                return (
                  <div
                    key={step.key}
                    className="absolute z-20"
                    style={{ left, top }}
                    onMouseEnter={() => setHoveredNode(index)}
                    onMouseLeave={() => setHoveredNode(null)}
                    onFocus={() => setHoveredNode(index)}
                    onBlur={() => setHoveredNode(null)}
                    tabIndex={0}
                    role="presentation"
                  >
                    {/* Dot sits exactly on the orbit */}
                    <span className="absolute left-0 top-0 flex h-0 w-0 items-center justify-center">
                      <span
                        className={`block rounded-full transition-all duration-700 ease-out ${
                          active
                            ? "h-2.5 w-2.5 bg-primary shadow-[0_0_18px_3px_hsl(210_100%_50%/0.4)]"
                            : "h-1 w-1 bg-foreground/30"
                        }`}
                      />
                      {active && (
                        <span
                          aria-hidden
                          className="xy-breathe-scale absolute h-6 w-6 rounded-full border border-primary/20"
                        />
                      )}
                    </span>

                    {/* Label radially outside — no cards, no numbers */}
                    <div
                      className="absolute flex w-16 -translate-x-1/2 -translate-y-1/2 flex-col items-center text-center"
                      style={{
                        left: labelX,
                        top: labelY,
                      }}
                    >
                      <span
                        className={`text-[11px] sm:text-[12px] tracking-[0.32em] transition-colors duration-500 ${
                          active
                            ? "font-medium text-foreground"
                            : "font-normal text-muted-foreground/50"
                        }`}
                      >
                        {step.title}
                      </span>
                      <span
                        className={`mt-1.5 text-[10px] tracking-wide text-muted-foreground transition-all duration-400 ${
                          revealed
                            ? "translate-y-0 opacity-70"
                            : "pointer-events-none -translate-y-0.5 opacity-0"
                        }`}
                      >
                        {step.desc}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            <p className="mt-10 text-center text-sm text-foreground/70 leading-relaxed tracking-normal">
              用得越久，小元越懂你。一段时间后，连细小的变化也能提前察觉。
            </p>
            <p className="mt-3 text-center text-sm text-muted-foreground leading-relaxed">
              舱执行声、光、热、氧、姿态；App 连着来前与走后。
            </p>
          </div>
        </div>

        {/* 适合谁 — light auto-scroll chips */}
        <div
          className={`max-w-3xl mx-auto mb-12 stagger-item ${isVisible ? "stagger-visible" : ""}`}
          style={{ transitionDelay: "0.16s" }}
          onMouseEnter={() => setPaused(true)}
          onFocusCapture={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <p className="text-center text-xs font-medium tracking-wide text-muted-foreground mb-4">
            适合谁
          </p>

          <div
            role="tablist"
            aria-label="适合场景"
            className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-5"
          >
            {whoFits.map((item, index) => {
              const active = index === scene;
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => pickScene(index)}
                  className={`px-4 sm:px-5 py-2 rounded-full text-sm font-medium tracking-wide transition-all duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 ${
                    active
                      ? "bg-foreground text-background"
                      : "bg-background text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          <p
            key={current.id}
            className="text-center text-lg sm:text-xl text-foreground font-medium tracking-tight leading-snug animate-fade-in"
          >
            {current.who}
          </p>
        </div>

        <div
          className={`text-center space-y-3 stagger-item ${isVisible ? "stagger-visible" : ""}`}
          style={{ transitionDelay: "0.22s" }}
        >
          <Button
            variant="hero"
            size="lg"
            onClick={scrollToContact}
            className="min-w-[180px]"
          >
            预约体验
          </Button>
          <p className="text-sm text-muted-foreground">
            来坐一次，看小元怎么给这一次方案。
          </p>
        </div>
      </div>

      <style>{`
        @keyframes xy-breathe-centered-kf {
          0%, 100% { opacity: 0.5; transform: translate(-50%, -50%) scale(0.92); }
          50% { opacity: 1; transform: translate(-50%, -50%) scale(1.1); }
        }
        @keyframes xy-breathe-scale-kf {
          0%, 100% { opacity: 0.35; transform: scale(0.85); }
          50% { opacity: 0.85; transform: scale(1.15); }
        }
        @keyframes xy-orbit-spin-kf {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .xy-breathe-centered {
          animation: xy-breathe-centered-kf 5.5s ease-in-out infinite;
        }
        .xy-breathe-scale {
          animation: xy-breathe-scale-kf 3.2s ease-in-out infinite;
        }
        .xy-orbit-spin {
          animation: xy-orbit-spin-kf 20s linear infinite;
          transform-box: view-box;
          transform-origin: 200px 200px;
        }
      `}</style>
    </section>
  );
}
