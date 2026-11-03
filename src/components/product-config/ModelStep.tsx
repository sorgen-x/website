import { forwardRef } from "react";
import { Check } from "lucide-react";
import { models } from "./data";

interface ModelStepProps {
  selectedId: string;
  confirmingId: string | null;
  onSelect: (id: string) => void;
}

export const ModelStep = forwardRef<HTMLDivElement, ModelStepProps>(
  ({ selectedId, confirmingId, onSelect }, ref) => (
    <div ref={ref} className="scroll-mt-32">
      <h3 className="text-lg font-medium text-foreground mb-1">① 选择型号</h3>
      <p className="text-sm text-muted-foreground mb-4">由小元驱动的整套健康基线，因型号而异。</p>
      <div className="space-y-3">
        {models.map((model) => {
          const isSelected = selectedId === model.id;
          return (
            <button
              key={model.id}
              onClick={() => onSelect(model.id)}
              className={`w-full p-5 rounded-2xl border text-left transition-all duration-300 ${
                isSelected
                  ? `border-primary bg-primary/5 ${confirmingId === model.id ? "animate-confirm" : ""}`
                  : "border-border bg-background hover:border-muted-foreground/30"
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                      isSelected ? "border-primary bg-primary" : "border-muted-foreground/30"
                    }`}
                  >
                    {isSelected && <Check className="w-3 h-3 text-primary-foreground" />}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium text-foreground">{model.name}</h4>
                      {model.popular && (
                        <span className="px-2 py-0.5 text-xs bg-primary text-primary-foreground rounded-full">
                          推荐
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <p className="text-lg font-semibold text-foreground">{model.priceDisplay}</p>
              </div>
              <ul className="ml-8 grid grid-cols-2 gap-1.5">
                {model.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </button>
          );
        })}
      </div>
    </div>
  )
);
ModelStep.displayName = "ModelStep";
