import { ArrowRight, Save, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ConfigActionsProps {
  onCheckout: () => void;
  onAddToCart?: () => void;
  onSave: () => void;
  isLoggedIn: boolean;
  showAddToCart: boolean;
}

export function ConfigActions({
  onCheckout,
  onAddToCart,
  onSave,
  isLoggedIn,
  showAddToCart,
}: ConfigActionsProps) {
  return (
    <div className="pt-4 space-y-3">
      <Button variant="apple" size="xl" className="w-full" onClick={onCheckout}>
        立即预约购买
        <ArrowRight className="w-5 h-5" />
      </Button>
      {showAddToCart && (
        <Button variant="appleOutline" size="xl" className="w-full" onClick={onAddToCart}>
          <ShoppingBag className="w-5 h-5" />
          添加到购物车
        </Button>
      )}
      <Button variant="ghost" size="lg" className="w-full" onClick={onSave}>
        <Save className="w-4 h-4" />
        {isLoggedIn ? "保存当前选配到个人中心" : "登录以保存当前选配"}
      </Button>
      <p className="text-center text-sm text-muted-foreground mt-4">
        预计发货时间：3-4 周 · 全国包邮安装
      </p>
    </div>
  );
}
