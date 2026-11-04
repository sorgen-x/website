import { ShoppingBag, Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

export interface CartItem {
  id: string;
  modelId: string;
  modelName: string;
  modelPrice: number;
  addons: { id: string; name: string; price: number }[];
  quantity: number;
}

export interface ShoppingCartProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout?: () => void;
}

export function ShoppingCart({
  open,
  onOpenChange,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}: ShoppingCartProps) {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const getItemTotal = (item: CartItem) => {
    const addonsTotal = item.addons.reduce((sum, addon) => sum + addon.price, 0);
    return (item.modelPrice + addonsTotal) * item.quantity;
  };

  const cartTotal = items.reduce((sum, item) => sum + getItemTotal(item), 0);

  const formatPrice = (price: number) => `¥${price.toLocaleString()}`;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" />
            购物车
            {totalItems > 0 && (
              <span className="text-sm font-normal text-muted-foreground">
                ({totalItems}件商品)
              </span>
            )}
          </SheetTitle>
        </SheetHeader>

        <div className="mt-6 flex flex-col h-[calc(100vh-180px)]">
          {items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                <ShoppingBag className="w-8 h-8 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground">购物车是空的</p>
              <p className="text-sm text-muted-foreground mt-1">
                快去选购心仪的产品吧
              </p>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-auto space-y-4 pr-2">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="bg-muted/30 rounded-xl p-4 space-y-3"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-foreground">
                          SORGEN {item.modelName}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {formatPrice(item.modelPrice)}
                        </p>
                      </div>
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="p-1.5 hover:bg-muted rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4 text-muted-foreground" />
                      </button>
                    </div>

                    {item.addons.length > 0 && (
                      <div className="pt-2 border-t border-border/50 space-y-1">
                        {item.addons.map((addon) => (
                          <div
                            key={addon.id}
                            className="flex justify-between text-sm"
                          >
                            <span className="text-muted-foreground">
                              + {addon.name}
                            </span>
                            <span className="text-foreground">
                              {formatPrice(addon.price)}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-2 border-t border-border/50">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))
                          }
                          className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center hover:bg-muted-foreground/20 transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center hover:bg-muted-foreground/20 transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="font-semibold text-foreground">
                        {formatPrice(getItemTotal(item))}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-border mt-4 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">合计</span>
                  <span className="text-2xl font-semibold text-primary">
                    {formatPrice(cartTotal)}
                  </span>
                </div>
                <Button
                  variant="apple"
                  size="lg"
                  className="w-full"
                  onClick={() => {
                    onOpenChange(false);
                    onCheckout?.();
                  }}
                >
                  去结算
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
