import { useEffect, useMemo, useRef, useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import {
  exteriorOptions,
  interiorOptions,
  models,
  otherOptions,
} from "./product-config/data";
import type { SelectedAddon, StepKey } from "./product-config/types";
import { useStepConfirm } from "./product-config/useStepConfirm";
import { ConfigPreview } from "./product-config/ConfigPreview";
import { StepProgress } from "./product-config/StepProgress";
import { ModelStep } from "./product-config/ModelStep";
import { ExteriorStep } from "./product-config/ExteriorStep";
import { InteriorStep } from "./product-config/InteriorStep";
import { AddonsStep } from "./product-config/AddonsStep";
import { SummaryStep } from "./product-config/SummaryStep";
import { ConfigActions } from "./product-config/ConfigActions";
import { ConfigCompareDialog } from "./ConfigCompareDialog";

export function ProductConfig() {
  const [selectedModel, setSelectedModel] = useState("pro");
  const [selectedExterior, setSelectedExterior] = useState("exterior-pearl");
  const [selectedInterior, setSelectedInterior] = useState("interior-linen");
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [compareExteriorOpen, setCompareExteriorOpen] = useState(false);
  const [compareInteriorOpen, setCompareInteriorOpen] = useState(false);
  const [previewTab, setPreviewTab] = useState<"exterior" | "interior">("exterior");
  const [activeStep, setActiveStep] = useState<StepKey>("model");

  const { ref, isVisible } = useScrollAnimation();

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
    if (currentExterior.id !== "exterior-pearl") {
      list.push({
        id: currentExterior.id,
        name: `外观 · ${currentExterior.name}`,
        price: 0,
        priceDisplay: currentExterior.priceDisplay,
      });
    }
    if (currentInterior.id !== "interior-linen") {
      list.push({
        id: currentInterior.id,
        name: `内饰 · ${currentInterior.name}`,
        price: 0,
        priceDisplay: currentInterior.priceDisplay,
      });
    }
    otherOptions
      .filter((a) => selectedAddons.includes(a.id))
      .forEach((a) =>
        list.push({ id: a.id, name: a.name, price: 0, priceDisplay: a.priceDisplay })
      );
    return list;
  }, [currentExterior, currentInterior, selectedAddons]);

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  };

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="configure" className="py-24 lg:py-32 bg-background">
      <div ref={ref} className="max-w-6xl mx-auto px-6">
        <div
          className={`text-center max-w-3xl mx-auto mb-16 stagger-item ${
            isVisible ? "stagger-visible" : ""
          }`}
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-foreground tracking-tight mb-6">
            了解配置。
          </h2>
          <p className="text-xl text-muted-foreground">定制你的 Aether · 价格请预约咨询</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <ConfigPreview
            previewTab={previewTab}
            onPreviewTabChange={setPreviewTab}
            isVisible={isVisible}
          />

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
              totalPrice={0}
            />

            <ConfigActions
              onCheckout={scrollToContact}
              onSave={scrollToContact}
              isLoggedIn={false}
              showAddToCart={false}
            />
          </div>
        </div>
      </div>

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
