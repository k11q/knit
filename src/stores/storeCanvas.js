import { defineStore } from "pinia";
import { useSquareStore } from "./dataSquare";
import { useCounterStore } from "./counter";

export const storeCanvas = defineStore({
  id: "storeCanvas",
  state: () => ({
    currDrag: "",
    prevX: NaN,
    prevY: NaN,
  }),
  actions: {
    setLeftPosition(e) {
      const selectToi = useCounterStore();
      const squareStore = useSquareStore();
      selectToi.selectedBoxData.attr.style.left =
        Math.round(
          (e.clientX - this.prevX - squareStore.offsetLeft) / squareStore.scale
        ) + "px";
    },
    setTopPosition(e) {
      const selectToi = useCounterStore();
      const squareStore = useSquareStore();
      selectToi.selectedBoxData.attr.style.top =
        Math.round(
          (e.clientY - this.prevY - squareStore.offsetTop) / squareStore.scale
        ) + "px";
    },
  },
});
