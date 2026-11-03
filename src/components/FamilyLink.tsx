import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { familyFeatures } from "./family-link/data";
import { containerVariants, itemVariants } from "./family-link/motionVariants";
import { PhoneMock } from "./family-link/PhoneMock";
import { RealtimeSimulator } from "./family-link/RealtimeSimulator";
import { CausalDataPanel } from "./family-link/CausalDataPanel";

export function FamilyLink() {
  const { ref, isVisible } = useScrollAnimation();
  
  // Family Link App State
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [fatherStatus, setFatherStatus] = useState<"warning" | "success">("warning");
  
  // Data Moat Simulator State
  const [thermalTemp, setThermalTemp] = useState([38]);
  const [soundFreq, setSoundFreq] = useState([432]);
  const [hrvData, setHrvData] = useState<{ time: string; hrv: number; baseline: number; predicted: number }[]>([]);
  const [activeTab, setActiveTab] = useState("realtime");
  const [chartAnimationKey, setChartAnimationKey] = useState(0);

  // Generate HRV prediction data based on parameters
  useEffect(() => {
    const temp = thermalTemp[0];
    const freq = soundFreq[0];
    
    // Simulate causal model prediction with more sophisticated model
    const baselineHRV = 45;
    const tempEffect = (temp - 35) * 2.5;
    const freqEffect = freq === 432 ? 8 : freq === 528 ? 12 : freq === 396 ? 5 : (freq - 400) * 0.02;
    const synergy = (temp > 38 && freq > 450) ? 5 : 0;
    
    const newData = Array.from({ length: 8 }, (_, i) => {
      const time = `${i * 10}分`;
      const progress = Math.min(1, i / 6);
      const improvement = (tempEffect + freqEffect + synergy) * progress;
      const noise = Math.random() * 3 - 1.5;
      
      // Add predicted confidence interval
      const predicted = baselineHRV + improvement + 3;
      
      return {
        time,
        hrv: Math.round(baselineHRV + improvement + noise),
        baseline: baselineHRV,
        predicted: Math.round(predicted),
      };
    });
    
    setHrvData(newData);
    setChartAnimationKey(prev => prev + 1);
  }, [thermalTemp, soundFreq]);

  const handleSendSleepPackage = () => {
    setIsSending(true);
    
    setTimeout(() => {
      setIsSending(false);
      setIsSent(true);
      setFatherStatus("success");
    }, 2000);
  };

  const resetDemo = () => {
    setIsSent(false);
    setFatherStatus("warning");
  };

  const calculateImprovement = () => {
    const temp = thermalTemp[0];
    const freq = soundFreq[0];
    const tempEffect = (temp - 35) * 2.5;
    const freqEffect = freq === 432 ? 8 : freq === 528 ? 12 : freq === 396 ? 5 : (freq - 400) * 0.02;
    const synergy = (temp > 38 && freq > 450) ? 5 : 0;
    return Math.round(tempEffect + freqEffect + synergy);
  };

  return (
    <section id="family-link" className="py-24 lg:py-32 bg-muted/30">
      <div 
        ref={ref}
        className={`max-w-7xl mx-auto px-6 transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="text-center mb-16">
          <p className="text-primary font-medium mb-4">远程关爱，守护家人</p>
          <h2 className="text-4xl sm:text-5xl font-semibold text-foreground tracking-tight mb-6">
            家庭连接 & 因果 vs 相关
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            让关爱跨越物理距离。子女不再需要猜测父母的健康状况，AI将复杂数据转化为直观的
            <span className="text-primary font-semibold">"红绿灯"状态</span>，并提供一键式远程关怀。
          </p>
          
          {/* Feature List */}
          <motion.div 
            className="flex flex-col sm:flex-row justify-center items-start sm:items-center gap-4 sm:gap-8 max-w-3xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
          >
            {familyFeatures.map((feature, index) => (
              <motion.div 
                key={index}
                className="flex items-center gap-3"
                variants={itemVariants}
              >
                <div className={`w-6 h-6 rounded-full ${feature.bgColor} flex items-center justify-center`}>
                  <feature.icon className={`w-4 h-4 ${feature.color}`} />
                </div>
                <div className="text-left">
                  <span className="font-medium text-foreground">{feature.title}</span>
                  <span className="text-muted-foreground">：{feature.description}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Top Row: Family Link + Realtime Simulator */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
          {/* Phone Mockup - Family Link */}
          <motion.div 
            className={`transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            initial={{ opacity: 0, x: -30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <PhoneMock isSending={isSending} isSent={isSent} fatherStatus={fatherStatus} handleSendSleepPackage={handleSendSleepPackage} resetDemo={resetDemo} />
          </motion.div>

          {/* Realtime Simulator */}
          <motion.div 
            className={`transition-all duration-700 delay-400 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            initial={{ opacity: 0, x: 30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <RealtimeSimulator thermalTemp={thermalTemp} setThermalTemp={setThermalTemp} soundFreq={soundFreq} setSoundFreq={setSoundFreq} hrvData={hrvData} chartAnimationKey={chartAnimationKey} calculateImprovement={calculateImprovement} />
          </motion.div>
        </div>

        {/* Causal vs Correlation Deep Dive */}
        <motion.div 
          className={`transition-all duration-700 delay-600 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <CausalDataPanel isVisible={isVisible} activeTab={activeTab} setActiveTab={setActiveTab} />
        </motion.div>
      </div>
    </section>
  );
}
