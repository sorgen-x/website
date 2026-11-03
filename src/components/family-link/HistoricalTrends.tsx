import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { motion } from "framer-motion";
import { AnimatedNumber } from "./AnimatedNumber";
import { chartConfig } from "./data";
import { AreaChart, Area, Line, XAxis, YAxis, CartesianGrid } from "recharts";
import { historicalData } from "./data";
import { containerVariants, itemVariants, chartVariants } from "./motionVariants";
import type { ChartPanelProps } from "./types";

export function HistoricalTrends({ isVisible }: ChartPanelProps) {
  return (
                    <motion.div 
                      className="grid lg:grid-cols-3 gap-6"
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      {/* Main Chart */}
                      <motion.div 
                        className="lg:col-span-2 bg-muted/30 rounded-xl p-4"
                        variants={chartVariants}
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h4 className="text-sm font-medium text-foreground">6周HRV改善趋势</h4>
                            <p className="text-xs text-muted-foreground">相关模型 vs 因果模型预测准确性</p>
                          </div>
                          <div className="flex items-center gap-4 text-xs">
                            <div className="flex items-center gap-1.5">
                              <div className="w-3 h-0.5 bg-muted-foreground" />
                              <span className="text-muted-foreground">相关模型</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <div className="w-3 h-0.5 bg-primary" />
                              <span className="text-muted-foreground">因果模型</span>
                            </div>
                          </div>
                        </div>
                        <ChartContainer config={chartConfig} className="h-[280px] w-full">
                          <AreaChart data={historicalData} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
                            <defs>
                              <linearGradient id="causalGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                              </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                            <XAxis dataKey="week" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                            <YAxis domain={[35, 80]} tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Area 
                              type="monotone" 
                              dataKey="causal" 
                              stroke="hsl(var(--primary))" 
                              strokeWidth={2} 
                              fill="url(#causalGradient)"
                              isAnimationActive={true}
                              animationDuration={1500}
                              animationEasing="ease-out"
                            />
                            <Line 
                              type="monotone" 
                              dataKey="correlation" 
                              stroke="hsl(var(--muted-foreground))" 
                              strokeWidth={2} 
                              strokeDasharray="5 5" 
                              dot={{ r: 3 }}
                              isAnimationActive={true}
                              animationDuration={1200}
                            />
                            <Line 
                              type="monotone" 
                              dataKey="causal" 
                              stroke="hsl(var(--primary))" 
                              strokeWidth={2.5} 
                              dot={{ fill: "hsl(var(--primary))", r: 4 }}
                              isAnimationActive={true}
                              animationDuration={1500}
                            />
                          </AreaChart>
                        </ChartContainer>
                      </motion.div>

                      {/* Stats Cards */}
                      <motion.div className="space-y-4" variants={containerVariants}>
                        <motion.div 
                          className="bg-primary/5 rounded-xl p-4 border border-primary/10"
                          variants={itemVariants}
                        >
                          <p className="text-xs text-muted-foreground mb-1">因果模型准确率</p>
                          <p className="text-3xl font-bold text-primary">
                            {isVisible && <AnimatedNumber value={94.7} suffix="%" />}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">vs 相关模型 67.2%</p>
                        </motion.div>
                        <motion.div 
                          className="bg-muted/50 rounded-xl p-4"
                          variants={itemVariants}
                        >
                          <p className="text-xs text-muted-foreground mb-1">累计干预数据</p>
                          <p className="text-3xl font-bold text-foreground">
                            {isVisible && <AnimatedNumber value={78432} />}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">次有效干预记录</p>
                        </motion.div>
                        <motion.div 
                          className="bg-muted/50 rounded-xl p-4"
                          variants={itemVariants}
                        >
                          <p className="text-xs text-muted-foreground mb-1">平均HRV提升</p>
                          <p className="text-3xl font-bold text-foreground">
                            +{isVisible && <AnimatedNumber value={27} suffix="%" />}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">6周持续使用后</p>
                        </motion.div>
                      </motion.div>
                    </motion.div>

  );
}
