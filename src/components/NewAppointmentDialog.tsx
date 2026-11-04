import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "sonner";

interface NewAppointmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

const appointmentTypes = [
  { id: "experience", labelZh: "产品体验", labelEn: "Product Experience", desc: "亲身体验 Aether 家用恢复舱" },
  { id: "consultation", labelZh: "健康咨询", labelEn: "Health Consultation", desc: "与专业健康顾问一对一咨询" },
  { id: "health_check", labelZh: "健康检查", labelEn: "Health Check", desc: "全面健康状态评估" },
];

export function NewAppointmentDialog({
  open,
  onOpenChange,
  onSuccess,
}: NewAppointmentDialogProps) {
  const [selectedType, setSelectedType] = useState("experience");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { user } = useAuth();
  const { t } = useLanguage();

  const handleSubmit = async () => {
    if (!user) {
      toast.error(t("请先登录", "Please login first"));
      return;
    }

    if (!appointmentDate || !appointmentTime) {
      toast.error(t("请选择预约日期和时间", "Please select date and time"));
      return;
    }

    const fullDateTime = `${appointmentDate}T${appointmentTime}:00`;
    const appointmentDateTime = new Date(fullDateTime);

    if (appointmentDateTime <= new Date()) {
      toast.error(t("请选择未来的时间", "Please select a future time"));
      return;
    }

    setSubmitting(true);
    try {
      const { error } = await supabase.from("appointments").insert({
        user_id: user.id,
        appointment_type: selectedType,
        appointment_date: appointmentDateTime.toISOString(),
        notes: notes || null,
        status: "pending",
      });

      if (error) throw error;

      toast.success(t("预约成功", "Appointment created"));
      onSuccess();
      handleClose();
    } catch (error: any) {
      console.error("Appointment creation error:", error);
      toast.error(t("预约失败", "Failed to create appointment"), {
        description: error.message,
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    onOpenChange(false);
    setTimeout(() => {
      setSelectedType("experience");
      setAppointmentDate("");
      setAppointmentTime("");
      setNotes("");
    }, 300);
  };

  // Get min date (tomorrow)
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" />
            {t("新建预约", "New Appointment")}
          </DialogTitle>
          <DialogDescription>
            {t("选择预约类型和时间，我们将为您安排专业服务", "Select appointment type and time")}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 pt-4">
          {/* Appointment Type */}
          <div className="space-y-3">
            <Label>{t("预约类型", "Appointment Type")}</Label>
            <div className="space-y-2">
              {appointmentTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  className={`w-full p-4 rounded-xl border text-left transition-all ${
                    selectedType === type.id
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-muted-foreground/30"
                  }`}
                >
                  <p className="font-medium text-foreground">
                    {t(type.labelZh, type.labelEn)}
                  </p>
                  <p className="text-sm text-muted-foreground mt-0.5">{type.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">{t("日期", "Date")}</Label>
              <Input
                id="date"
                type="date"
                min={minDate}
                value={appointmentDate}
                onChange={(e) => setAppointmentDate(e.target.value)}
                className="h-11"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">{t("时间", "Time")}</Label>
              <Input
                id="time"
                type="time"
                min="09:00"
                max="18:00"
                value={appointmentTime}
                onChange={(e) => setAppointmentTime(e.target.value)}
                className="h-11"
              />
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">{t("备注（可选）", "Notes (optional)")}</Label>
            <Textarea
              id="notes"
              placeholder={t("请输入您的特殊需求或问题...", "Enter any special requirements...")}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <Button variant="outline" className="flex-1" onClick={handleClose} disabled={submitting}>
              {t("取消", "Cancel")}
            </Button>
            <Button
              variant="apple"
              className="flex-1"
              onClick={handleSubmit}
              disabled={submitting || !appointmentDate || !appointmentTime}
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  {t("提交中...", "Submitting...")}
                </>
              ) : (
                t("确认预约", "Confirm")
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
