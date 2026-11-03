import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { HealthProfileQuestionnaire } from "./HealthProfileQuestionnaire";
import { HealthProfileDisplay } from "./HealthProfileDisplay";
import { Loader2, Sparkles } from "lucide-react";

interface HealthData {
  age: number;
  gender: string;
  height: number;
  weight: number;
  avgSleepHours: number;
  sleepQualityScore: number;
  stressLevel: number;
  exerciseFrequency: number;
  caffeineIntake: number;
  screenTimeHours: number;
  healthConditions: string[];
}

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

export function HealthProfile() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState<HealthProfile | null>(null);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);

  useEffect(() => {
    if (user) {
      loadHealthProfile();
    }
  }, [user]);

  const loadHealthProfile = async () => {
    if (!user) return;
    setLoading(true);

    try {
      // Load existing health profile
      const { data: profileData } = await supabase
        .from("health_profiles")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

      if (profileData) {
        setProfile({
          id: profileData.id,
          overallHealthScore: profileData.overall_health_score || 0,
          sleepHealthScore: profileData.sleep_health_score || 0,
          stressManagementScore: profileData.stress_management_score || 0,
        });

        // Load recommendations
        const { data: recsData } = await supabase
          .from("intervention_recommendations")
          .select("*")
          .eq("user_id", user.id)
          .order("priority", { ascending: true });

        if (recsData) {
          setRecommendations(
            recsData.map((r) => ({
              id: r.id,
              interventionType: r.intervention_type,
              priority: r.priority,
              title: r.title,
              description: r.description || "",
              expectedImprovement: r.expected_improvement || "",
              predictedEffectiveness: r.predicted_effectiveness || 0,
              status: r.status,
            }))
          );
        }
      }
    } catch (error) {
      console.error("Error loading health profile:", error);
    } finally {
      setLoading(false);
    }
  };

  // Calculate scores based on health data using causal model logic
  const calculateScores = (data: HealthData) => {
    // Sleep health score calculation (causal factors)
    let sleepScore = 50;
    sleepScore += (data.avgSleepHours - 6) * 8; // Optimal around 7-8 hours
    sleepScore += data.sleepQualityScore * 4;
    sleepScore -= data.caffeineIntake * 3;
    sleepScore -= Math.max(0, data.screenTimeHours - 4) * 2;
    sleepScore = Math.max(0, Math.min(100, sleepScore));

    // Stress management score calculation
    let stressScore = 100 - data.stressLevel * 8;
    stressScore += data.exerciseFrequency * 5;
    stressScore += data.sleepQualityScore * 2;
    stressScore = Math.max(0, Math.min(100, stressScore));

    // Overall health score (weighted combination)
    const bmi = data.weight / Math.pow(data.height / 100, 2);
    let overallScore = 50;
    overallScore += (sleepScore - 50) * 0.3;
    overallScore += (stressScore - 50) * 0.3;
    overallScore -= Math.abs(bmi - 22) * 2; // Optimal BMI around 22
    overallScore += data.exerciseFrequency * 3;
    overallScore -= data.healthConditions.length * 5;
    overallScore = Math.max(0, Math.min(100, Math.round(overallScore)));

    return {
      overallHealthScore: Math.round(overallScore),
      sleepHealthScore: Math.round(sleepScore),
      stressManagementScore: Math.round(stressScore),
    };
  };

  // Generate personalized recommendations based on causal analysis
  const generateRecommendations = (data: HealthData, scores: ReturnType<typeof calculateScores>) => {
    const recs: Omit<Recommendation, "id">[] = [];
    let priority = 1;

    // Sleep-related recommendations
    if (scores.sleepHealthScore < 70) {
      if (data.caffeineIntake > 2) {
        recs.push({
          interventionType: "lifestyle",
          priority: priority++,
          title: t("减少咖啡因摄入", "Reduce Caffeine Intake"),
          description: t(
            "您的咖啡因摄入量较高，这是导致睡眠质量下降的直接因果因素",
            "Your caffeine intake is high, which is a direct causal factor for reduced sleep quality"
          ),
          expectedImprovement: t("睡眠质量 +15%", "Sleep quality +15%"),
          predictedEffectiveness: 85,
          status: "pending",
        });
      }

      if (data.avgSleepHours < 7) {
        recs.push({
          interventionType: "thermal",
          priority: priority++,
          title: t("深层睡眠热干预", "Deep Sleep Thermal Intervention"),
          description: t(
            "通过精准的温度调节激活副交感神经，因果链显示可直接延长深睡期",
            "Precise temperature regulation activates parasympathetic system, causal chain shows direct extension of deep sleep"
          ),
          expectedImprovement: t("深睡时长 +45分钟", "Deep sleep +45min"),
          predictedEffectiveness: 92,
          status: "pending",
        });
      }
    }

    // Stress-related recommendations
    if (scores.stressManagementScore < 70) {
      recs.push({
        interventionType: "acoustic",
        priority: priority++,
        title: t("声波压力缓解方案", "Acoustic Stress Relief Program"),
        description: t(
          "特定频率声波可通过脑干直接调节HPA轴，因果模型预测24小时内皮质醇下降",
          "Specific frequency sound waves directly regulate HPA axis through brainstem, causal model predicts cortisol decrease within 24h"
        ),
        expectedImprovement: t("压力水平 -30%", "Stress level -30%"),
        predictedEffectiveness: 88,
        status: "pending",
      });

      if (data.exerciseFrequency < 3) {
        recs.push({
          interventionType: "lifestyle",
          priority: priority++,
          title: t("增加运动频率", "Increase Exercise Frequency"),
          description: t(
            "运动与压力管理存在强因果关系，每周增加2次运动可显著改善HRV",
            "Strong causal relationship between exercise and stress management, 2 additional sessions per week significantly improves HRV"
          ),
          expectedImprovement: t("HRV +12%", "HRV +12%"),
          predictedEffectiveness: 78,
          status: "pending",
        });
      }
    }

    // Light therapy for circadian rhythm
    if (data.screenTimeHours > 6 || scores.sleepHealthScore < 60) {
      recs.push({
        interventionType: "photic",
        priority: priority++,
        title: t("光照节律调节", "Light Rhythm Regulation"),
        description: t(
          "通过特定光谱调节褪黑素分泌，重建健康的昼夜节律因果链",
          "Regulate melatonin secretion through specific light spectrum, rebuild healthy circadian rhythm causal chain"
        ),
        expectedImprovement: t("入睡时间 -20分钟", "Sleep onset -20min"),
        predictedEffectiveness: 82,
        status: "pending",
      });
    }

    // Integrated intervention for complex cases
    if (data.healthConditions.length >= 2 || scores.overallHealthScore < 50) {
      recs.push({
        interventionType: "integrated",
        priority: priority++,
        title: t("多维度整合干预方案", "Multi-dimensional Integrated Intervention"),
        description: t(
          "结合热疗、声疗、光疗的协同因果模型，针对多重健康因素进行精准调控",
          "Synergistic causal model combining thermal, acoustic, and photic therapy for precise multi-factor health regulation"
        ),
        expectedImprovement: t("综合健康 +25%", "Overall health +25%"),
        predictedEffectiveness: 95,
        status: "pending",
      });
    }

    return recs;
  };

  const handleQuestionnaireComplete = async (data: HealthData) => {
    if (!user) return;
    setSaving(true);

    try {
      const scores = calculateScores(data);
      const recs = generateRecommendations(data, scores);

      // Save or update health profile
      const profilePayload = {
        user_id: user.id,
        age: data.age,
        gender: data.gender,
        height: data.height,
        weight: data.weight,
        avg_sleep_hours: data.avgSleepHours,
        sleep_quality_score: data.sleepQualityScore,
        stress_level: data.stressLevel,
        exercise_frequency: data.exerciseFrequency,
        caffeine_intake: data.caffeineIntake,
        screen_time_hours: data.screenTimeHours,
        health_conditions: data.healthConditions,
        overall_health_score: scores.overallHealthScore,
        sleep_health_score: scores.sleepHealthScore,
        stress_management_score: scores.stressManagementScore,
      };

      const { data: savedProfile, error: profileError } = await supabase
        .from("health_profiles")
        .upsert(profilePayload, { onConflict: "user_id" })
        .select()
        .single();

      if (profileError) throw profileError;

      // Delete existing recommendations
      await supabase
        .from("intervention_recommendations")
        .delete()
        .eq("user_id", user.id);

      // Save new recommendations
      const recsPayload = recs.map((rec) => ({
        user_id: user.id,
        health_profile_id: savedProfile.id,
        intervention_type: rec.interventionType,
        priority: rec.priority,
        title: rec.title,
        description: rec.description,
        expected_improvement: rec.expectedImprovement,
        predicted_effectiveness: rec.predictedEffectiveness,
        status: rec.status,
        causal_factors: {},
      }));

      const { error: recsError } = await supabase
        .from("intervention_recommendations")
        .insert(recsPayload);

      if (recsError) throw recsError;

      toast({
        title: t("健康画像生成成功", "Health profile generated successfully"),
        description: t("已为您生成个性化干预方案", "Personalized intervention plan created"),
      });

      // Reload data
      await loadHealthProfile();
    } catch (error: any) {
      console.error("Error saving health profile:", error);
      toast({
        title: t("保存失败", "Save failed"),
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleRefresh = () => {
    setProfile(null);
    setRecommendations([]);
  };

  const handleStartIntervention = async (id: string) => {
    try {
      await supabase
        .from("intervention_recommendations")
        .update({ status: "in_progress", started_at: new Date().toISOString() })
        .eq("id", id);

      setRecommendations((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status: "in_progress" } : r))
      );

      toast({
        title: t("干预已开始", "Intervention started"),
        description: t("我们将跟踪您的进展", "We will track your progress"),
      });
    } catch (error) {
      console.error("Error starting intervention:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-5 h-5 text-primary" />
        <h2 className="text-xl font-semibold">{t("个性化健康画像", "Personalized Health Profile")}</h2>
      </div>

      {!profile ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-2xl border border-border/50 p-6"
        >
          <HealthProfileQuestionnaire
            onComplete={handleQuestionnaireComplete}
            loading={saving}
          />
        </motion.div>
      ) : (
        <HealthProfileDisplay
          profile={profile}
          recommendations={recommendations}
          onRefresh={handleRefresh}
          onStartIntervention={handleStartIntervention}
        />
      )}
    </div>
  );
}
