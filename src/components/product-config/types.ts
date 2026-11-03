export type StepKey = "model" | "exterior" | "interior" | "addons" | "summary";

export interface ModelOption {
  id: string;
  name: string;
  price: number;
  priceDisplay: string;
  popular?: boolean;
  features: string[];
}

export interface ExteriorOption {
  id: string;
  name: string;
  price: number;
  priceDisplay: string;
  swatch: string;
}

export interface InteriorOption {
  id: string;
  name: string;
  desc: string;
  price: number;
  priceDisplay: string;
}

export interface OtherOption {
  id: string;
  name: string;
  desc: string;
  price: number;
  priceDisplay: string;
}

export interface Spec {
  label: string;
  value: string;
}

export interface ValuePoint {
  title: string;
  desc: string;
}

export interface CartItem {
  id: string;
  modelId: string;
  modelName: string;
  modelPrice: number;
  addons: { id: string; name: string; price: number }[];
  quantity: number;
}

export interface SelectedAddon {
  id: string;
  name: string;
  price: number;
  priceDisplay: string;
}
