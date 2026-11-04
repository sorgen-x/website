import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Users, Check, Shield, Cpu } from "lucide-react";

interface TechnologyDetailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type: "certification" | "techSpec" | "rdMetric" | null;
  itemId: string | null;
}

const certificationDetails: Record<string, {
  title: string;
  icon: React.ElementType;
  description: string;
  details: string[];
  issuer: string;
  validUntil: string;
}> = {};

const techSpecDetails: Record<string, {
  title: string;
  icon: React.ElementType;
  description: string;
  specs: { label: string; value: string }[];
  advantages: string[];
}> = {
  "AI引擎": {
    title: "小元 · 舱内智能",
    icon: Cpu,
    description: "与 Aether 家用恢复舱深度整合的智能助手，帮助理解长期变化。",
    specs: [
      { label: "形态", value: "舱端 + App" },
      { label: "重点", value: "个人基线" },
      { label: "交互", value: "会话式引导" },
      { label: "隐私", value: "本地优先" }
    ],
    advantages: [
      "与硬件传感器联动",
      "家庭多用户档案",
      "克制呈现，避免过度医疗化表述",
      "需要同步时由用户授权"
    ]
  },
  "账户体系": {
    title: "全户识别",
    icon: Users,
    description: "入舱切换个人档案，各自保留基线与偏好。",
    specs: [
      { label: "档案", value: "多用户" },
      { label: "切换", value: "入舱识别" },
      { label: "偏好", value: "按人保存" },
      { label: "管理", value: "App 可查看" }
    ],
    advantages: [
      "家庭共享一台设备",
      "个人数据相互隔离",
      "减少重复设置",
      "适合长期使用"
    ]
  },
  "隐私安全": {
    title: "隐私与数据",
    icon: Shield,
    description: "敏感健康数据默认本地处理；云端同步需明确授权。",
    specs: [
      { label: "默认", value: "本地处理" },
      { label: "同步", value: "授权后可选" },
      { label: "传输", value: "加密通道" },
      { label: "控制", value: "用户可关闭" }
    ],
    advantages: [
      "生物特征优先留在设备",
      "不默认上传云端",
      "不承诺远程医疗连线",
      "可在设置中管理授权"
    ]
  },
};

const rdMetricDetails: Record<string, {
  title: string;
  description: string;
  highlights: { value: string; label: string }[];
  achievements: string[];
}> = {};

export function TechnologyDetailDialog({
  open,
  onOpenChange,
  type,
  itemId,
}: TechnologyDetailDialogProps) {
  if (!type || !itemId) return null;

  const renderCertificationDetail = () => {
    const cert = certificationDetails[itemId];
    if (!cert) return null;
    const Icon = cert.icon;

    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
            <Icon className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-foreground">{cert.title}</h3>
            <p className="text-sm text-muted-foreground mt-1">{cert.description}</p>
          </div>
        </div>

        <div className="bg-muted/30 rounded-2xl p-5 space-y-3">
          {cert.details.map((detail, index) => (
            <div key={index} className="flex items-start gap-3">
              <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <span className="text-sm text-foreground">{detail}</span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-card rounded-xl p-4 border border-border/50">
            <p className="text-xs text-muted-foreground mb-1">颁发机构</p>
            <p className="font-medium text-foreground">{cert.issuer}</p>
          </div>
          <div className="bg-card rounded-xl p-4 border border-border/50">
            <p className="text-xs text-muted-foreground mb-1">有效期至</p>
            <p className="font-medium text-foreground">{cert.validUntil}</p>
          </div>
        </div>
      </div>
    );
  };

  const renderTechSpecDetail = () => {
    const spec = techSpecDetails[itemId];
    if (!spec) return null;
    const Icon = spec.icon;

    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
            <Icon className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-foreground">{spec.title}</h3>
            <p className="text-sm text-muted-foreground mt-1">{spec.description}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {spec.specs.map((item) => (
            <div key={item.label} className="bg-muted/30 rounded-xl p-4">
              <p className="text-xs text-muted-foreground mb-1">{item.label}</p>
              <p className="text-lg font-semibold text-foreground">{item.value}</p>
            </div>
          ))}
        </div>

        <div>
          <h4 className="text-sm font-medium text-foreground mb-3">技术优势</h4>
          <div className="space-y-2">
            {spec.advantages.map((adv, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                  <Check className="w-3.5 h-3.5 text-primary" />
                </div>
                <span className="text-sm text-foreground">{adv}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderRdMetricDetail = () => {
    const metric = rdMetricDetails[itemId];
    if (!metric) return null;

    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold text-foreground">{metric.title}</h3>
          <p className="text-muted-foreground mt-1">{metric.description}</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {metric.highlights.map((item) => (
            <div key={item.label} className="bg-primary/5 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-primary">{item.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{item.label}</p>
            </div>
          ))}
        </div>

        <div>
          <h4 className="text-sm font-medium text-foreground mb-3">核心成就</h4>
          <div className="bg-muted/30 rounded-2xl p-5 space-y-3">
            {metric.achievements.map((achievement, index) => (
              <div key={index} className="flex items-start gap-3">
                <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-sm text-foreground">{achievement}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader className="sr-only">
          <DialogTitle>详情</DialogTitle>
          <DialogDescription>查看详细信息</DialogDescription>
        </DialogHeader>
        {type === "certification" && renderCertificationDetail()}
        {type === "techSpec" && renderTechSpecDetail()}
        {type === "rdMetric" && renderRdMetricDetail()}
      </DialogContent>
    </Dialog>
  );
}
