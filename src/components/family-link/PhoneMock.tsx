import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { RemoteIntervention } from "./RemoteIntervention";
import type { PhoneMockProps } from "./types";

export function PhoneMock({ isSending, isSent, fatherStatus, handleSendSleepPackage, resetDemo }: PhoneMockProps) {
  return (
            <Card className="border-0 shadow-large bg-card">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Users className="w-5 h-5 text-primary" />
                  家庭连接 Family Link
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  点击按钮发送深层助眠包，观察父亲状态变化
                </p>
              </CardHeader>
              <CardContent>
                {/* Phone Frame */}
                <div className="relative mx-auto w-64 sm:w-72">
                  <div className="relative bg-foreground rounded-[2.5rem] p-2 shadow-xl">
                    <div className="bg-background rounded-[2rem] overflow-hidden">
                      {/* Status Bar */}
                      <div className="h-10 flex items-center justify-center bg-muted/50">
                        <div className="w-20 h-5 rounded-full bg-foreground" />
                      </div>
                      
                      {/* App Content */}
                      <div className="p-5 space-y-4 min-h-[380px]">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-xs text-muted-foreground">家庭健康</p>
                            <p className="text-base font-semibold text-foreground">远程关爱</p>
                          </div>
                          <Heart className="w-6 h-6 text-primary" />
                        </div>

                        {/* Father Status Card */}
                        <div className="bg-muted/50 rounded-xl p-4 space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-foreground">父亲状态</span>
                            <div className="flex items-center gap-2">
                              <motion.div 
                                className={`w-3 h-3 rounded-full ${
                                  fatherStatus === "warning" 
                                    ? "bg-amber-500" 
                                    : "bg-primary"
                                }`}
                                animate={fatherStatus === "warning" ? {
                                  scale: [1, 1.2, 1],
                                  opacity: [1, 0.7, 1]
                                } : {
                                  scale: 1,
                                  opacity: 1
                                }}
                                transition={{
                                  duration: 1.5,
                                  repeat: fatherStatus === "warning" ? Infinity : 0,
                                  ease: "easeInOut"
                                }}
                              />
                              <span className={`text-xs font-medium transition-colors duration-500 ${
                                fatherStatus === "warning" 
                                  ? "text-amber-600 dark:text-amber-500" 
                                  : "text-primary"
                              }`}>
                                {fatherStatus === "warning" ? "睡眠质量偏低" : "睡眠改善中"}
                              </span>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-2 text-center">
                            <div className="bg-background rounded-lg p-2">
                              <p className="text-xs text-muted-foreground">心率</p>
                              <p className="text-lg font-semibold text-foreground">68</p>
                            </div>
                            <div className="bg-background rounded-lg p-2">
                              <p className="text-xs text-muted-foreground">HRV</p>
                              <motion.p 
                                className={`text-lg font-semibold ${
                                  fatherStatus === "success" ? "text-primary" : "text-foreground"
                                }`}
                                key={fatherStatus}
                                initial={{ scale: 1 }}
                                animate={fatherStatus === "success" ? { scale: [1, 1.2, 1] } : {}}
                                transition={{ duration: 0.5 }}
                              >
                                {fatherStatus === "success" ? "52" : "38"}
                              </motion.p>
                            </div>
                          </div>
                        </div>

                        <RemoteIntervention isSending={isSending} isSent={isSent} handleSendSleepPackage={handleSendSleepPackage} resetDemo={resetDemo} />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
  );
}
