import type { ExteriorOption, InteriorOption, ModelOption, OtherOption, Spec, StepKey, ValuePoint } from "./types";

export const models: ModelOption[] = [
  {
    id: "standard",
    name: "Aether",
    price: 0,
    priceDisplay: "咨询报价",
    features: ["舱内短时恢复", "声 · 光 · 热 · 氧 · 姿态", "家庭多用户", "基础服务"],
  },
  {
    id: "pro",
    name: "Aether Pro",
    price: 0,
    priceDisplay: "咨询报价",
    popular: true,
    features: ["全部标准配置", "增强传感", "优先支持", "延保可选"],
  },
  {
    id: "ultimate",
    name: "Aether Ultimate",
    price: 0,
    priceDisplay: "咨询报价",
    features: ["全部 Pro 配置", "外观定制", "专属交付", "长期支持"],
  },
];

export const exteriorOptions: ExteriorOption[] = [
  { id: "exterior-pearl", name: "多涂层珍珠白", price: 0, priceDisplay: "标配", swatch: "#F4F1EC" },
  { id: "exterior-obsidian", name: "曜石黑", price: 0, priceDisplay: "可选", swatch: "#1A1A1C" },
  { id: "exterior-gold", name: "鎏光金", price: 0, priceDisplay: "可选", swatch: "#C9A24C" },
  { id: "exterior-silver", name: "星河银", price: 0, priceDisplay: "可选", swatch: "#C8CCD2" },
];

export const interiorOptions: InteriorOption[] = [
  { id: "interior-linen", name: "云麻原色", desc: "天然亚麻 · 透气亲肤", price: 0, priceDisplay: "标配" },
  { id: "interior-nappa", name: "Nappa 真皮 · 米白", desc: "全粒面真皮 · 温润触感", price: 0, priceDisplay: "可选" },
  { id: "interior-nappa-black", name: "Nappa 真皮 · 玄黑", desc: "全粒面真皮 · 内敛沉稳", price: 0, priceDisplay: "可选" },
  { id: "interior-alcantara", name: "Alcantara · 麂皮灰", desc: "意大利进口 · 静谧包裹", price: 0, priceDisplay: "可选" },
];

export const otherOptions: OtherOption[] = [
  { id: "stand", name: "专属悬浮底座", desc: "极简一体成型", price: 0, priceDisplay: "可选" },
  { id: "aromatherapy", name: "香氛系统", desc: "精油自动调香", price: 0, priceDisplay: "可选" },
  { id: "speakers", name: "环绕扬声器", desc: "舱内声场增强", price: 0, priceDisplay: "可选" },
  { id: "redlight", name: "光谱光模块", desc: "柔和光谱补光", price: 0, priceDisplay: "可选" },
  { id: "cover", name: "防尘罩", desc: "日常收纳保护", price: 0, priceDisplay: "可选" },
  { id: "installation", name: "上门安装调试", desc: "交付与调试服务", price: 0, priceDisplay: "可选" },
];

export const specs: Spec[] = [
  { label: "定位", value: "家用恢复舱" },
  { label: "场景", value: "家庭室内空间" },
  { label: "使用", value: "短时沉浸恢复" },
];

export const aiValuePoints: ValuePoint[] = [
  { title: "两份输入。", desc: "授权后的全天穿戴，加上进舱这一刻体征；没戴也没关系。" },
  { title: "一套方案。", desc: "给出这一次的声、光、热、氧、姿态；也可选轻恢复。" },
  { title: "理解留下。", desc: "用得越久，下一次更贴合。报告是正反馈，不是焦虑。" },
];

export const stepDefs: { key: StepKey; label: string }[] = [
  { key: "model", label: "型号" },
  { key: "exterior", label: "外观" },
  { key: "interior", label: "内饰" },
  { key: "addons", label: "其他" },
  { key: "summary", label: "确认" },
];
