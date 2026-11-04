import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Brain, Smartphone, Box, ArrowRight, MessageCircle, TrendingUp, ListTodo, Eye, Download } from "lucide-react";
import { ProductDetailDialog } from "./ProductDetailDialog";
import { DownloadQRDialog } from "./DownloadQRDialog";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

type ProductType = "ai-xiaoyuan" | "app" | "recovery-pod";

const products = [
  {
    id: "ai-xiaoyuan" as ProductType,
    icon: Brain,
    title: "小元",
    subtitle: "你的私人健康管理助手",
    description: "把专业的健康管理能力，转化为每天都能用得上的陪伴式助手。",
    features: [
      { icon: MessageCircle, text: "理解你的状态" },
      { icon: TrendingUp, text: "解读你的数据" },
      { icon: ListTodo, text: "给你当天「能做到」的建议" },
      { icon: Eye, text: "解压、情绪对话聊天" },
    ],
    note: "不做诊断，只做陪伴式健康管理",
    cta: "了解 小元",
    hasDownload: false,
  },
  {
    id: "app" as ProductType,
    icon: Smartphone,
    title: "SORGEN App",
    subtitle: "每日健康管理移动端",
    description: "把复杂的健康管理，拆解成每天的小任务。",
    features: [
      { icon: ListTodo, text: "每日饮食、运动、睡眠建议" },
      { icon: TrendingUp, text: "状态记录与趋势观察" },
      { icon: Eye, text: "查看智能恢复舱的实时状态" },
    ],
    note: "让关心变得更从容，而不是更紧张",
    cta: "查看 App 能力",
    hasDownload: true,
  },
  {
    id: "recovery-pod" as ProductType,
    icon: Box,
    title: "恢复舱",
    subtitle: "健康管理执行终端",
    description: "基于非接触式感知与 AI 分析的居家健康状态管理执行空间，用于长期观察身体状态变化，并辅助健康管理。",
    features: [
      { icon: MessageCircle, text: "放松身体" },
      { icon: TrendingUp, text: "调整节律" },
      { icon: Eye, text: "皮肤管理" },
      { icon: ListTodo, text: "健康管理的「固定执行场景」" },
    ],
    note: "恢复舱不是医疗设备，而是健康管理中的「执行空间」",
    cta: "了解执行终端",
    hasDownload: false,
  },
];

export function CoreProducts() {
  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(null);
  const [downloadOpen, setDownloadOpen] = useState(false);
  const { ref, isVisible } = useScrollAnimation();
  
  return (
    <section id="core-products" className="py-24 lg:py-32 bg-background">
      <div ref={ref} className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className={`text-center max-w-3xl mx-auto mb-16 lg:mb-24 scroll-hidden ${isVisible ? 'scroll-visible' : ''}`}>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-foreground tracking-tight mb-6">
            三位一体健康管理
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            基于专业健康管理方法论，将复杂的健康理念转化为普通人可以长期执行的日常管理方案
          </p>
        </div>

        {/* Products Grid */}
        <div className="space-y-8">
          {products.map((product, index) => (
            <div
              key={product.id}
              className={`grid lg:grid-cols-2 gap-8 lg:gap-16 items-center scroll-hidden ${isVisible ? 'scroll-visible' : ''} ${
                index % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
              style={{ transitionDelay: `${index * 0.15}s` }}
            >
              {/* Content */}
              <div className={`space-y-6 ${index % 2 === 1 ? "lg:order-2" : ""}`}>
                <div className={`flex items-center gap-3 stagger-item ${isVisible ? 'stagger-visible' : ''}`} style={{ transitionDelay: `${index * 0.15 + 0.1}s` }}>
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <product.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-semibold text-foreground">
                      {product.title}
                    </h3>
                    <p className="text-primary font-medium">{product.subtitle}</p>
                  </div>
                </div>

                <p className={`text-lg text-muted-foreground leading-relaxed stagger-item ${isVisible ? 'stagger-visible' : ''}`} style={{ transitionDelay: `${index * 0.15 + 0.2}s` }}>
                  {product.description}
                </p>

                <div className="space-y-3">
                  {product.features.map((feature, fIndex) => (
                    <div 
                      key={fIndex} 
                      className={`flex items-center gap-3 stagger-item ${isVisible ? 'stagger-visible' : ''}`}
                      style={{ transitionDelay: `${index * 0.15 + 0.25 + fIndex * 0.08}s` }}
                    >
                      <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center">
                        <feature.icon className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-foreground">{feature.text}</span>
                    </div>
                  ))}
                </div>

                <div className={`bg-primary/5 border border-primary/10 rounded-xl p-4 stagger-item ${isVisible ? 'stagger-visible' : ''}`} style={{ transitionDelay: `${index * 0.15 + 0.5}s` }}>
                  <p className="text-sm text-muted-foreground italic">
                    {product.note}
                  </p>
                </div>

                <div className={`flex flex-wrap gap-3 stagger-item ${isVisible ? 'stagger-visible' : ''}`} style={{ transitionDelay: `${index * 0.15 + 0.6}s` }}>
                  <Button 
                    variant="appleOutline" 
                    size="lg"
                    onClick={() => setSelectedProduct(product.id)}
                  >
                    {product.cta}
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                  {product.hasDownload && (
                    <Button 
                      variant="hero" 
                      size="lg"
                      onClick={() => setDownloadOpen(true)}
                    >
                      <Download className="w-4 h-4" />
                      下载 App
                    </Button>
                  )}
                </div>
              </div>

              {/* Visual Card */}
              <div className={`${index % 2 === 1 ? "lg:order-1" : ""}`}>
                <div className={`aspect-square rounded-3xl bg-gradient-subtle flex items-center justify-center p-12 stagger-item ${isVisible ? 'stagger-visible' : ''}`} style={{ transitionDelay: `${index * 0.15 + 0.3}s` }}>
                  <product.icon className="w-32 h-32 text-primary/20" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ProductDetailDialog
        open={selectedProduct !== null}
        onOpenChange={(open) => !open && setSelectedProduct(null)}
        productType={selectedProduct || "ai-xiaoyuan"}
      />

      <DownloadQRDialog 
        open={downloadOpen} 
        onOpenChange={setDownloadOpen} 
      />
    </section>
  );
}
