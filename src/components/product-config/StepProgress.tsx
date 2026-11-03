import { Check } from "lucide-react";
import { stepDefs } from "./data";
import type { StepKey } from "./types";

interface StepProgressProps {
  activeStep: StepKey;
  onStepClick: (key: StepKey) => void;
}

export function StepProgress({ activeStep, onStepClick }: StepProgressProps) {
  const activeIndex = stepDefs.findIndex((s) => s.key === activeStep);
  const progressPct = ((activeIndex + 1) / stepDefs.length) * 100;

  return (
    <div className="sticky top-20 z-10 bg-card/90 backdrop-blur-sm -mx-2 px-2 py-3 rounded-xl">
      <div className="flex items-center justify-between mb-2">
        {stepDefs.map((s, i) => {
          const isActive = i === activeIndex;
          const isDone = i < activeIndex;
          return (
            <button
              key={s.key}
              onClick={() => onStepClick(s.key)}
              className="flex flex-col items-center gap-1.5 group"
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium transition-all ${
                  isActive
                    ? "bg-primary text-primary-foreground ring-2 ring-primary/30 ring-offset-2 scale-110"
                    : isDone
                    ? "bg-primary/80 text-primary-foreground"
                    : "bg-muted text-muted-foreground group-hover:bg-muted-foreground/20"
                }`}
              >
                {isDone ? <Check className="w-3.5 h-3.5" /> : i + 1}
              </div>
              <span
                className={`text-[11px] transition-colors ${
                  isActive ? "text-foreground font-medium" : "text-muted-foreground"
                }`}
              >
                {s.label}
              </span>
            </button>
          );
        })}
      </div>
      <div className="h-1 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-primary transition-all duration-500 ease-out"
          style={{ width: `${progressPct}%` }}
        />
      </div>
    </div>
  );
}
