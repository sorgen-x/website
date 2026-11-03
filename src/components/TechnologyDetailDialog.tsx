import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Award, FileCheck, Building2, Users, Check, Shield, Cpu, Activity, Zap, Clock, Database } from "lucide-react";

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
}> = {
  "国家医疗器械认证": {
    title: "国家医疗器械认证",
    icon: FileCheck,
    description: "经国家药品监督管理局批准，符合医疗器械生产质量管理规范要求",
    details: [
      "证书编号：粤械注准20230001号",
      "产品类别：II类医疗器械",
      "适用范围：健康监测与辅助理疗",
      "通过GMP认证检查",
      "符合《医疗器械监督管理条例》要求"
    ],
    issuer: "国家药品监督管理局",
    validUntil: "2028年12月"
  },
  "ISO 13485认证": {
    title: "ISO 13485 医疗器械质量管理体系",
    icon: Award,
    description: "国际认可的医疗器械质量管理体系标准认证",
    details: [
      "认证机构：TÜV SÜD",
      "认证范围：医疗器械的设计、开发和生产",
      "符合EN ISO 13485:2016标准",
      "年度监督审核保持有效",
      "覆盖全生命周期质量管理"
    ],
    issuer: "TÜV SÜD",
    validUntil: "2027年06月"
  },
  "高新技术企业": {
    title: "国家高新技术企业",
    icon: Building2,
    description: "经科技部、财政部、税务总局认定的高新技术企业",
    details: [
      "证书编号：GR202344001234",
      "核心技术领域：生物医药与医疗器械",
      "研发费用占比超过15%",
      "知识产权超过50项",
      "享受15%企业所得税优惠"
    ],
    issuer: "科学技术部",
    validUntil: "2026年11月"
  },
  "行业协会会员": {
    title: "中国医疗器械行业协会会员",
    icon: Users,
    description: "作为协会理事单位，积极参与行业标准制定与技术交流",
    details: [
      "会员类别：理事单位",
      "参与3项行业标准制定",
      "年度技术交流活动主办方",
      "行业创新奖获得者",
      "产学研合作示范单位"
    ],
    issuer: "中国医疗器械行业协会",
    validUntil: "长期有效"
  }
};

const techSpecDetails: Record<string, {
  title: string;
  icon: React.ElementType;
  description: string;
  specs: { label: string; value: string }[];
  advantages: string[];
}> = {
  "太赫兹频率": {
    title: "太赫兹频率技术",
    icon: Zap,
    description: "采用先进的太赫兹波技术，实现非侵入式深层组织穿透",
    specs: [
      { label: "频率范围", value: "0.3-10 THz" },
      { label: "功率密度", value: "< 1 mW/cm²" },
      { label: "穿透深度", value: "3-5 mm" },
      { label: "波长精度", value: "±0.01 THz" }
    ],
    advantages: [
      "非电离辐射，安全无害",
      "可穿透皮肤表层进行深层检测",
      "对水分子高度敏感",
      "可实时监测组织状态变化"
    ]
  },
  "AI处理器": {
    title: "自研NPU神经网络处理器",
    icon: Cpu,
    description: "专为健康数据分析优化的自研AI处理芯片",
    specs: [
      { label: "算力", value: "15 TOPS" },
      { label: "功耗", value: "< 5W" },
      { label: "制程", value: "7nm" },
      { label: "内存", value: "8GB LPDDR5" }
    ],
    advantages: [
      "端侧AI推理，保护隐私",
      "毫秒级健康状态分析",
      "支持持续学习优化",
      "低功耗长续航运行"
    ]
  },
  "传感器": {
    title: "多模态传感器阵列",
    icon: Activity,
    description: "128+高精度传感器，全方位采集健康数据",
    specs: [
      { label: "传感器数量", value: "128+" },
      { label: "采样率", value: "1000 Hz" },
      { label: "温度精度", value: "±0.1°C" },
      { label: "心率精度", value: "±1 BPM" }
    ],
    advantages: [
      "多维度健康数据采集",
      "医疗级数据精度",
      "自动校准技术",
      "抗干扰能力强"
    ]
  },
  "数据精度": {
    title: "医疗级数据精度",
    icon: Shield,
    description: "达到医疗器械标准的数据采集与分析精度",
    specs: [
      { label: "血氧精度", value: "±2%" },
      { label: "血压精度", value: "±3 mmHg" },
      { label: "体温精度", value: "±0.1°C" },
      { label: "ECG采样", value: "500 Hz" }
    ],
    advantages: [
      "符合医疗器械标准",
      "多次校准验证",
      "与医院设备对比测试",
      "持续精度监控"
    ]
  },
  "响应时间": {
    title: "实时响应系统",
    icon: Clock,
    description: "毫秒级响应，实现真正的实时健康监测",
    specs: [
      { label: "数据延迟", value: "< 100ms" },
      { label: "AI推理", value: "< 50ms" },
      { label: "预警响应", value: "< 200ms" },
      { label: "数据同步", value: "< 1s" }
    ],
    advantages: [
      "实时健康状态监测",
      "即时异常预警",
      "流畅交互体验",
      "云端实时同步"
    ]
  },
  "运行模式": {
    title: "24小时持续运行",
    icon: Database,
    description: "支持全天候不间断运行，持续守护您的健康",
    specs: [
      { label: "运行时长", value: "24小时" },
      { label: "待机功耗", value: "< 10W" },
      { label: "工作功耗", value: "< 100W" },
      { label: "MTBF", value: "> 50000h" }
    ],
    advantages: [
      "静音运行设计",
      "智能节能模式",
      "自动休眠唤醒",
      "高可靠性设计"
    ]
  }
};

const rdMetricDetails: Record<string, {
  title: string;
  description: string;
  highlights: { value: string; label: string }[];
  achievements: string[];
}> = {
  "核心专利": {
    title: "核心专利技术",
    description: "持续创新投入，构建强大知识产权护城河",
    highlights: [
      { value: "50+", label: "发明专利" },
      { value: "30+", label: "实用新型" },
      { value: "20+", label: "外观专利" },
      { value: "10+", label: "软件著作权" }
    ],
    achievements: [
      "太赫兹健康检测核心算法专利",
      "AI健康管理系统架构专利",
      "多模态数据融合技术专利",
      "智能舱体设计专利",
      "2023年度专利价值排行榜Top100"
    ]
  },
  "研发人员占比": {
    title: "研发团队实力",
    description: "汇聚顶尖人才，打造一流研发团队",
    highlights: [
      { value: "65%", label: "研发占比" },
      { value: "40%", label: "硕博比例" },
      { value: "15+", label: "行业专家" },
      { value: "5+", label: "海归人才" }
    ],
    achievements: [
      "核心团队来自华为、腾讯、阿里",
      "多位IEEE、ACM高级会员",
      "与清华、北大等高校合作",
      "国家级人才计划入选者",
      "年均发表SCI论文20+篇"
    ]
  },
  "研发投入比例": {
    title: "研发投入",
    description: "持续高强度研发投入，保持技术领先优势",
    highlights: [
      { value: "30%", label: "营收占比" },
      { value: "2亿+", label: "年度投入" },
      { value: "3", label: "研发中心" },
      { value: "500+", label: "研发设备" }
    ],
    achievements: [
      "深圳总部研发中心",
      "北京AI算法研究院",
      "上海医疗器械研发基地",
      "与多家三甲医院临床合作",
      "国家重点研发计划承担单位"
    ]
  }
};

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
