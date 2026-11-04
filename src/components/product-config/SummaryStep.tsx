import { forwardRef } from "react";
import type { ModelOption, SelectedAddon } from "./types";

interface SummaryStepProps {
  model: ModelOption;
  addons: SelectedAddon[];
  totalPrice: number;
}

export const SummaryStep = forwardRef<HTMLDivElement, SummaryStepProps>(
  ({ model, addons }, ref) => {
    const hasAddons = addons.length > 0;
    return (
      <div ref={ref} className="p-6 rounded-2xl bg-background border border-border/50 scroll-mt-32">
        <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3">⑤ 确认配置</p>
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-sm text-muted-foreground">已选配置</p>
            <p className="font-medium text-foreground">{model.name}</p>
          </div>
          <p className="text-sm font-medium text-muted-foreground">{model.priceDisplay}</p>
        </div>

        {hasAddons && (
          <div className="pt-4 border-t border-border/50 mb-4 space-y-2">
            {addons.map((addon) => (
              <div key={addon.id} className="flex justify-between text-sm">
                <span className="text-muted-foreground">{addon.name}</span>
                <span className="text-foreground">{addon.priceDisplay}</span>
              </div>
            ))}
          </div>
        )}

        <div className={`flex justify-between items-center ${hasAddons ? "pt-4 border-t border-border/50" : ""}`}>
          <span className="text-sm text-muted-foreground">下一步</span>
          <p className="text-lg font-semibold text-primary">预约咨询报价</p>
        </div>
      </div>
    );
  }
);
SummaryStep.displayName = "SummaryStep";
