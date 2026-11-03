import { useEffect, useMemo, useRef, useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { toast } from "sonner";
import { CheckoutDialog } from "./CheckoutDialog";
import { ConfigCompareDialog } from "./ConfigCompareDialog";
import {
  exteriorOptions,
  interiorOptions,
  models,
  otherOptions,
} from "./product-config/data";
import type { CartItem, SelectedAddon, StepKey } from "./product-config/types";
import { useStepConfirm } from "./product-config/useStepConfirm";
import { useConfigPersistence } from "./product-config/useConfigPersistence";
import { ConfigPreview } from "./product-config/ConfigPreview";
import { StepProgress } from "./product-config/StepProgress";
import { ModelStep } from "./product-config/ModelStep";
import { ExteriorStep } from "./product-config/ExteriorStep";
import { InteriorStep } from "./product-config/InteriorStep";
import { AddonsStep } from "./product-config/AddonsStep";
import { SummaryStep } from "./product-config/SummaryStep";
import { ConfigActions } from "./product-config/ConfigActions";

interface ProductConfigProps {
  onAddToCart?: (item: CartItem) => void;
}

export function ProductConfig({ onAddToCart }: ProductConfigProps) {
  // —— 选配状态 ——
  const [selectedModel, setSelectedModel] = useState("pro");
  const [selectedExterior, setSelectedExterior] = useState("exterior-pearl");
  const [selectedInterior, setSelectedInterior] = useState("interior-linen");
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

  // —— UI 状态 ——
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [compareExteriorOpen, setCompareExteriorOpen] = useState(false);
  const [compareInteriorOpen, setCompareInteriorOpen] = useState(false);
  const [previewTab, setPreviewTab] = useState<"exterior" | "interior">("exterior");
  const [activeStep, setActiveStep] = useState<StepKey>("model");

  const { ref, isVisible } = useScrollAnimation();

  // —— 步骤 refs ——
  const stepRefs: Record<StepKey, React.RefObject<HTMLDivElement>> = {
    model: useRef<HTMLDivElement>(null),
    exterior: useRef<HTMLDivElement>(null),
    interior: useRef<HTMLDivElement>(null),
    addons: useRef<HTMLDivElement>(null),
    summary: useRef<HTMLDivElement>(null),
  };

  const scrollToStep = (key: StepKey) => {
    setActiveStep(key);
    stepRefs[key].current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const { confirmingId, selectWithConfirm } = useStepConfirm(scrollToStep);

  // —— 视口高亮 ——
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    (Object.keys(stepRefs) as StepKey[]).forEach((key) => {
      const el = stepRefs[key].current;
      if (!el) return;
      const ob = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveStep(key);
        },
        { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
      );
      ob.observe(el);
      observers.push(ob);
    });
    return () => observers.forEach((o) => o.disconnect());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // —— 派生数据 ——
  const currentModel = useMemo(
    () => models.find((m) => m.id === selectedModel)!,
    [selectedModel]
  );
  const currentExterior = useMemo(
    () => exteriorOptions.find((o) => o.id === selectedExterior)!,
    [selectedExterior]
  );
  const currentInterior = useMemo(
    () => interiorOptions.find((o) => o.id === selectedInterior)!,
    [selectedInterior]
  );

  const selectedAddonDetails = useMemo<SelectedAddon[]>(() => {
    const list: SelectedAddon[] = [];
    if (currentExterior.price > 0) {
      list.push({
        id: currentExterior.id,
        name: `外观 · ${currentExterior.name}`,
        price: currentExterior.price,
        priceDisplay: currentExterior.priceDisplay,
      });
    }
    if (currentInterior.price > 0) {
      list.push({
        id: currentInterior.id,
        name: `内饰 · ${currentInterior.name}`,
        price: currentInterior.price,
        priceDisplay: currentInterior.priceDisplay,
      });
    }
    otherOptions
      .filter((a) => selectedAddons.includes(a.id))
      .forEach((a) =>
        list.push({ id: a.id, name: a.name, price: a.price, priceDisplay: a.priceDisplay })
      );
    return list;
  }, [currentExterior, currentInterior, selectedAddons]);

  const totalPrice = useMemo(
    () => currentModel.price + selectedAddonDetails.reduce((s, a) => s + a.price, 0),
    [currentModel, selectedAddonDetails]
  );

  // —— 持久化（登录后自动恢复 / 防抖保存）——
  const { user, saveNow } = useConfigPersistence({
    selectedModel,
    selectedExterior,
    selectedInterior,
    selectedAddons,
    totalPrice,
    setSelectedModel,
    setSelectedExterior,
    setSelectedInterior,
    setSelectedAddons,
  });

  // —— 事件处理 ——
  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  };

  const handleAddToCart = () => {
    if (!onAddToCart) return;
    onAddToCart({
      id: `${currentModel.id}-${Date.now()}`,
      modelId: currentModel.id,
      modelName: currentModel.name,
      modelPrice: currentModel.price,
      addons: selectedAddonDetails.map(({ id, name, price }) => ({ id, name, price })),
      quantity: 1,
    });
    toast.success("已添加到购物车", { description: currentModel.name });
  };

  const handleEditStep = (step: "model" | "exterior" | "interior" | "addons") => {
    setCheckoutOpen(false);
    setTimeout(() => scrollToStep(step), 200);
  };

  return (
    <section className="py-24 lg:py-32 bg-card">
      <div ref={ref} className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div
          className={`text-center max-w-3xl mx-auto mb-16 stagger-item ${
            isVisible ? "stagger-visible" : ""
          }`}
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-foreground tracking-tight mb-6">
            极简美学，融入生活。
          </h2>
          <p className="text-xl text-muted-foreground">定制您的 Vitality</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <ConfigPreview
            previewTab={previewTab}
            onPreviewTabChange={setPreviewTab}
            isVisible={isVisible}
          />

          {/* Configuration Options */}
          <div className="space-y-8">
            <StepProgress activeStep={activeStep} onStepClick={scrollToStep} />

            <ModelStep
              ref={stepRefs.model}
              selectedId={selectedModel}
              confirmingId={confirmingId}
              onSelect={(id) => selectWithConfirm(id, setSelectedModel, "exterior")}
            />

            <ExteriorStep
              ref={stepRefs.exterior}
              selectedId={selectedExterior}
              confirmingId={confirmingId}
              onSelect={(id) => selectWithConfirm(id, setSelectedExterior, "interior")}
              onCompare={() => setCompareExteriorOpen(true)}
            />

            <InteriorStep
              ref={stepRefs.interior}
              selectedId={selectedInterior}
              confirmingId={confirmingId}
              onSelect={(id) => selectWithConfirm(id, setSelectedInterior, "addons")}
              onCompare={() => setCompareInteriorOpen(true)}
            />

            <AddonsStep
              ref={stepRefs.addons}
              selectedIds={selectedAddons}
              onToggle={toggleAddon}
            />

            <SummaryStep
              ref={stepRefs.summary}
              model={currentModel}
              addons={selectedAddonDetails}
              totalPrice={totalPrice}
            />

            <ConfigActions
              onCheckout={() => setCheckoutOpen(true)}
              onAddToCart={handleAddToCart}
              onSave={saveNow}
              isLoggedIn={!!user}
              showAddToCart={!!onAddToCart}
            />
          </div>
        </div>
      </div>

      <CheckoutDialog
        open={checkoutOpen}
        onOpenChange={setCheckoutOpen}
        modelName={currentModel.name}
        modelPrice={currentModel.price}
        addons={selectedAddonDetails.map(({ name, price }) => ({ name, price }))}
        totalPrice={totalPrice}
        configBreakdown={{
          exterior: { name: currentExterior.name, price: currentExterior.price },
          interior: { name: currentInterior.name, price: currentInterior.price },
          others: otherOptions
            .filter((o) => selectedAddons.includes(o.id))
            .map(({ name, price }) => ({ name, price })),
        }}
        onEditStep={handleEditStep}
      />

      <ConfigCompareDialog
        open={compareExteriorOpen}
        onOpenChange={setCompareExteriorOpen}
        type="exterior"
        items={exteriorOptions}
        selectedId={selectedExterior}
        onSelect={setSelectedExterior}
      />
      <ConfigCompareDialog
        open={compareInteriorOpen}
        onOpenChange={setCompareInteriorOpen}
        type="interior"
        items={interiorOptions}
        selectedId={selectedInterior}
        onSelect={setSelectedInterior}
      />
    </section>
  );
}
