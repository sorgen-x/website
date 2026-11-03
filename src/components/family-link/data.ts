import { Check, AlertTriangle, Truck } from "lucide-react";

// 历史干预数据 - 模拟真实因果数据
export const historicalData = [
  { week: "第1周", correlation: 42, causal: 45, improvement: 3, interventions: 5 },
  { week: "第2周", correlation: 48, causal: 52, improvement: 7, interventions: 8 },
  { week: "第3周", correlation: 44, causal: 58, improvement: 13, interventions: 12 },
  { week: "第4周", correlation: 51, causal: 63, improvement: 18, interventions: 15 },
  { week: "第5周", correlation: 47, causal: 67, improvement: 22, interventions: 18 },
  { week: "第6周", correlation: 53, causal: 72, improvement: 27, interventions: 20 },
];

// 干预效果对比数据
export const interventionComparison = [
  { type: "热疗", correlationEffect: 12, causalEffect: 18, confidence: 94 },
  { type: "声波", correlationEffect: 8, causalEffect: 15, confidence: 91 },
  { type: "光疗", correlationEffect: 6, causalEffect: 11, confidence: 88 },
  { type: "综合", correlationEffect: 15, causalEffect: 32, confidence: 97 },
];

// 因果追溯数据
export const causalTracking = [
  { time: "0h", hrv: 38, sleepPressure: 65, cortisol: 18, intervention: null },
  { time: "1h", hrv: 42, sleepPressure: 58, cortisol: 15, intervention: "热疗启动" },
  { time: "2h", hrv: 48, sleepPressure: 45, cortisol: 12, intervention: "声波叠加" },
  { time: "3h", hrv: 55, sleepPressure: 32, cortisol: 9, intervention: null },
  { time: "4h", hrv: 62, sleepPressure: 22, cortisol: 7, intervention: null },
  { time: "5h", hrv: 68, sleepPressure: 15, cortisol: 6, intervention: "深睡进入" },
  { time: "6h", hrv: 72, sleepPressure: 10, cortisol: 5, intervention: null },
];

// 家庭连接特性
export const familyFeatures = [
  {
    icon: Check,
    color: "text-primary",
    bgColor: "bg-primary/10",
    title: "生命力红绿灯",
    description: "一眼看懂父母状态"
  },
  {
    icon: AlertTriangle,
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
    title: "静默危机预警",
    description: "独居异常自动提醒"
  },
  {
    icon: Truck,
    color: "text-sky-500",
    bgColor: "bg-sky-500/10",
    title: "远程干预投送",
    description: "子女购买服务，父母享受"
  }
];

export const chartConfig = {
    hrv: { label: "实际HRV", color: "hsl(var(--primary))" },
    baseline: { label: "基线", color: "hsl(var(--muted-foreground))" },
    predicted: { label: "预测值", color: "hsl(210 100% 70%)" },
    correlation: { label: "相关模型", color: "hsl(var(--muted-foreground))" },
    causal: { label: "因果模型", color: "hsl(var(--primary))" },
    improvement: { label: "HRV改善", color: "hsl(142 76% 36%)" },
    correlationEffect: { label: "相关预测", color: "hsl(var(--muted-foreground))" },
    causalEffect: { label: "因果预测", color: "hsl(var(--primary))" },
    sleepPressure: { label: "睡眠压力", color: "hsl(280 100% 70%)" },
    cortisol: { label: "皮质醇", color: "hsl(30 100% 50%)" },
  };
