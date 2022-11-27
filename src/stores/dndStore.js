import { defineStore } from "pinia";
import { useSquareStore } from "./dataSquare";
import { useCounterStore } from "./counter";

export const useDndStore = defineStore({
  id: "dndStore",

  state: () => ({
    prevX: NaN,
    prevY: NaN,
    snapPosition: "",
    snapPositionTop: false,
    snapPositionBottom: false,
    snapPositionLeft: false,
    snapPositionRight: false,
    snapPointTop: NaN,
    snapPointBottom: NaN,
    snapPointLeft: NaN,
    snapPointRight: NaN,
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
