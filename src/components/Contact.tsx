import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Mail, Building2, Globe } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const contactInfo = [
  { icon: Building2, label: "公司", value: "深圳溯元求索智能科技有限公司" },
  { icon: Globe, label: "官网", value: "sorgenx.com" },
  { icon: Mail, label: "商务合作", value: "business@sorgenx.com" },
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

    if (!formData.name.trim()) {
      toast({ title: "请输入姓名", variant: "destructive" });
      return;
    }

    if (formData.name.trim().length > 50 || formData.message.trim().length > 500) {
      toast({ title: "姓名不能超过50字，留言不能超过500字", variant: "destructive" });
      return;
    }

    if (!formData.phone.trim()) {
      toast({ title: "请输入电话", variant: "destructive" });
      return;
    }

    const phoneRegex = /^1[3-9]\d{9}$/;
    if (!phoneRegex.test(formData.phone.trim())) {
      toast({ title: "请输入正确的手机号码", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);

    try {
      const name = formData.name.trim();
      const phone = formData.phone.trim();
      const message = formData.message.trim();

      const { error } = await supabase.from("contact_inquiries").insert({
        name,
        phone,
        message: message || null,
      });

      if (error) throw error;

      toast({
        title: "提交成功",
        description: "我们会尽快与您联系",
      });

      setFormData({ name: "", phone: "", message: "" });

      void (async () => {
        try {
          const { error: notifyError } = await supabase.functions.invoke("notify-booking", {
            body: {
              name,
              phone,
              message,
            },
          });
          if (notifyError) throw notifyError;
        } catch {
          console.warn("预约已保存，但邮件通知未发送成功。");
        }
      })();
    } catch (error) {
      console.error("Submit error:", error);
      toast({
        title: "提交失败",
        description: "请稍后重试，或发送邮件至 business@sorgenx.com",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 lg:py-32 bg-card">
      <div ref={ref} className="max-w-4xl mx-auto px-6">
        <div className={`text-center max-w-3xl mx-auto mb-16 stagger-item ${isVisible ? "stagger-visible" : ""}`}>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-foreground tracking-tight mb-6">
            预约体验
          </h2>
          <p className="text-xl text-muted-foreground">
            留下联系方式，我们会尽快与您沟通
          </p>
        </div>

        <div
          className={`bg-background rounded-3xl p-8 lg:p-12 stagger-item ${isVisible ? "stagger-visible" : ""}`}
          style={{ transitionDelay: "0.15s" }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
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
              <div>
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
            <div>
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
            <Button type="submit" variant="hero" size="lg" className="w-full sm:w-auto min-w-[180px]" disabled={isSubmitting}>
              {isSubmitting ? "提交中..." : "预约体验"}
            </Button>
          </form>

          <div className="mt-12 pt-8 border-t border-border grid sm:grid-cols-3 gap-6">
            {contactInfo.map((info) => (
              <div key={info.label} className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-card flex items-center justify-center flex-shrink-0">
                  <info.icon className="w-5 h-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{info.label}</p>
                  <p className="text-sm font-medium text-foreground break-all">{info.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
