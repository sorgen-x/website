import { forwardRef } from "react";
import { Check, GitCompare, Sofa } from "lucide-react";
import productInterior from "@/assets/product-interior.png";
import { interiorOptions } from "./data";

interface InteriorStepProps {
  selectedId: string;
  confirmingId: string | null;
  onSelect: (id: string) => void;
  onCompare: () => void;
}

export const InteriorStep = forwardRef<HTMLDivElement, InteriorStepProps>(
  ({ selectedId, confirmingId, onSelect, onCompare }, ref) => (
    <div ref={ref} className="scroll-mt-32">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2">
          <Sofa className="w-4 h-4 text-muted-foreground" />
          <h3 className="text-lg font-medium text-foreground">③ 内饰</h3>
        </div>
        <button
          onClick={onCompare}
          className="flex items-center gap-1 text-xs text-primary hover:text-primary/80 transition-colors"
        >
          <GitCompare className="w-3.5 h-3.5" />
          并排对比
        </button>
      </div>
      <p className="text-sm text-muted-foreground mb-4">触感即疗愈。小元在每一次入舱时，识别您的偏好。</p>

      <div className="rounded-2xl overflow-hidden mb-5 shadow-sm">
        <img
          src={productInterior}
          alt="Vitality 砂金内饰实景"
          className="w-full h-auto object-cover"
          loading="lazy"
        />
      </div>

      <div className="space-y-3">
        {interiorOptions.map((opt) => {
          const isSelected = selectedId === opt.id;
          return (
            <button
              key={opt.id}
              onClick={() => onSelect(opt.id)}
              className={`w-full p-4 rounded-xl border text-left transition-all duration-300 ${
                isSelected
                  ? `border-primary bg-primary/5 ${confirmingId === opt.id ? "animate-confirm" : ""}`
                  : "border-border bg-background hover:border-muted-foreground/30"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                      isSelected ? "border-primary bg-primary" : "border-muted-foreground/30"
                    }`}
                  >
                    {isSelected && <Check className="w-3 h-3 text-primary-foreground" />}
                  </div>
                  <div>
                    <p className="font-medium text-foreground text-sm">{opt.name}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{opt.desc}</p>
                  </div>
                </div>
                <span className="text-sm text-foreground font-medium">{opt.priceDisplay}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  )
);
InteriorStep.displayName = "InteriorStep";
