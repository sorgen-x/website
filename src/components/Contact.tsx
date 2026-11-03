import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const contactInfo = [
  { icon: Phone, label: "私享热线", value: "400-888-8888" },
  { icon: Mail, label: "商务邮箱", value: "hello@vitality.com" },
  { icon: MapPin, label: "体验中心", value: "北京·上海·深圳" },
];

export function Contact() {
  const { ref, isVisible } = useScrollAnimation();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name.trim()) {
      toast({
        title: "请输入姓名",
        variant: "destructive",
      });
      return;
    }
    
    if (!formData.phone.trim()) {
      toast({
        title: "请输入电话",
        variant: "destructive",
      });
      return;
    }

    // Phone validation (Chinese phone number)
    const phoneRegex = /^1[3-9]\d{9}$/;
    if (!phoneRegex.test(formData.phone.trim())) {
      toast({
        title: "请输入正确的手机号码",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from("contact_inquiries")
        .insert({
          name: formData.name.trim(),
          phone: formData.phone.trim(),
          message: formData.message.trim() || null,
        });

      if (error) throw error;

      toast({
        title: "提交成功",
        description: "我们会尽快与您联系",
      });
      
      // Reset form
      setFormData({ name: "", phone: "", message: "" });
    } catch (error) {
      console.error("Submit error:", error);
      toast({
        title: "提交失败",
        description: "请稍后重试",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <section id="contact" className="py-24 lg:py-32 bg-card">
      <div ref={ref} className="max-w-4xl mx-auto px-6">
        {/* Section Header */}
        <div className={`text-center max-w-3xl mx-auto mb-16 stagger-item ${isVisible ? 'stagger-visible' : ''}`}>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-foreground tracking-tight mb-6">
            预约私享体验
          </h2>
          <p className="text-xl text-muted-foreground">
            亲临体验中心，感受 Vitality 带来的全新健康体验
          </p>
        </div>

        {/* Contact Form */}
        <div className={`bg-background rounded-3xl p-8 lg:p-12 stagger-item ${isVisible ? 'stagger-visible' : ''}`} style={{ transitionDelay: '0.15s' }}>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <div className={`stagger-item ${isVisible ? 'stagger-visible' : ''}`} style={{ transitionDelay: '0.25s' }}>
                <label className="block text-sm text-muted-foreground mb-2">姓名 *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl bg-card border border-border focus:border-primary focus:outline-none transition-colors text-foreground"
                  placeholder="请输入姓名"
                  maxLength={50}
                />
              </div>
              <div className={`stagger-item ${isVisible ? 'stagger-visible' : ''}`} style={{ transitionDelay: '0.35s' }}>
                <label className="block text-sm text-muted-foreground mb-2">电话 *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl bg-card border border-border focus:border-primary focus:outline-none transition-colors text-foreground"
                  placeholder="请输入电话"
                  maxLength={11}
                />
              </div>
            </div>
            <div className={`stagger-item ${isVisible ? 'stagger-visible' : ''}`} style={{ transitionDelay: '0.45s' }}>
              <label className="block text-sm text-muted-foreground mb-2">留言</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-3 rounded-xl bg-card border border-border focus:border-primary focus:outline-none transition-colors text-foreground resize-none"
                placeholder="请描述您想了解的内容..."
                maxLength={500}
              />
            </div>
            <div className={`flex flex-col sm:flex-row gap-4 stagger-item ${isVisible ? 'stagger-visible' : ''}`} style={{ transitionDelay: '0.55s' }}>
              <Button 
                type="submit" 
                variant="hero" 
                size="lg" 
                className="flex-1"
                disabled={isSubmitting}
              >
                {isSubmitting ? "提交中..." : "预约私享体验"}
              </Button>
              <Button 
                type="button"
                variant="appleOutline" 
                size="lg" 
                className="flex-1"
                onClick={() => window.location.href = '#solutions'}
              >
                了解 Vitality
              </Button>
            </div>
          </form>

          {/* Contact Info */}
          <div className="mt-12 pt-8 border-t border-border grid sm:grid-cols-3 gap-6">
            {contactInfo.map((info, index) => (
              <div 
                key={info.label} 
                className={`flex items-center gap-3 stagger-item ${isVisible ? 'stagger-visible' : ''}`}
                style={{ transitionDelay: `${0.65 + index * 0.1}s` }}
              >
                <div className="w-10 h-10 rounded-xl bg-card flex items-center justify-center">
                  <info.icon className="w-5 h-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{info.label}</p>
                  <p className="text-sm font-medium text-foreground">{info.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
