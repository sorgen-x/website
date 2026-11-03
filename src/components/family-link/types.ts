import type { Dispatch, SetStateAction } from "react";

export interface PhoneMockProps {
  isSending: boolean;
  isSent: boolean;
  fatherStatus: "warning" | "success";
  handleSendSleepPackage: () => void;
  resetDemo: () => void;
}

export type RemoteInterventionProps = Omit<PhoneMockProps, "fatherStatus">;

export interface RealtimeSimulatorProps {
  thermalTemp: number[];
  setThermalTemp: Dispatch<SetStateAction<number[]>>;
  soundFreq: number[];
  setSoundFreq: Dispatch<SetStateAction<number[]>>;
  hrvData: { time: string; hrv: number; baseline: number; predicted: number }[];
  chartAnimationKey: number;
  calculateImprovement: () => number;
}

export interface CausalDataPanelProps {
  isVisible: boolean;
  activeTab: string;
  setActiveTab: Dispatch<SetStateAction<string>>;
}

export interface ChartPanelProps {
  isVisible: boolean;
}
