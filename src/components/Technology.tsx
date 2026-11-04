import { useState } from "react";
import { Brain, Users, Lock, ChevronRight, Cpu } from "lucide-react";
import { TechnologyDetailDialog } from "./TechnologyDetailDialog";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export function Technology() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<"certification" | "techSpec" | "rdMetric" | null>(null);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const { ref, isVisible } = useScrollAnimation();

  const handleItemClick = (type: "certification" | "techSpec" | "rdMetric", itemId: string) => {
    setSelectedType(type);
    setSelectedItemId(itemId);
    setDialogOpen(true);
  };

  return (
    <section id="technology" className="py-24 lg:py-32 bg-card">
      <div ref={ref} className="max-w-6xl mx-auto px-6">
        <div className={`text-center max-w-3xl mx-auto mb-16 lg:mb-20 stagger-item ${isVisible ? "stagger-visible" : ""}`}>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-foreground tracking-tight mb-6">
            三个关键能力。
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            className={`md:col-span-2 lg:col-span-2 p-8 lg:p-10 rounded-3xl bg-background hover:shadow-medium transition-all duration-500 group cursor-pointer stagger-item ${isVisible ? "stagger-visible" : ""}`}
            style={{ transitionDelay: "0.1s" }}
            onClick={() => handleItemClick("techSpec", "AI引擎")}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Brain className="w-7 h-7 text-primary" />
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted text-sm font-medium text-foreground">
                <Cpu className="w-4 h-4" />
                小元
              </div>
            </div>
            <h3 className="text-2xl lg:text-3xl font-semibold text-foreground mb-4">更懂你的节奏。</h3>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6 max-w-xl">
              传感与算法在舱端协同，建立个人基线，用克制的方式呈现变化。
            </p>
            <button className="flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all">
              了解小元
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div
            className={`p-8 rounded-3xl bg-background hover:shadow-medium transition-all duration-500 group cursor-pointer stagger-item ${isVisible ? "stagger-visible" : ""}`}
            style={{ transitionDelay: "0.2s" }}
            onClick={() => handleItemClick("techSpec", "账户体系")}
          >
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
              <Users className="w-6 h-6 text-primary" />
            </div>
            <h4 className="text-xl font-semibold text-foreground mb-3">全户识别。</h4>
            <p className="text-muted-foreground leading-relaxed">
              入舱切换个人档案。每人有自己的基线与偏好。
            </p>
            <div className="flex -space-x-3 mt-6">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/40 border-2 border-background flex items-center justify-center text-xs font-medium text-primary"
                >
                  {["父", "母", "子", "女"][i - 1]}
                </div>
              ))}
            </div>
          </div>

          <div
            className={`md:col-span-2 lg:col-span-3 p-8 rounded-3xl bg-background hover:shadow-medium transition-all duration-500 group cursor-pointer stagger-item ${isVisible ? "stagger-visible" : ""}`}
            style={{ transitionDelay: "0.3s" }}
            onClick={() => handleItemClick("techSpec", "隐私安全")}
          >
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
              <Lock className="w-6 h-6 text-primary" />
            </div>
            <h4 className="text-xl font-semibold text-foreground mb-3">数据优先留在本地。</h4>
            <p className="text-muted-foreground leading-relaxed max-w-2xl">
              生物特征与敏感健康数据以本地处理为默认。需要同步时，由你明确授权。
            </p>
          </div>
        </div>
      </div>

      <TechnologyDetailDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        type={selectedType}
        itemId={selectedItemId}
      />
    </section>
  );
}
