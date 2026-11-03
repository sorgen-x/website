import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { motion } from "framer-motion";
import { AnimatedNumber } from "./AnimatedNumber";
import { chartConfig } from "./data";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { interventionComparison } from "./data";
import { containerVariants, itemVariants, chartVariants } from "./motionVariants";
import type { ChartPanelProps } from "./types";

export function EffectComparison({ isVisible }: ChartPanelProps) {
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
                          <h4 className="text-sm font-medium text-foreground">干预效果对比分析</h4>
                          <p className="text-xs text-muted-foreground">不同干预方式的预测准确性对比</p>
                        </div>
                        <ChartContainer config={chartConfig} className="h-[280px] w-full">
                          <BarChart data={interventionComparison} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                            <XAxis dataKey="type" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                            <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Bar 
                              dataKey="correlationEffect" 
                              fill="hsl(var(--muted-foreground))" 
                              radius={[4, 4, 0, 0]} 
                              name="相关模型预测"
                              isAnimationActive={true}
                              animationDuration={1000}
                            />
                            <Bar 
                              dataKey="causalEffect" 
                              fill="hsl(var(--primary))" 
                              radius={[4, 4, 0, 0]} 
                              name="因果模型预测"
                              isAnimationActive={true}
                              animationDuration={1200}
                              animationBegin={200}
                            />
                          </BarChart>
                        </ChartContainer>
                      </motion.div>

                      <motion.div className="space-y-4" variants={containerVariants}>
                        <motion.div 
                          className="bg-primary/5 rounded-xl p-4 border border-primary/10"
                          variants={itemVariants}
                        >
                          <p className="text-xs text-muted-foreground mb-2">关键差异</p>
                          <p className="text-sm text-foreground leading-relaxed">
                            相关模型只能告诉你"A和B同时发生"，
                            因果模型能告诉你<span className="text-primary font-semibold">"调整A会导致B变化多少"</span>。
                          </p>
                        </motion.div>
                        <motion.div 
                          className="bg-muted/50 rounded-xl p-4"
                          variants={itemVariants}
                        >
                          <p className="text-xs text-muted-foreground mb-2">综合干预优势</p>
                          <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-bold text-primary">2.1x</span>
                            <span className="text-sm text-muted-foreground">效果倍增</span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-2">
                            热疗+声波+光疗组合产生协同效应
                          </p>
                        </motion.div>
                        <motion.div 
                          className="bg-muted/50 rounded-xl p-4"
                          variants={itemVariants}
                        >
                          <p className="text-xs text-muted-foreground mb-2">预测可信度</p>
                          <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-bold text-foreground">
                              {isVisible && <AnimatedNumber value={97} suffix="%" />}
                            </span>
                            <span className="text-sm text-muted-foreground">综合干预</span>
                          </div>
                        </motion.div>
                      </motion.div>
                    </motion.div>

  );
}
