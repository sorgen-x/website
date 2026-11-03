import { Button } from "@/components/ui/button";
import { MessageCircle, BarChart3, Calendar, Bell } from "lucide-react";

const assistantFeatures = [
  {
    icon: MessageCircle,
    title: "智能对话",
    description: "24小时AI健康顾问",
  },
  {
    icon: BarChart3,
    title: "数据分析",
    description: "深度分析健康趋势",
  },
  {
    icon: Calendar,
    title: "恢复计划",
    description: "个性化日程安排",
  },
  {
    icon: Bell,
    title: "智能提醒",
    description: "关键指标预警",
  },
];

export function AIAssistant() {
  return (
    <section id="ai-assistant" className="py-24 lg:py-32 bg-background">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* App Preview Mock */}
          <div className="relative order-2 lg:order-1">
            {/* Phone mockup */}
            <div className="relative mx-auto w-72 lg:w-80">
              <div className="relative bg-foreground rounded-[3rem] p-2 shadow-large">
                <div className="bg-background rounded-[2.5rem] overflow-hidden">
                  {/* Status bar */}
                  <div className="h-12 flex items-center justify-center">
                    <div className="w-24 h-6 rounded-full bg-foreground" />
                  </div>
                  
                  {/* App content mock */}
                  <div className="p-6 space-y-5 pb-8">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-muted-foreground">欢迎回来</p>
                        <p className="text-lg font-semibold text-foreground">健康概览</p>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-primary" />
                    </div>

                    {/* Health score */}
                    <div className="bg-card rounded-2xl p-5">
                      <p className="text-xs text-muted-foreground mb-2">今日健康评分</p>
                      <div className="flex items-end gap-2">
                        <span className="text-4xl font-semibold text-foreground">92</span>
                        <span className="text-sm text-primary mb-1">优秀</span>
                      </div>
                      <div className="mt-4 h-1.5 rounded-full bg-muted overflow-hidden">
                        <div className="h-full w-[92%] bg-primary rounded-full" />
                      </div>
                    </div>

                    {/* Quick stats */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-card rounded-xl p-4">
                        <p className="text-xs text-muted-foreground">心率</p>
                        <p className="text-xl font-semibold text-foreground">72 <span className="text-sm font-normal">bpm</span></p>
                      </div>
                      <div className="bg-card rounded-xl p-4">
                        <p className="text-xs text-muted-foreground">睡眠</p>
                        <p className="text-xl font-semibold text-foreground">8.5 <span className="text-sm font-normal">小时</span></p>
                      </div>
                    </div>

                    {/* AI suggestion */}
                    <div className="bg-primary/5 rounded-2xl p-4 border border-primary/10">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                          <span className="text-[10px] text-primary-foreground font-medium">AI</span>
                        </div>
                        <span className="text-sm font-medium text-foreground">AI建议</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        建议今晚使用舒眠模式，优化睡眠质量...
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-8 order-1 lg:order-2">
            <p className="text-primary font-medium">软硬件深度融合</p>

            <h2 className="text-4xl sm:text-5xl font-semibold text-foreground tracking-tight">
              AI健康管理助手
            </h2>

            <p className="text-xl text-muted-foreground leading-relaxed">
              不只是一个App，而是与Vitality硬件深度整合的智能健康管理系统。
              通过实时数据同步与AI分析，为您提供真正个性化的健康建议。
            </p>

            <div className="grid grid-cols-2 gap-4">
              {assistantFeatures.map((feature) => (
                <div key={feature.title} className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">{feature.title}</h4>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <Button variant="hero" size="lg">
              下载App
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
