import type { ExteriorOption, InteriorOption, ModelOption, OtherOption, Spec, StepKey, ValuePoint } from "./types";

export const models: ModelOption[] = [
  {
    id: "standard",
    name: "Vitality",
    price: 198000,
    priceDisplay: "¥198,000",
    features: ["AI健康预测引擎", "四维修复系统", "全户识别", "1年质保"],
  },
  {
    id: "pro",
    name: "Vitality Pro",
    price: 358000,
    priceDisplay: "¥358,000",
    popular: true,
    features: ["全部标准版功能", "增强型传感矩阵", "专家连接服务", "VIP健康顾问", "3年质保"],
  },
  {
    id: "ultimate",
    name: "Vitality Ultimate",
    price: 598000,
    priceDisplay: "¥598,000",
    features: ["全部Pro版功能", "私人定制外观", "终身数据服务", "专属上门服务", "终身质保"],
  },
];

// 外观涂层（单选）
export const exteriorOptions: ExteriorOption[] = [
  { id: "exterior-pearl", name: "多涂层珍珠白", price: 0, priceDisplay: "标配", swatch: "#F4F1EC" },
  { id: "exterior-obsidian", name: "曜石黑", price: 12000, priceDisplay: "+¥12,000", swatch: "#1A1A1C" },
  { id: "exterior-gold", name: "鎏光金", price: 28000, priceDisplay: "+¥28,000", swatch: "#C9A24C" },
  { id: "exterior-silver", name: "星河银", price: 18000, priceDisplay: "+¥18,000", swatch: "#C8CCD2" },
];

// 内饰（单选）
export const interiorOptions: InteriorOption[] = [
  { id: "interior-linen", name: "云麻原色", desc: "天然亚麻 · 透气亲肤", price: 0, priceDisplay: "标配" },
  { id: "interior-nappa", name: "Nappa 真皮 · 米白", desc: "全粒面真皮 · 温润触感", price: 22000, priceDisplay: "+¥22,000" },
  { id: "interior-nappa-black", name: "Nappa 真皮 · 玄黑", desc: "全粒面真皮 · 内敛沉稳", price: 22000, priceDisplay: "+¥22,000" },
  { id: "interior-alcantara", name: "Alcantara · 麂皮灰", desc: "意大利进口 · 静谧包裹", price: 32000, priceDisplay: "+¥32,000" },
];

// 其他配置（多选）
export const otherOptions: OtherOption[] = [
  { id: "stand", name: "专属悬浮底座", desc: "极简一体成型", price: 8800, priceDisplay: "+¥8,800" },
  { id: "aromatherapy", name: "香疗系统", desc: "六味精油自动调香", price: 5800, priceDisplay: "+¥5,800" },
  { id: "speakers", name: "高级环绕式扬声器", desc: "丹麦定制 · 4D 声场", price: 16800, priceDisplay: "+¥16,800" },
  { id: "redlight", name: "全光谱红光模块", desc: "细胞级深层修复", price: 12800, priceDisplay: "+¥12,800" },
  { id: "cover", name: "纳米防尘罩", desc: "静电吸附 · 即取即用", price: 2800, priceDisplay: "+¥2,800" },
  { id: "installation", name: "上门安装调试", desc: "白手套交付服务", price: 3000, priceDisplay: "+¥3,000" },
];

export const specs: Spec[] = [
  { label: "材质", value: "航空级碳纤维 + 阳极氧化铝" },
  { label: "占地面积", value: "2.4 m²" },
  { label: "传感器", value: "Gen-4 Biosense 矩阵" },
];

// 小元 AI 健康管理价值点（特斯拉式极简话术）
export const aiValuePoints: ValuePoint[] = [
  { title: "看得更早。", desc: "比症状提前 48 小时预警。" },
  { title: "懂你更深。", desc: "2,000+ 项指标，专属健康基线。" },
  { title: "答得更快。", desc: "小元 24/7 在线，一句话即响应。" },
];

export const stepDefs: { key: StepKey; label: string }[] = [
  { key: "model", label: "型号" },
  { key: "exterior", label: "外观" },
  { key: "interior", label: "内饰" },
  { key: "addons", label: "其他" },
  { key: "summary", label: "结算" },
];
