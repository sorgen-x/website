import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { motion } from "framer-motion";
import { AnimatedNumber } from "./AnimatedNumber";
import { chartConfig } from "./data";
import { ComposedChart, Area, Line, ReferenceLine, XAxis, YAxis, CartesianGrid } from "recharts";
import { causalTracking } from "./data";
import { containerVariants, itemVariants, chartVariants } from "./motionVariants";
import type { ChartPanelProps } from "./types";

export function CausalTracking({ isVisible }: ChartPanelProps) {
  return (
                    <motion.div 
                      className="grid lg:grid-cols-3 gap-6"
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <motion.div 
                        className="lg:col-span-2 bg-muted/30 rounded-xl p-4"
                        variants={chartVariants}
                      >
                        <div className="mb-4">
                          <h4 className="text-sm font-medium text-foreground">因果链追溯</h4>
                          <p className="text-xs text-muted-foreground">一次完整干预的多维指标变化追踪</p>
                        </div>
                        <ChartContainer config={chartConfig} className="h-[280px] w-full">
                          <ComposedChart data={causalTracking} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                            <XAxis dataKey="time" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                            <YAxis yAxisId="left" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                            <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <ReferenceLine yAxisId="left" x="1h" stroke="hsl(var(--primary))" strokeDasharray="3 3" opacity={0.5} />
                            <ReferenceLine yAxisId="left" x="2h" stroke="hsl(var(--primary))" strokeDasharray="3 3" opacity={0.5} />
                            <ReferenceLine yAxisId="left" x="5h" stroke="hsl(142 76% 36%)" strokeDasharray="3 3" opacity={0.5} />
                            <Area 
                              yAxisId="left" 
                              type="monotone" 
                              dataKey="sleepPressure" 
                              fill="hsl(280 100% 70%)" 
                              fillOpacity={0.2} 
                              stroke="hsl(280 100% 70%)" 
                              strokeWidth={1.5}
                              isAnimationActive={true}
                              animationDuration={1200}
                            />
                            <Line 
                              yAxisId="left" 
                              type="monotone" 
                              dataKey="hrv" 
                              stroke="hsl(var(--primary))" 
                              strokeWidth={2.5} 
                              dot={{ fill: "hsl(var(--primary))", r: 4 }}
                              isAnimationActive={true}
                              animationDuration={1500}
                            />
                            <Line 
                              yAxisId="right" 
                              type="monotone" 
                              dataKey="cortisol" 
                              stroke="hsl(30 100% 50%)" 
                              strokeWidth={2} 
                              dot={{ r: 3 }}
                              isAnimationActive={true}
                              animationDuration={1300}
                            />
                          </ComposedChart>
                        </ChartContainer>
                      </motion.div>

                      <motion.div className="space-y-4" variants={containerVariants}>
                        <motion.div 
                          className="bg-primary/5 rounded-xl p-4 border border-primary/10"
                          variants={itemVariants}
                        >
                          <p className="text-xs text-muted-foreground mb-2">因果追溯能力</p>
                          <p className="text-sm text-foreground leading-relaxed">
                            我们能精确追踪每个干预动作如何影响生理指标，
                            构建<span className="text-primary font-semibold">可解释的因果链</span>。
                          </p>
                        </motion.div>
                        <motion.div className="space-y-3" variants={containerVariants}>
                          {[
                            { time: "1h", action: "热疗启动", effect: "HRV +4, 皮质醇 -3", color: "bg-primary" },
                            { time: "2h", action: "声波叠加", effect: "HRV +6, 睡眠压力 -13", color: "bg-primary" },
                            { time: "5h", action: "深睡进入", effect: "HRV 峰值 68, 皮质醇最低", color: "bg-emerald-500" }
                          ].map((item, index) => (
                            <motion.div 
                              key={index}
                              className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg"
                              variants={itemVariants}
                              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                            >
                              <motion.div 
                                className={`w-2 h-2 rounded-full ${item.color}`}
                                animate={{ scale: [1, 1.3, 1] }}
                                transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                              />
                              <div className="flex-1">
                                <p className="text-xs font-medium text-foreground">{item.time}: {item.action}</p>
                                <p className="text-xs text-muted-foreground">{item.effect}</p>
                              </div>
                            </motion.div>
                          ))}
                        </motion.div>
                      </motion.div>
                    </motion.div>

  );
}
