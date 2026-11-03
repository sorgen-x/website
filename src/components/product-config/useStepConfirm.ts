import { useEffect, useRef, useState } from "react";
import type { StepKey } from "./types";

/**
 * 选中后短暂延迟、播放确认动画，再跳转到下一步。
 * 同时取消上一次未完成的跳转，避免快速连点导致动画叠加或跳步。
 */
export function useStepConfirm(scrollToStep: (key: StepKey) => void) {
  const [confirmingId, setConfirmingId] = useState<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const selectWithConfirm = (
    id: string,
    setter: (id: string) => void,
    nextStep: StepKey
  ) => {
    setter(id);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setConfirmingId(null);
    requestAnimationFrame(() => setConfirmingId(id));
    timerRef.current = setTimeout(() => {
      setConfirmingId(null);
      timerRef.current = null;
      scrollToStep(nextStep);
    }, 700);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return { confirmingId, selectWithConfirm };
}
