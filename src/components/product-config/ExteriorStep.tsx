import { forwardRef } from "react";
import { GitCompare, Palette } from "lucide-react";
import { exteriorOptions } from "./data";

interface ExteriorStepProps {
  selectedId: string;
  confirmingId: string | null;
  onSelect: (id: string) => void;
  onCompare: () => void;
}

export const ExteriorStep = forwardRef<HTMLDivElement, ExteriorStepProps>(
  ({ selectedId, confirmingId, onSelect, onCompare }, ref) => (
    <div ref={ref} className="scroll-mt-32">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2">
          <Palette className="w-4 h-4 text-muted-foreground" />
          <h3 className="text-lg font-medium text-foreground">② 产品外观</h3>
        </div>
        <button
          onClick={onCompare}
          className="flex items-center gap-1 text-xs text-primary hover:text-primary/80 transition-colors"
        >
          <GitCompare className="w-3.5 h-3.5" />
          并排对比
        </button>
      </div>
      <p className="text-sm text-muted-foreground mb-4">为家而生。每一种涂层，皆为光线而调。</p>
      <div className="grid grid-cols-2 gap-3">
        {exteriorOptions.map((opt) => {
          const isSelected = selectedId === opt.id;
          return (
            <button
              key={opt.id}
              onClick={() => onSelect(opt.id)}
              className={`p-4 rounded-xl border text-left transition-all duration-300 ${
                isSelected
                  ? `border-primary bg-primary/5 ${confirmingId === opt.id ? "animate-confirm" : ""}`
                  : "border-border bg-background hover:border-muted-foreground/30"
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <span
                  className="w-6 h-6 rounded-full border border-border/50 shadow-inner"
                  style={{ backgroundColor: opt.swatch }}
                />
                <span className="font-medium text-foreground text-sm">{opt.name}</span>
              </div>
              <span className="text-sm text-muted-foreground">{opt.priceDisplay}</span>
            </button>
          );
        })}
      </div>
    </div>
  )
);
ExteriorStep.displayName = "ExteriorStep";
