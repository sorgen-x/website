import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { useLanguage } from "@/contexts/LanguageContext";
import { ChevronRight, ChevronLeft, Loader2 } from "lucide-react";

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

interface Props {
  onComplete: (data: HealthData) => void;
  loading?: boolean;
}

export function HealthProfileQuestionnaire({ onComplete, loading }: Props) {
  const { t } = useLanguage();
  const [step, setStep] = useState(0);
  const [data, setData] = useState<HealthData>({
    age: 35,
    gender: "male",
    height: 170,
    weight: 65,
    avgSleepHours: 7,
    sleepQualityScore: 5,
    stressLevel: 5,
    exerciseFrequency: 2,
    caffeineIntake: 2,
    screenTimeHours: 4,
    healthConditions: [],
  });

  const healthConditionOptions = [
    { id: "insomnia", label: t("失眠", "Insomnia") },
    { id: "anxiety", label: t("焦虑", "Anxiety") },
    { id: "depression", label: t("抑郁", "Depression") },
    { id: "hypertension", label: t("高血压", "Hypertension") },
    { id: "diabetes", label: t("糖尿病", "Diabetes") },
    { id: "chronic_fatigue", label: t("慢性疲劳", "Chronic Fatigue") },
  ];

  const steps = [
    {
      title: t("基本信息", "Basic Information"),
      description: t("请填写您的基本身体数据", "Please enter your basic body data"),
    },
    {
      title: t("睡眠状况", "Sleep Status"),
      description: t("了解您的睡眠习惯", "Understanding your sleep habits"),
    },
    {
      title: t("生活方式", "Lifestyle"),
      description: t("您的日常生活习惯", "Your daily lifestyle habits"),
    },
    {
      title: t("健康状况", "Health Conditions"),
      description: t("选择您可能存在的健康问题", "Select any health issues you may have"),
    },
  ];

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      onComplete(data);
    }
  };

  const handlePrev = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const toggleHealthCondition = (condition: string) => {
    setData(prev => ({
      ...prev,
      healthConditions: prev.healthConditions.includes(condition)
        ? prev.healthConditions.filter(c => c !== condition)
        : [...prev.healthConditions, condition],
    }));
  };

  return (
    <div className="space-y-6">
      {/* Progress indicator */}
      <div className="flex items-center gap-2">
        {steps.map((_, index) => (
          <motion.div
            key={index}
            className={`h-1.5 flex-1 rounded-full ${
              index <= step ? "bg-primary" : "bg-muted"
            }`}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: index * 0.1 }}
          />
        ))}
      </div>

      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold">{steps[step].title}</h3>
        <p className="text-sm text-muted-foreground">{steps[step].description}</p>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
          className="space-y-6"
        >
          {step === 0 && (
            <>
              <div className="space-y-4">
                <div>
                  <Label>{t("年龄", "Age")}: {data.age} {t("岁", "years")}</Label>
                  <Slider
                    value={[data.age]}
                    onValueChange={([v]) => setData({ ...data, age: v })}
                    min={18}
                    max={80}
                    step={1}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label className="mb-3 block">{t("性别", "Gender")}</Label>
                  <RadioGroup
                    value={data.gender}
                    onValueChange={(v) => setData({ ...data, gender: v })}
                    className="flex gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="male" id="male" />
                      <Label htmlFor="male">{t("男", "Male")}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="female" id="female" />
                      <Label htmlFor="female">{t("女", "Female")}</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div>
                  <Label>{t("身高", "Height")}: {data.height} cm</Label>
                  <Slider
                    value={[data.height]}
                    onValueChange={([v]) => setData({ ...data, height: v })}
                    min={140}
                    max={200}
                    step={1}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label>{t("体重", "Weight")}: {data.weight} kg</Label>
                  <Slider
                    value={[data.weight]}
                    onValueChange={([v]) => setData({ ...data, weight: v })}
                    min={40}
                    max={120}
                    step={1}
                    className="mt-2"
                  />
                </div>
              </div>
            </>
          )}

          {step === 1 && (
            <>
              <div className="space-y-4">
                <div>
                  <Label>
                    {t("平均睡眠时长", "Average Sleep Duration")}: {data.avgSleepHours} {t("小时", "hours")}
                  </Label>
                  <Slider
                    value={[data.avgSleepHours]}
                    onValueChange={([v]) => setData({ ...data, avgSleepHours: v })}
                    min={4}
                    max={12}
                    step={0.5}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label>
                    {t("睡眠质量评分", "Sleep Quality Score")}: {data.sleepQualityScore}/10
                  </Label>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs text-muted-foreground">{t("很差", "Poor")}</span>
                    <Slider
                      value={[data.sleepQualityScore]}
                      onValueChange={([v]) => setData({ ...data, sleepQualityScore: v })}
                      min={1}
                      max={10}
                      step={1}
                      className="flex-1"
                    />
                    <span className="text-xs text-muted-foreground">{t("极佳", "Excellent")}</span>
                  </div>
                </div>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div className="space-y-4">
                <div>
                  <Label>
                    {t("压力水平", "Stress Level")}: {data.stressLevel}/10
                  </Label>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs text-muted-foreground">{t("低", "Low")}</span>
                    <Slider
                      value={[data.stressLevel]}
                      onValueChange={([v]) => setData({ ...data, stressLevel: v })}
                      min={1}
                      max={10}
                      step={1}
                      className="flex-1"
                    />
                    <span className="text-xs text-muted-foreground">{t("高", "High")}</span>
                  </div>
                </div>
                <div>
                  <Label>
                    {t("每周运动次数", "Exercise Frequency")}: {data.exerciseFrequency} {t("次/周", "times/week")}
                  </Label>
                  <Slider
                    value={[data.exerciseFrequency]}
                    onValueChange={([v]) => setData({ ...data, exerciseFrequency: v })}
                    min={0}
                    max={7}
                    step={1}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label>
                    {t("每日咖啡因摄入", "Daily Caffeine Intake")}: {data.caffeineIntake} {t("杯", "cups")}
                  </Label>
                  <Slider
                    value={[data.caffeineIntake]}
                    onValueChange={([v]) => setData({ ...data, caffeineIntake: v })}
                    min={0}
                    max={8}
                    step={1}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label>
                    {t("每日屏幕时间", "Daily Screen Time")}: {data.screenTimeHours} {t("小时", "hours")}
                  </Label>
                  <Slider
                    value={[data.screenTimeHours]}
                    onValueChange={([v]) => setData({ ...data, screenTimeHours: v })}
                    min={0}
                    max={16}
                    step={0.5}
                    className="mt-2"
                  />
                </div>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <div className="grid grid-cols-2 gap-3">
                {healthConditionOptions.map((condition) => (
                  <motion.div
                    key={condition.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => toggleHealthCondition(condition.id)}
                    className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${
                      data.healthConditions.includes(condition.id)
                        ? "bg-primary/10 border-primary"
                        : "bg-card border-border hover:border-primary/50"
                    }`}
                  >
                    <Checkbox
                      checked={data.healthConditions.includes(condition.id)}
                      className="pointer-events-none"
                    />
                    <span className="text-sm">{condition.label}</span>
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-between pt-4">
        <Button
          variant="outline"
          onClick={handlePrev}
          disabled={step === 0}
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          {t("上一步", "Previous")}
        </Button>
        <Button onClick={handleNext} disabled={loading}>
          {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          {step === steps.length - 1 ? t("生成健康画像", "Generate Profile") : t("下一步", "Next")}
          {step < steps.length - 1 && <ChevronRight className="w-4 h-4 ml-1" />}
        </Button>
      </div>
    </div>
  );
}
