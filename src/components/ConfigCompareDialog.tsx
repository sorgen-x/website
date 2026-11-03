import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check, Sparkles } from "lucide-react";

export interface ExteriorCompareItem {
  id: string;
  name: string;
  price: number;
  priceDisplay: string;
  swatch: string;
}

export interface InteriorCompareItem {
  id: string;
  name: string;
  desc: string;
  price: number;
  priceDisplay: string;
}

const exteriorAttrs: Record<string, { texture: string; finish: string; vibe: string; care: string; highlight: string }> = {
  "exterior-pearl": { texture: "微珠光多涂层", finish: "柔和哑光", vibe: "纯净 · 日常", care: "易打理", highlight: "光线下细微珠光流动" },
  "exterior-obsidian": { texture: "深色钢琴漆", finish: "高反射镜面", vibe: "沉稳 · 内敛", care: "需定期擦拭", highlight: "如曜石般深邃质感" },
  "exterior-gold": { texture: "PVD 镀金涂层", finish: "暖色金属光", vibe: "尊贵 · 收藏级", care: "建议白手套", highlight: "限量编号 · 收藏级工艺" },
  "exterior-silver": { texture: "阳极氧化银", finish: "细腻拉丝", vibe: "未来 · 科技感", care: "易打理", highlight: "航天级铝合金质感" },
};

const interiorAttrs: Record<string, { material: string; touch: string; breathable: string; care: string; highlight: string }> = {
  "interior-linen": { material: "天然亚麻", touch: "干爽透气", breathable: "极佳", care: "可机洗替换", highlight: "环保可降解 · 四季亲肤" },
  "interior-nappa": { material: "Nappa 全粒面真皮", touch: "温润细腻", breathable: "良好", care: "专业护理", highlight: "顶级小牛皮 · 米白柔光" },
  "interior-nappa-black": { material: "Nappa 全粒面真皮", touch: "温润细腻", breathable: "良好", care: "专业护理", highlight: "顶级小牛皮 · 玄黑沉静" },
  "interior-alcantara": { material: "Alcantara 麂皮", touch: "丝绒包裹", breathable: "中等", care: "专业护理", highlight: "意大利进口 · 静谧高级" },
};

// 内饰缩略图色板（用于代表材质的视觉色）
const interiorSwatch: Record<string, { base: string; accent: string; pattern?: string }> = {
  "interior-linen": { base: "#EFE7D6", accent: "#C9B89A", pattern: "linen" },
  "interior-nappa": { base: "#EFE3D2", accent: "#C9A87C" },
  "interior-nappa-black": { base: "#1F1D1B", accent: "#3A3633" },
  "interior-alcantara": { base: "#7E7C7A", accent: "#54514E" },
};

interface Props<T> {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  type: "exterior" | "interior";
  items: T[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export function ConfigCompareDialog<
  T extends ExteriorCompareItem | InteriorCompareItem
>({ open, onOpenChange, type, items, selectedId, onSelect }: Props<T>) {
  const isExterior = type === "exterior";

  const handlePick = (id: string) => {
    onSelect(id);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isExterior ? "外观对比" : "内饰对比"}</DialogTitle>
          <DialogDescription>
            {isExterior
              ? "并排查看不同涂层的质感、光泽与日常打理。"
              : "并排查看不同材质的触感、透气性与护理方式。"}
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
          {items.map((opt) => {
            const isSelected = opt.id === selectedId;
            const attrs = isExterior
              ? exteriorAttrs[opt.id]
              : interiorAttrs[opt.id];
            const swatch = !isExterior ? interiorSwatch[opt.id] : undefined;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => handlePick(opt.id)}
                className={`group text-left rounded-2xl border p-4 flex flex-col transition-all hover:shadow-md hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-primary/40 ${
                  isSelected ? "border-primary bg-primary/5 ring-1 ring-primary/30" : "border-border bg-background"
                }`}
              >
                {isExterior ? (
                  <div
                    className="aspect-square rounded-xl mb-3 border border-border/50 shadow-inner relative overflow-hidden"
                    style={{
                      background: `radial-gradient(circle at 30% 25%, rgba(255,255,255,0.55), transparent 55%), ${(opt as ExteriorCompareItem).swatch}`,
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/15" />
                  </div>
                ) : (
                  <div
                    className="aspect-square rounded-xl mb-3 border border-border/50 shadow-inner relative overflow-hidden"
                    style={{
                      background: `linear-gradient(135deg, ${swatch?.base} 0%, ${swatch?.accent} 100%)`,
                    }}
                  >
                    {swatch?.pattern === "linen" && (
                      <div
                        className="absolute inset-0 opacity-40 mix-blend-overlay"
                        style={{
                          backgroundImage:
                            "repeating-linear-gradient(45deg, rgba(255,255,255,0.25) 0 1px, transparent 1px 4px), repeating-linear-gradient(-45deg, rgba(0,0,0,0.08) 0 1px, transparent 1px 4px)",
                        }}
                      />
                    )}
                    <div className="absolute bottom-2 left-2 right-2 text-[10px] text-white/90 drop-shadow">
                      {(opt as InteriorCompareItem).desc}
                    </div>
                  </div>
                )}
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-medium text-foreground text-sm">{opt.name}</h4>
                  {isSelected && <Check className="w-4 h-4 text-primary" />}
                </div>
                <p className="text-xs text-muted-foreground mb-2">{opt.priceDisplay}</p>

                {attrs?.highlight && (
                  <div className="flex items-start gap-1.5 mb-3 text-[11px] text-primary/90">
                    <Sparkles className="w-3 h-3 mt-0.5 shrink-0" />
                    <span>{attrs.highlight}</span>
                  </div>
                )}

                {attrs && (
                  <ul className="space-y-1.5 text-xs text-muted-foreground mb-4 flex-1">
                    {Object.entries(attrs)
                      .filter(([k]) => k !== "highlight")
                      .map(([k, v]) => (
                        <li key={k} className="flex justify-between gap-2">
                          <span className="text-muted-foreground/70">{labelMap[k]}</span>
                          <span className="text-foreground text-right">{v}</span>
                        </li>
                      ))}
                  </ul>
                )}

                <span
                  className={`mt-auto inline-flex items-center justify-center w-full rounded-md text-xs font-medium py-2 transition-colors ${
                    isSelected
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-foreground group-hover:bg-primary group-hover:text-primary-foreground"
                  }`}
                >
                  {isSelected ? "已选择" : "点击选中"}
                </span>
              </button>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}

const labelMap: Record<string, string> = {
  texture: "工艺",
  finish: "光泽",
  vibe: "氛围",
  care: "保养",
  material: "材质",
  touch: "触感",
  breathable: "透气",
};
