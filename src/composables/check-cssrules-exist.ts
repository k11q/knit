import { useCounterStore } from "@/stores/counter";

export function useCheckCSSRules() {
  const selectToi = useCounterStore();

  if (selectToi.selectedBoxData.cssRules) {
    return true;
  } else return false;
}
