import { AlertCircle } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export function Disclaimer() {
  const { ref, isVisible } = useScrollAnimation();
  
  return (
    <section id="disclaimer" className="py-16 bg-background">
      <div ref={ref} className="max-w-4xl mx-auto px-6">
        <div className={`flex items-start gap-4 p-6 rounded-2xl bg-card border border-border scroll-hidden ${isVisible ? 'scroll-visible' : ''}`}>
          <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center flex-shrink-0">
            <AlertCircle className="w-5 h-5 text-muted-foreground" />
          </div>
          <div>
            <h4 className="font-medium text-foreground mb-2">声明</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Vitality 提供的是健康预测与生活方式优化方案，不构成医疗诊断或治疗建议。如有明确疾病或身体不适，请及时就医并遵循专业医生意见。所有健康数据均在本地加密处理，不上传至云端。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
