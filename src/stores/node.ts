import { defineStore } from "pinia";
import { useCounterStore } from "./counter";

export const useNodeStore = defineStore({
  id: "nodeStore",
  state: () => ({}),
  actions: {
    changeAlign(value: string) {
      const selectToi = useCounterStore();

      if (!selectToi.selectedBoxData.cssRules[0].style.alignItems) {
        selectToi.selectedBoxData.cssRules[0].style.alignItems = {
          type: "keyword",
          value: value,
        };
      }
      if (selectToi.selectedBoxData.cssRules[0].style.alignItems) {
        selectToi.selectedBoxData.cssRules[0].style.alignItems.value = value;
      }
    },
    changeJustify(value: string) {
      const selectToi = useCounterStore();

      if (!selectToi.selectedBoxData.cssRules[0].style.justifyContent) {
        selectToi.selectedBoxData.cssRules[0].style.justifyContent = {
          type: "keyword",
          value: value,
        };
      }
      if (selectToi.selectedBoxData.cssRules[0].style.justifyContent) {
        selectToi.selectedBoxData.cssRules[0].style.justifyContent.value =
          value;
      }
    },
  },
});
