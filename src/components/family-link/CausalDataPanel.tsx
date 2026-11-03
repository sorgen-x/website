import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, BarChart3, GitBranch } from "lucide-react";
import { HistoricalTrends } from "./HistoricalTrends";
import { EffectComparison } from "./EffectComparison";
import { CausalTracking } from "./CausalTracking";
import type { CausalDataPanelProps } from "./types";

export function CausalDataPanel({ isVisible, activeTab, setActiveTab }: CausalDataPanelProps) {
  return (
          <Card className="border-0 shadow-large bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-primary" />
                因果 vs 相关：数据的力量
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                传统健康产品依赖相关性猜测，我们的系统构建真正的因果模型——每个预测都有数据支撑
              </p>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-6">
                  <TabsTrigger value="realtime" className="text-xs sm:text-sm">
                    <TrendingUp className="w-4 h-4 mr-1.5 hidden sm:inline" />
                    历史趋势
                  </TabsTrigger>
                  <TabsTrigger value="comparison" className="text-xs sm:text-sm">
                    <BarChart3 className="w-4 h-4 mr-1.5 hidden sm:inline" />
                    效果对比
                  </TabsTrigger>
                  <TabsTrigger value="tracking" className="text-xs sm:text-sm">
                    <GitBranch className="w-4 h-4 mr-1.5 hidden sm:inline" />
                    因果追溯
                  </TabsTrigger>
                </TabsList>

                <>
                  <TabsContent value="realtime" className="space-y-4" key="realtime">
                    <HistoricalTrends isVisible={isVisible} />
                  </TabsContent>

                  <TabsContent value="comparison" className="space-y-4" key="comparison">
                    <EffectComparison isVisible={isVisible} />
                  </TabsContent>

                  <TabsContent value="tracking" className="space-y-4" key="tracking">
                    <CausalTracking isVisible={isVisible} />
                  </TabsContent>
                </>
              </Tabs>
            </CardContent>
          </Card>
  );
}
