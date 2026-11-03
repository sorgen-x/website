import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { PainPoints } from "@/components/PainPoints";
import { Solutions } from "@/components/Solutions";
import { Technology } from "@/components/Technology";
import { SensoryExperience } from "@/components/SensoryExperience";
import { TargetAudience } from "@/components/TargetAudience";
import { FamilyLink } from "@/components/FamilyLink";
import { ProductConfig } from "@/components/ProductConfig";
import { Contact } from "@/components/Contact";
import { Disclaimer } from "@/components/Disclaimer";
import { Footer } from "@/components/Footer";
import { ShoppingCart } from "@/components/ShoppingCart";
import { CartCheckoutDialog } from "@/components/CartCheckoutDialog";

interface CartItem {
  id: string;
  modelId: string;
  modelName: string;
  modelPrice: number;
  addons: { id: string; name: string; price: number }[];
  quantity: number;
}

const Index = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const handleAddToCart = (item: CartItem) => {
    setCartItems((prev) => [...prev, item]);
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      setCartItems((prev) => prev.filter((item) => item.id !== id));
    } else {
      setCartItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, quantity } : item))
      );
    }
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleCheckout = () => {
    if (cartItems.length > 0) {
      setCheckoutOpen(true);
    }
  };

  const handleOrderComplete = () => {
    setCartItems([]);
  };

  return (
    <main className="min-h-screen bg-background">
      <Navbar cartItemCount={cartItems.length} onCartClick={() => setCartOpen(true)} />
      <HeroSection />
      <PainPoints />
      <Solutions />
      <Technology />
      <SensoryExperience />
      <TargetAudience />
      <FamilyLink />
      <ProductConfig onAddToCart={handleAddToCart} />
      <Contact />
      <Disclaimer />
      <Footer />
      
      <ShoppingCart
        open={cartOpen}
        onOpenChange={setCartOpen}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
      />

      <CartCheckoutDialog
        open={checkoutOpen}
        onOpenChange={setCheckoutOpen}
        items={cartItems}
        onOrderComplete={handleOrderComplete}
      />
    </main>
  );
};

export default Index;
