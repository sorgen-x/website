import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  RefreshCw,
  Heart,
  Moon,
  Brain,
  Zap,
  ThermometerSun,
  Volume2,
  Sun,
  Activity,
  TrendingUp,
  CheckCircle,
  Clock,
} from "lucide-react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

interface HealthProfile {
  id: string;
  overallHealthScore: number;
  sleepHealthScore: number;
  stressManagementScore: number;
}

interface Recommendation {
  id: string;
  interventionType: string;
  priority: number;
  title: string;
  description: string;
  expectedImprovement: string;
  predictedEffectiveness: number;
  status: string;
}

interface Props {
  profile: HealthProfile;
  recommendations: Recommendation[];
  onRefresh: () => void;
  onStartIntervention: (id: string) => void;
}

// Animated number component
function AnimatedScore({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const duration = 1500;
    const startTime = Date.now();
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.round(value * eased));
      if (progress < 1) requestAnimationFrame(animate);
    };
    animate();
  }, [value]);

  return (
    <span className="tabular-nums">
      {displayValue}{suffix}
    </span>
  );
}

export function HealthProfileDisplay({
  profile,
  recommendations,
  onRefresh,
  onStartIntervention,
}: Props) {
  const { t } = useLanguage();

  const radarData = [
    { subject: t("睡眠质量", "Sleep Quality"), A: profile.sleepHealthScore, fullMark: 100 },
    { subject: t("压力管理", "Stress Mgmt"), A: profile.stressManagementScore, fullMark: 100 },
    { subject: t("综合健康", "Overall Health"), A: profile.overallHealthScore, fullMark: 100 },
    { subject: t("活力指数", "Vigor"), A: Math.round((profile.overallHealthScore + profile.sleepHealthScore) / 2), fullMark: 100 },
    { subject: t("恢复能力", "Recovery"), A: Math.round((profile.sleepHealthScore + profile.stressManagementScore) / 2), fullMark: 100 },
  ];

  // Simulated improvement prediction data
  const predictionData = [
    { week: t("现在", "Now"), current: profile.overallHealthScore, predicted: profile.overallHealthScore },
    { week: t("第1周", "Week 1"), current: null, predicted: Math.min(100, profile.overallHealthScore + 5) },
    { week: t("第2周", "Week 2"), current: null, predicted: Math.min(100, profile.overallHealthScore + 12) },
    { week: t("第4周", "Week 4"), current: null, predicted: Math.min(100, profile.overallHealthScore + 18) },
    { week: t("第8周", "Week 8"), current: null, predicted: Math.min(100, profile.overallHealthScore + 25) },
  ];

  const getInterventionIcon = (type: string) => {
    switch (type) {
      case "thermal": return <ThermometerSun className="w-5 h-5 text-orange-500" />;
      case "acoustic": return <Volume2 className="w-5 h-5 text-blue-500" />;
      case "photic": return <Sun className="w-5 h-5 text-yellow-500" />;
      case "lifestyle": return <Activity className="w-5 h-5 text-green-500" />;
      default: return <Zap className="w-5 h-5 text-primary" />;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500";
    if (score >= 60) return "text-yellow-500";
    return "text-red-500";
  };

  return (
    <div className="space-y-6">
      {/* Header with overall score */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold">{t("您的健康画像", "Your Health Profile")}</h3>
          <p className="text-sm text-muted-foreground">{t("基于因果模型的个性化分析", "Personalized analysis based on causal models")}</p>
        </div>
        <Button variant="outline" size="sm" onClick={onRefresh}>
          <RefreshCw className="w-4 h-4 mr-2" />
          {t("重新评估", "Re-assess")}
        </Button>
      </div>

      {/* Score cards */}
      <div className="grid grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-2xl border border-border/50 p-4 text-center"
        >
          <Heart className="w-6 h-6 mx-auto mb-2 text-red-500" />
          <div className={`text-3xl font-bold ${getScoreColor(profile.overallHealthScore)}`}>
            <AnimatedScore value={profile.overallHealthScore} />
          </div>
          <p className="text-xs text-muted-foreground">{t("综合健康", "Overall Health")}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card rounded-2xl border border-border/50 p-4 text-center"
        >
          <Moon className="w-6 h-6 mx-auto mb-2 text-indigo-500" />
          <div className={`text-3xl font-bold ${getScoreColor(profile.sleepHealthScore)}`}>
            <AnimatedScore value={profile.sleepHealthScore} />
          </div>
          <p className="text-xs text-muted-foreground">{t("睡眠健康", "Sleep Health")}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card rounded-2xl border border-border/50 p-4 text-center"
        >
          <Brain className="w-6 h-6 mx-auto mb-2 text-purple-500" />
          <div className={`text-3xl font-bold ${getScoreColor(profile.stressManagementScore)}`}>
            <AnimatedScore value={profile.stressManagementScore} />
          </div>
          <p className="text-xs text-muted-foreground">{t("压力管理", "Stress Mgmt")}</p>
        </motion.div>
      </div>

      {/* Radar chart */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        className="bg-card rounded-2xl border border-border/50 p-4"
      >
        <h4 className="font-medium mb-4">{t("健康维度分析", "Health Dimension Analysis")}</h4>
        <ResponsiveContainer width="100%" height={200}>
          <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
            <PolarGrid stroke="hsl(var(--border))" />
            <PolarAngleAxis 
              dataKey="subject" 
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
            />
            <PolarRadiusAxis 
              angle={90} 
              domain={[0, 100]} 
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }}
            />
            <Radar
              name="Score"
              dataKey="A"
              stroke="hsl(var(--primary))"
              fill="hsl(var(--primary))"
              fillOpacity={0.3}
              animationDuration={1500}
            />
          </RadarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Improvement prediction */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4 }}
        className="bg-card rounded-2xl border border-border/50 p-4"
      >
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-primary" />
          <h4 className="font-medium">{t("因果模型预测改善曲线", "Causal Model Improvement Prediction")}</h4>
        </div>
        <ResponsiveContainer width="100%" height={150}>
          <AreaChart data={predictionData}>
            <defs>
              <linearGradient id="colorPredicted" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="week" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
            />
            <YAxis 
              domain={[0, 100]} 
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: "hsl(var(--card))", 
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px"
              }}
            />
            <Area
              type="monotone"
              dataKey="predicted"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorPredicted)"
              animationDuration={2000}
            />
          </AreaChart>
        </ResponsiveContainer>
        <p className="text-xs text-muted-foreground text-center mt-2">
          {t("基于因果推断的健康改善预测", "Health improvement prediction based on causal inference")}
        </p>
      </motion.div>

      {/* Personalized recommendations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h4 className="font-medium mb-4 flex items-center gap-2">
          <Zap className="w-5 h-5 text-primary" />
          {t("专属干预方案推荐", "Personalized Intervention Recommendations")}
        </h4>
        <div className="space-y-3">
          {recommendations.map((rec, index) => (
            <motion.div
              key={rec.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              className="bg-card rounded-xl border border-border/50 p-4"
            >
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-muted">
                  {getInterventionIcon(rec.interventionType)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h5 className="font-medium">{rec.title}</h5>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                      {t("优先级", "Priority")} {rec.priority}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{rec.description}</p>
                  <div className="flex items-center gap-4 text-xs">
                    <span className="text-green-600">
                      {t("预期改善", "Expected")}: {rec.expectedImprovement}
                    </span>
                    <div className="flex items-center gap-1">
                      <span className="text-muted-foreground">{t("有效性", "Effectiveness")}:</span>
                      <Progress value={rec.predictedEffectiveness} className="w-16 h-1.5" />
                      <span>{rec.predictedEffectiveness}%</span>
                    </div>
                  </div>
                </div>
                <Button
                  size="sm"
                  variant={rec.status === "pending" ? "default" : "outline"}
                  onClick={() => onStartIntervention(rec.id)}
                  disabled={rec.status !== "pending"}
                >
                  {rec.status === "pending" ? (
                    <>
                      <Clock className="w-3 h-3 mr-1" />
                      {t("开始", "Start")}
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-3 h-3 mr-1" />
                      {t("进行中", "Active")}
                    </>
                  )}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
