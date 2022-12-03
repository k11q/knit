import { defineStore } from "pinia";
import { useCounterStore } from "./counter";

export const useNodeStore = defineStore({
  id: "nodeStore",
  state: () => ({}),
  actions: {
    changeLeft(value: number, unit: string) {
      const selectToi = useCounterStore();

      if (
        !selectToi.selectedBoxData.cssRules[0].style.left &&
        selectToi.selectedBoxData.cssRules[0].style.position === "absolute"
      ) {
        selectToi.selectedBoxData.cssRules[0].style.left = {
          type: "unit",
          value: value,
          unit: unit,
        };
      }
      if (selectToi.selectedBoxData.cssRules[0].style.left) {
        selectToi.selectedBoxData.cssRules[0].style.left.value = value;
      }
    },
    changeTop(value: number, unit: string) {
      const selectToi = useCounterStore();

      if (!selectToi.selectedBoxData.cssRules[0].style.top) {
        selectToi.selectedBoxData.cssRules[0].style.top = {
          type: "unit",
          value: value,
          unit: unit,
        };
      }
      if (selectToi.selectedBoxData.cssRules[0].style.top) {
        selectToi.selectedBoxData.cssRules[0].style.top.value = value;
      }
    },
    changeWidth(value: number, unit: string) {
      const selectToi = useCounterStore();

      if (!selectToi.selectedBoxData.cssRules[0].style.width) {
        selectToi.selectedBoxData.cssRules[0].style.width = {
          type: "unit",
          value: value,
          unit: unit,
        };
      }
      if (selectToi.selectedBoxData.cssRules[0].style.width) {
        selectToi.selectedBoxData.cssRules[0].style.width.value = value;
      }
    },
    changeHeight(value: number, unit: string) {
      const selectToi = useCounterStore();

      if (!selectToi.selectedBoxData.cssRules[0].style.height) {
        selectToi.selectedBoxData.cssRules[0].style.height = {
          type: "unit",
          value: value,
          unit: unit,
        };
      }
      if (selectToi.selectedBoxData.cssRules[0].style.height) {
        selectToi.selectedBoxData.cssRules[0].style.height.value = value;
      }
    },
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
