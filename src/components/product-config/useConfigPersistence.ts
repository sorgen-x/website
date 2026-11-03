import { useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { exteriorOptions, interiorOptions, models, otherOptions } from "./data";

interface PersistenceArgs {
  selectedModel: string;
  selectedExterior: string;
  selectedInterior: string;
  selectedAddons: string[];
  totalPrice: number;
  setSelectedModel: (id: string) => void;
  setSelectedExterior: (id: string) => void;
  setSelectedInterior: (id: string) => void;
  setSelectedAddons: (ids: string[]) => void;
}

/**
 * 登录后自动恢复上次保存的选配，并在用户修改后防抖写回。
 */
export function useConfigPersistence({
  selectedModel,
  selectedExterior,
  selectedInterior,
  selectedAddons,
  totalPrice,
  setSelectedModel,
  setSelectedExterior,
  setSelectedInterior,
  setSelectedAddons,
}: PersistenceArgs) {
  const { user } = useAuth();
  const [restored, setRestored] = useState(false);

  // 恢复
  useEffect(() => {
    if (!user) {
      setRestored(false);
      return;
    }
    let cancelled = false;
    (async () => {
      const { data } = await supabase
        .from("saved_configurations")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();
      if (cancelled || !data) {
        setRestored(true);
        return;
      }
      if (models.find((m) => m.id === data.model_id)) setSelectedModel(data.model_id);
      if (exteriorOptions.find((o) => o.id === data.exterior_id)) setSelectedExterior(data.exterior_id);
      if (interiorOptions.find((o) => o.id === data.interior_id)) setSelectedInterior(data.interior_id);
      if (Array.isArray(data.addon_ids)) {
        setSelectedAddons(
          data.addon_ids.filter((id: string) => otherOptions.find((o) => o.id === id))
        );
      }
      setRestored(true);
      toast.success("已恢复您上次的选配", { description: "可继续修改或直接结算" });
    })();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  // 自动保存（防抖）
  useEffect(() => {
    if (!user || !restored) return;
    const handle = setTimeout(async () => {
      await supabase.from("saved_configurations").upsert(
        {
          user_id: user.id,
          model_id: selectedModel,
          exterior_id: selectedExterior,
          interior_id: selectedInterior,
          addon_ids: selectedAddons,
          total_price: totalPrice,
        },
        { onConflict: "user_id" }
      );
    }, 800);
    return () => clearTimeout(handle);
  }, [user, restored, selectedModel, selectedExterior, selectedInterior, selectedAddons, totalPrice]);

  const saveNow = async () => {
    if (!user) {
      toast.info("请先登录以保存选配", { description: "登录后将自动同步到个人中心" });
      return;
    }
    const { error } = await supabase.from("saved_configurations").upsert(
      {
        user_id: user.id,
        model_id: selectedModel,
        exterior_id: selectedExterior,
        interior_id: selectedInterior,
        addon_ids: selectedAddons,
        total_price: totalPrice,
      },
      { onConflict: "user_id" }
    );
    if (error) toast.error("保存失败", { description: error.message });
    else toast.success("已保存到个人中心");
  };

  return { user, saveNow };
}
