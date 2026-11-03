import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { Check, CreditCard, Smartphone, Building2, ChevronRight, Shield, Truck, ArrowLeft, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { CartItem } from "./ShoppingCart";

interface CartCheckoutDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  items: CartItem[];
  onOrderComplete?: () => void;
}

type Step = "summary" | "contact" | "payment" | "complete";

const paymentMethods = [
  { id: "alipay", name: "支付宝", icon: Smartphone, desc: "推荐使用" },
  { id: "wechat", name: "微信支付", icon: Smartphone, desc: "扫码支付" },
  { id: "card", name: "银行卡", icon: CreditCard, desc: "信用卡/储蓄卡" },
  { id: "transfer", name: "对公转账", icon: Building2, desc: "企业采购" },
];

export function CartCheckoutDialog({
  open,
  onOpenChange,
  items,
  onOrderComplete,
}: CartCheckoutDialogProps) {
  const [step, setStep] = useState<Step>("summary");
  const [selectedPayment, setSelectedPayment] = useState("alipay");
  const [contactInfo, setContactInfo] = useState({
    name: "",
    phone: "",
    address: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [orderNumbers, setOrderNumbers] = useState<string[]>([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  const formatPrice = (price: number) => `¥${price.toLocaleString()}`;

  const getItemTotal = (item: CartItem) => {
    const addonsTotal = item.addons.reduce((sum, addon) => sum + addon.price, 0);
    return (item.modelPrice + addonsTotal) * item.quantity;
  };

  const cartTotal = items.reduce((sum, item) => sum + getItemTotal(item), 0);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const generateOrderNumber = () => `TH${Date.now().toString().slice(-8)}`;

  const handleNext = async () => {
    if (step === "summary") setStep("contact");
    else if (step === "contact") setStep("payment");
    else if (step === "payment") {
      if (!user) {
        toast.error("请先登录", {
          description: "您需要登录后才能提交订单",
          action: {
            label: "去登录",
            onClick: () => {
              onOpenChange(false);
              navigate("/auth");
            },
          },
        });
        return;
      }

      setSubmitting(true);
      try {
        const newOrderNumbers: string[] = [];

        // Create an order for each cart item
        for (const item of items) {
          const orderNumber = generateOrderNumber() + `-${newOrderNumbers.length + 1}`;
          newOrderNumbers.push(orderNumber);

          const itemTotal = getItemTotal(item);

          const { error } = await supabase.from("orders").insert({
            user_id: user.id,
            order_number: orderNumber,
            model_id: item.modelId,
            model_name: `Vitality ${item.modelName}`,
            model_price: item.modelPrice,
            addons: item.addons.map(a => ({ name: a.name, price: a.price })),
            quantity: item.quantity,
            total_price: itemTotal,
            payment_method: selectedPayment,
            shipping_address: contactInfo,
            status: "pending",
          });

          if (error) throw error;
        }

        setOrderNumbers(newOrderNumbers);
        setStep("complete");
        onOrderComplete?.();
        
      } catch (error: any) {
        console.error("Order creation error:", error);
        toast.error("订单提交失败", {
          description: error.message || "请稍后重试",
        });
      } finally {
        setSubmitting(false);
      }
    }
  };

  const handleBack = () => {
    if (step === "contact") setStep("summary");
    else if (step === "payment") setStep("contact");
  };

  const handleClose = () => {
    onOpenChange(false);
    setTimeout(() => {
      setStep("summary");
      setContactInfo({ name: "", phone: "", address: "" });
      setSelectedPayment("alipay");
      setOrderNumbers([]);
    }, 300);
  };

  const isContactValid = contactInfo.name && contactInfo.phone && contactInfo.address;

  if (items.length === 0) return null;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[540px] p-0 gap-0 bg-background overflow-hidden max-h-[90vh] overflow-y-auto">
        {/* Progress Steps */}
        <div className="px-6 pt-6 pb-4 border-b border-border/50 sticky top-0 bg-background z-10">
          <DialogDescription className="sr-only">
            完成购物车结算流程
          </DialogDescription>
          <div className="flex items-center justify-center gap-2">
            {["确认订单", "填写信息", "选择支付", "完成"].map((label, index) => {
              const steps: Step[] = ["summary", "contact", "payment", "complete"];
              const currentIndex = steps.indexOf(step);
              const isActive = index <= currentIndex;
              const isCurrent = index === currentIndex;
              
              return (
                <div key={label} className="flex items-center">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium transition-all ${
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      } ${isCurrent ? "ring-2 ring-primary/30 ring-offset-2" : ""}`}
                    >
                      {index < currentIndex ? <Check className="w-3.5 h-3.5" /> : index + 1}
                    </div>
                    <span className={`text-sm hidden sm:block ${isActive ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                      {label}
                    </span>
                  </div>
                  {index < 3 && (
                    <ChevronRight className="w-4 h-4 text-muted-foreground/50 mx-2" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="p-6">
          {/* Step 1: Order Summary */}
          {step === "summary" && (
            <div className="space-y-6">
              <DialogHeader>
                <DialogTitle className="text-xl font-semibold text-center">
                  确认您的订单 ({totalItems}件商品)
                </DialogTitle>
              </DialogHeader>
              
              <div className="space-y-4 max-h-[300px] overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="bg-muted/30 rounded-2xl p-5 space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-foreground">Vitality {item.modelName}</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          {formatPrice(item.modelPrice)} × {item.quantity}
                        </p>
                      </div>
                      <p className="font-semibold text-foreground">{formatPrice(item.modelPrice * item.quantity)}</p>
                    </div>
                    
                    {item.addons.length > 0 && (
                      <div className="pt-3 border-t border-border/50 space-y-1">
                        {item.addons.map((addon) => (
                          <div key={addon.id} className="flex justify-between text-sm">
                            <span className="text-muted-foreground">{addon.name}</span>
                            <span className="text-foreground">+{formatPrice(addon.price * item.quantity)}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="pt-3 border-t border-border/50 flex justify-between">
                      <span className="text-sm text-muted-foreground">小计</span>
                      <span className="font-medium text-foreground">{formatPrice(getItemTotal(item))}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-primary/5 rounded-xl p-4 border border-primary/10">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-foreground">订单总计</span>
                  <span className="text-2xl font-semibold text-primary">{formatPrice(cartTotal)}</span>
                </div>
              </div>

              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4" />
                  <span>全国包邮</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  <span>30天无理由退换</span>
                </div>
              </div>

              <Button variant="apple" size="lg" className="w-full" onClick={handleNext}>
                继续
              </Button>
            </div>
          )}

          {/* Step 2: Contact Information */}
          {step === "contact" && (
            <div className="space-y-6">
              <DialogHeader>
                <DialogTitle className="text-xl font-semibold text-center">填写收货信息</DialogTitle>
              </DialogHeader>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="cart-name">收货人姓名</Label>
                  <Input
                    id="cart-name"
                    placeholder="请输入收货人姓名"
                    value={contactInfo.name}
                    onChange={(e) => setContactInfo({ ...contactInfo, name: e.target.value })}
                    className="h-12 rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cart-phone">联系电话</Label>
                  <Input
                    id="cart-phone"
                    placeholder="请输入手机号码"
                    value={contactInfo.phone}
                    onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                    className="h-12 rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cart-address">收货地址</Label>
                  <Input
                    id="cart-address"
                    placeholder="请输入详细收货地址"
                    value={contactInfo.address}
                    onChange={(e) => setContactInfo({ ...contactInfo, address: e.target.value })}
                    className="h-12 rounded-xl"
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="appleOutline" size="lg" className="flex-1" onClick={handleBack}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  返回
                </Button>
                <Button 
                  variant="apple" 
                  size="lg" 
                  className="flex-1" 
                  onClick={handleNext}
                  disabled={!isContactValid}
                >
                  继续
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Payment Method */}
          {step === "payment" && (
            <div className="space-y-6">
              <DialogHeader>
                <DialogTitle className="text-xl font-semibold text-center">选择支付方式</DialogTitle>
              </DialogHeader>

              <div className="space-y-3">
                {paymentMethods.map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setSelectedPayment(method.id)}
                    className={`w-full p-4 rounded-xl border text-left transition-all flex items-center gap-4 ${
                      selectedPayment === method.id
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-muted-foreground/30"
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      selectedPayment === method.id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                    }`}>
                      <method.icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{method.name}</p>
                      <p className="text-sm text-muted-foreground">{method.desc}</p>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      selectedPayment === method.id ? "border-primary bg-primary" : "border-muted-foreground/30"
                    }`}>
                      {selectedPayment === method.id && <Check className="w-3 h-3 text-primary-foreground" />}
                    </div>
                  </button>
                ))}
              </div>

              <div className="bg-muted/30 rounded-xl p-4 flex justify-between items-center">
                <span className="text-muted-foreground">应付金额</span>
                <span className="text-xl font-semibold text-primary">{formatPrice(cartTotal)}</span>
              </div>

              <div className="flex gap-3">
                <Button variant="appleOutline" size="lg" className="flex-1" onClick={handleBack} disabled={submitting}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  返回
                </Button>
                <Button variant="apple" size="lg" className="flex-1" onClick={handleNext} disabled={submitting}>
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      提交中...
                    </>
                  ) : (
                    "立即支付"
                  )}
                </Button>
              </div>
            </div>
          )}

          {/* Step 4: Complete */}
          {step === "complete" && (
            <div className="space-y-6 text-center py-4">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">订单提交成功</h3>
                <p className="text-muted-foreground">
                  共 {items.length} 个订单已提交，我们的客服将在24小时内与您联系确认。
                </p>
              </div>

              <div className="bg-muted/30 rounded-xl p-4 text-left space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">订单数量</span>
                  <span className="text-foreground">{items.length} 个订单</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">商品总数</span>
                  <span className="text-foreground">{totalItems} 件</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">总金额</span>
                  <span className="font-semibold text-foreground">{formatPrice(cartTotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">预计完成</span>
                  <span className="text-foreground">15-20个工作日</span>
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="appleOutline" size="lg" className="flex-1" onClick={() => navigate("/user")}>
                  查看订单
                </Button>
                <Button variant="apple" size="lg" className="flex-1" onClick={handleClose}>
                  完成
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
