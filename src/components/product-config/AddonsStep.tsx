import { forwardRef } from "react";
import { Check, Package } from "lucide-react";
import { otherOptions } from "./data";

interface AddonsStepProps {
  selectedIds: string[];
  onToggle: (id: string) => void;
}

export const AddonsStep = forwardRef<HTMLDivElement, AddonsStepProps>(
  ({ selectedIds, onToggle }, ref) => (
    <div ref={ref} className="scroll-mt-32">
      <div className="flex items-center gap-2 mb-1">
        <Package className="w-4 h-4 text-muted-foreground" />
        <h3 className="text-lg font-medium text-foreground">④ 其他配置</h3>
      </div>
      <p className="text-sm text-muted-foreground mb-4">按需叠加。每一项，都被小元纳入您的健康方案。</p>
      <div className="grid grid-cols-2 gap-3">
        {otherOptions.map((addon) => {
          const isSelected = selectedIds.includes(addon.id);
          return (
            <button
              key={addon.id}
              onClick={() => onToggle(addon.id)}
              className={`p-4 rounded-xl border text-left transition-all duration-300 ${
                isSelected
                  ? "border-primary bg-primary/5"
                  : "border-border bg-background hover:border-muted-foreground/30"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium text-foreground text-sm">{addon.name}</span>
                <div
                  className={`w-4 h-4 rounded border flex items-center justify-center transition-all flex-shrink-0 ${
                    isSelected ? "border-primary bg-primary" : "border-muted-foreground/30"
                  }`}
                >
                  {isSelected && <Check className="w-2.5 h-2.5 text-primary-foreground" />}
                </div>
              </div>
              <p className="text-xs text-muted-foreground mb-1">{addon.desc}</p>
              <span className="text-sm text-muted-foreground">{addon.priceDisplay}</span>
            </button>
          );
        })}
      </div>
    </div>
  )
);
AddonsStep.displayName = "AddonsStep";
