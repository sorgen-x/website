import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ConfigActionsProps {
  onCheckout: () => void;
  onAddToCart?: () => void;
  onSave: () => void;
  isLoggedIn: boolean;
  showAddToCart: boolean;
}

export function ConfigActions({ onCheckout }: ConfigActionsProps) {
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="pt-4 space-y-3">
      <Button variant="apple" size="xl" className="w-full" onClick={scrollToContact}>
        预约咨询
        <ArrowRight className="w-5 h-5" />
      </Button>
      <Button variant="appleOutline" size="xl" className="w-full" onClick={onCheckout}>
        了解配置详情
      </Button>
      <p className="text-center text-sm text-muted-foreground mt-4">
        价格与交付细节以咨询确认为准
      </p>
    </div>
  );
}
