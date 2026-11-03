import { useState } from "react";
import { Brain, Users, Lock, HeartPulse, ChevronRight, Cpu } from "lucide-react";
import { TechnologyDetailDialog } from "./TechnologyDetailDialog";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const techFeatures = [
  {
    id: "ai-engine",
    icon: Brain,
    badge: "Neural Engine™",
    title: "比您更了解您的身体。",
    description: "利用军工级生物传感器，每秒处理 40,000 个数据点。构建数字生命孪生体。",
    size: "large",
    cta: "深入了解 小元",
  },
  {
    id: "multi-user",
    icon: Users,
    title: "全户识别。",
    description: "入舱即识别。自动切换专属监测基准与修复程序。",
    size: "normal",
  },
  {
    id: "privacy",
    icon: Lock,
    title: "数据金库。",
    description: "生物特征仅在本地加密芯片处理。您的健康秘密，仅属于您。",
    size: "normal",
  },
  {
    id: "expert",
    icon: HeartPulse,
    badge: "EXPERT CONNECT",
    title: "全球专家，随时待命。",
    description: "异常信号即时响应，一键连线顶级医疗团队。",
    size: "normal",
  },
];

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
    <section id="technology" className="py-24 lg:py-32 bg-background">
      <div ref={ref} className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className={`text-center max-w-3xl mx-auto mb-16 lg:mb-20 stagger-item ${isVisible ? 'stagger-visible' : ''}`}>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-foreground tracking-tight mb-6">
            强劲内芯，全家安心。
          </h2>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Large AI Engine Card */}
          <div 
            className={`md:col-span-2 lg:col-span-2 p-8 lg:p-10 rounded-3xl bg-card hover:shadow-medium transition-all duration-500 group cursor-pointer stagger-item ${isVisible ? 'stagger-visible' : ''}`}
            style={{ transitionDelay: '0.1s' }}
            onClick={() => handleItemClick("techSpec", "AI引擎")}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Brain className="w-7 h-7 text-primary" />
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted text-sm font-medium text-foreground">
                <Cpu className="w-4 h-4" />
                Neural Engine™
              </div>
            </div>
            <h3 className="text-2xl lg:text-3xl font-semibold text-foreground mb-4">
              比您更了解您的身体。
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6 max-w-xl">
              利用军工级生物传感器，每秒处理 40,000 个数据点。构建数字生命孪生体。
            </p>
            <button className="flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all">
              深入了解 小元
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Multi-user Card */}
          <div 
            className={`p-8 rounded-3xl bg-card hover:shadow-medium transition-all duration-500 group cursor-pointer stagger-item ${isVisible ? 'stagger-visible' : ''}`}
            style={{ transitionDelay: '0.2s' }}
            onClick={() => handleItemClick("techSpec", "账户体系")}
          >
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
              <Users className="w-6 h-6 text-primary" />
            </div>
            <h4 className="text-xl font-semibold text-foreground mb-3">
              全户识别。
            </h4>
            <p className="text-muted-foreground leading-relaxed">
              入舱即识别。自动切换专属监测基准与修复程序。
            </p>
            {/* Visual element - user avatars */}
            <div className="flex -space-x-3 mt-6">
              {[1, 2, 3, 4].map((i) => (
                <div 
                  key={i} 
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/40 border-2 border-background flex items-center justify-center text-xs font-medium text-primary"
                >
                  {['父', '母', '子', '女'][i - 1]}
                </div>
              ))}
            </div>
          </div>

          {/* Privacy Card */}
          <div 
            className={`p-8 rounded-3xl bg-card hover:shadow-medium transition-all duration-500 group cursor-pointer stagger-item ${isVisible ? 'stagger-visible' : ''}`}
            style={{ transitionDelay: '0.3s' }}
            onClick={() => handleItemClick("techSpec", "隐私安全")}
          >
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
              <Lock className="w-6 h-6 text-primary" />
            </div>
            <h4 className="text-xl font-semibold text-foreground mb-3">
              数据金库。
            </h4>
            <p className="text-muted-foreground leading-relaxed">
              生物特征仅在本地加密芯片处理。您的健康秘密，仅属于您。
            </p>
          </div>

          {/* Expert Connect Card */}
          <div 
            className={`md:col-span-2 p-8 rounded-3xl bg-card hover:shadow-medium transition-all duration-500 group cursor-pointer stagger-item ${isVisible ? 'stagger-visible' : ''}`}
            style={{ transitionDelay: '0.4s' }}
            onClick={() => handleItemClick("techSpec", "专家连接")}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <HeartPulse className="w-6 h-6 text-primary" />
              </div>
              <span className="px-3 py-1 rounded-full bg-primary/10 text-xs font-semibold text-primary tracking-wider">
                EXPERT CONNECT
              </span>
            </div>
            <h4 className="text-xl font-semibold text-foreground mb-3">
              全球专家，随时待命。
            </h4>
            <p className="text-muted-foreground leading-relaxed">
              异常信号即时响应，一键连线顶级医疗团队。
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
