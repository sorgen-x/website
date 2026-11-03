import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { motion } from "framer-motion";
import { AnimatedNumber } from "./AnimatedNumber";
import { chartConfig } from "./data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Activity, Thermometer, Volume2, Zap } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts";
import type { RealtimeSimulatorProps } from "./types";

export function RealtimeSimulator({ thermalTemp, setThermalTemp, soundFreq, setSoundFreq, hrvData, chartAnimationKey, calculateImprovement }: RealtimeSimulatorProps) {
  return (
            <Card className="border-0 shadow-large bg-card h-full">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Activity className="w-5 h-5 text-primary" />
                  实时因果预测器
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  调整参数，观察因果模型的实时预测
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Sliders */}
                <div className="space-y-5">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Thermometer className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium text-foreground">热疗温度</span>
                      </div>
                      <motion.span 
                        className="text-sm font-semibold text-primary"
                        key={thermalTemp[0]}
                        initial={{ scale: 1.2 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.2 }}
                      >
                        {thermalTemp[0]}°C
                      </motion.span>
                    </div>
                    <Slider
                      value={thermalTemp}
                      onValueChange={setThermalTemp}
                      min={35}
                      max={45}
                      step={0.5}
                      className="cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>35°C (无效)</span>
                      <span>45°C (最佳)</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Volume2 className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium text-foreground">声波频率</span>
                      </div>
                      <motion.span 
                        className="text-sm font-semibold text-primary"
                        key={soundFreq[0]}
                        initial={{ scale: 1.2 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.2 }}
                      >
                        {soundFreq[0]}Hz
                      </motion.span>
                    </div>
                    <Slider
                      value={soundFreq}
                      onValueChange={setSoundFreq}
                      min={396}
                      max={639}
                      step={1}
                      className="cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>396Hz (基础)</span>
                      <span>639Hz</span>
                    </div>
                  </div>
                </div>

                {/* Prediction Chart */}
                <motion.div 
                  className="bg-muted/30 rounded-xl p-4"
                  key={chartAnimationKey}
                  initial={{ opacity: 0.5 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-foreground">HRV 预测曲线</span>
                    <div className="flex items-center gap-3 text-xs">
                      <div className="flex items-center gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                        <span className="text-muted-foreground">实际</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="w-2.5 h-0.5 bg-primary/50" />
                        <span className="text-muted-foreground">预测</span>
                      </div>
                    </div>
                  </div>
                  
                  <ChartContainer config={chartConfig} className="h-[180px] w-full">
                    <LineChart data={hrvData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="time" tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" />
                      <YAxis domain={[40, 75]} tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line 
                        type="monotone" 
                        dataKey="baseline" 
                        stroke="hsl(var(--muted-foreground))" 
                        strokeWidth={1} 
                        strokeDasharray="5 5" 
                        dot={false}
                        isAnimationActive={true}
                        animationDuration={800}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="predicted" 
                        stroke="hsl(var(--primary))" 
                        strokeWidth={1.5} 
                        strokeDasharray="3 3" 
                        dot={false} 
                        opacity={0.6}
                        isAnimationActive={true}
                        animationDuration={1000}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="hrv" 
                        stroke="hsl(var(--primary))" 
                        strokeWidth={2.5} 
                        dot={{ fill: "hsl(var(--primary))", strokeWidth: 0, r: 3 }}
                        isAnimationActive={true}
                        animationDuration={1200}
                        animationEasing="ease-out"
                      />
                    </LineChart>
                  </ChartContainer>
                </motion.div>

                {/* Insight Box */}
                <motion.div 
                  className="bg-primary/5 rounded-xl p-4 border border-primary/10"
                  key={`insight-${chartAnimationKey}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="w-4 h-4 text-primary" />
                    <p className="text-sm text-foreground font-medium">因果预测结果</p>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    预计60分钟内HRV提升 <span className="text-primary font-bold text-sm"><AnimatedNumber value={calculateImprovement()} suffix="%" /></span>
                    ，置信度 <span className="text-primary font-semibold">94.2%</span>。
                    此预测基于 <span className="font-medium text-foreground">12,847</span> 次相似参数干预的因果分析。
                  </p>
                </motion.div>
              </CardContent>
            </Card>
  );
}
