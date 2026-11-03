import { Button } from "@/components/ui/button";
import { Moon, Send, Activity } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { RemoteInterventionProps } from "./types";

export function RemoteIntervention({ isSending, isSent, handleSendSleepPackage, resetDemo }: RemoteInterventionProps) {
  return (
    <>
                        {/* Sleep Package Info */}
                        <div className="bg-primary/5 rounded-xl p-4 border border-primary/10">
                          <div className="flex items-center gap-2 mb-2">
                            <Moon className="w-4 h-4 text-primary" />
                            <span className="text-sm font-medium text-foreground">深层助眠包</span>
                          </div>
                          <p className="text-xs text-muted-foreground mb-3">
                            包含：40°C热疗 + 432Hz声波 + 渐进肌肉放松引导
                          </p>
                          
                          <AnimatePresence mode="wait">
                            {isSending && (
                              <motion.div 
                                className="flex items-center gap-2 text-xs text-primary"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                              >
                                <div className="flex gap-1">
                                  <motion.span 
                                    className="w-1.5 h-1.5 bg-primary rounded-full"
                                    animate={{ y: [0, -6, 0] }}
                                    transition={{ duration: 0.5, repeat: Infinity, delay: 0 }}
                                  />
                                  <motion.span 
                                    className="w-1.5 h-1.5 bg-primary rounded-full"
                                    animate={{ y: [0, -6, 0] }}
                                    transition={{ duration: 0.5, repeat: Infinity, delay: 0.15 }}
                                  />
                                  <motion.span 
                                    className="w-1.5 h-1.5 bg-primary rounded-full"
                                    animate={{ y: [0, -6, 0] }}
                                    transition={{ duration: 0.5, repeat: Infinity, delay: 0.3 }}
                                  />
                                </div>
                                <span>正在发送至父亲的恢复舱...</span>
                              </motion.div>
                            )}
                            
                            {isSent && !isSending && (
                              <motion.div 
                                className="text-xs text-primary flex items-center gap-1"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                              >
                                <Activity className="w-3 h-3" />
                                <span>已发送！恢复舱正在执行...</span>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>

                        <Button
                          className="w-full"
                          onClick={isSent ? resetDemo : handleSendSleepPackage}
                          disabled={isSending}
                          variant="default"
                        >
                          {isSending ? (
                            <span className="flex items-center gap-2">
                              <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                              发送中...
                            </span>
                          ) : isSent ? (
                            <span>重新演示</span>
                          ) : (
                            <span className="flex items-center gap-2">
                              <Send className="w-4 h-4" />
                              发送深层助眠包
                            </span>
                          )}
                        </Button>
    </>
  );
}
