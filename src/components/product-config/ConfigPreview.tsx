import { Sparkles } from "lucide-react";
import productGallery from "@/assets/product-gallery.png";
import productInterior from "@/assets/product-interior.png";
import { aiValuePoints, specs } from "./data";

type PreviewTab = "exterior" | "interior";

interface ConfigPreviewProps {
  previewTab: PreviewTab;
  onPreviewTabChange: (tab: PreviewTab) => void;
  isVisible: boolean;
}

const tabs: { key: PreviewTab; label: string }[] = [
  { key: "exterior", label: "外观" },
  { key: "interior", label: "内饰" },
];

export function ConfigPreview({ previewTab, onPreviewTabChange, isVisible }: ConfigPreviewProps) {
  return (
    <div
      className={`lg:sticky lg:top-32 stagger-item ${isVisible ? "stagger-visible" : ""}`}
      style={{ transitionDelay: "0.1s" }}
    >
      {/* Apple 风格产品图切换 */}
      <div className="rounded-[2rem] overflow-hidden bg-gradient-subtle shadow-sm">
        <div className="relative aspect-[16/10]">
          <img
            src={previewTab === "exterior" ? productGallery : productInterior}
            alt={previewTab === "exterior" ? "Vitality 外观全景" : "Vitality 砂金内饰"}
            className="w-full h-full object-cover transition-opacity duration-500"
            loading="lazy"
          />
        </div>
        {/* 切换标签 */}
        <div className="flex items-center justify-center gap-2 p-4 bg-background/80 backdrop-blur-sm border-t border-border/30">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => onPreviewTabChange(tab.key)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                previewTab === tab.key
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 小元 AI 价值点 */}
      <div className="mt-6 p-6 bg-background rounded-2xl border border-border/50">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-4 h-4 text-primary" />
          <h4 className="text-sm font-medium text-foreground">小元 · 你的家庭健康管家</h4>
        </div>
        <div className="space-y-3">
          {aiValuePoints.map((p) => (
            <div key={p.title} className="flex items-baseline gap-3">
              <span className="text-foreground font-medium text-sm">{p.title}</span>
              <span className="text-muted-foreground text-sm">{p.desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Specs */}
      <div className="mt-6 p-6 bg-background rounded-2xl border border-border/50">
        <h4 className="text-sm font-medium text-muted-foreground mb-4">技术规格</h4>
        <div className="space-y-3">
          {specs.map((spec) => (
            <div key={spec.label} className="flex justify-between">
              <span className="text-muted-foreground text-sm">{spec.label}</span>
              <span className="text-foreground font-medium text-sm">{spec.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
