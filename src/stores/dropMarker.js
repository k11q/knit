import { defineStore } from "pinia";
import { useCounterStore } from "./counter";
import { useSquareStore } from "./dataSquare";

export const useDropMarker = defineStore({
  id: "dropMarker",
  state: () => ({
    isDragging: false,
    markerHeight: "",
    markerWidth: "",
    markerLeft: "",
    markerTop: "",
  }),
  actions: {
    setMarker(e) {
      const selectToi = useCounterStore();
      const squareStore = useSquareStore();

      let drop = useGetClosestElement(e);
      console.log(
        ("drop = " + drop.style.paddingLeft.replace(/[^0-9\.]+/g, "")) | 0
      );
      console.log("drop = " + drop);
      let dropRect = drop.getBoundingClientRect();
      let paddingLeft = drop.style.paddingLeft.replace(/[^0-9\.]+/g, "") | 0;
      let paddingTop = drop.style.paddingTop.replace(/[^0-9\.]+/g, "") | 0;

      if (drop.style.flexDirection === "column") {
        this.markerLeft =
          paddingLeft +
          (dropRect.x - squareStore.offsetLeft) / squareStore.scale +
          "px";
        this.markerTop =
          paddingTop +
          (dropRect.y - squareStore.offsetTop) / squareStore.scale +
          "px";
        this.markerHeight = "4px";
        this.markerWidth = selectToi.selectedBoxData.attr.style.width;
      }
      if (drop.style.flexDirection === "row") {
        this.markerLeft = paddingLeft + selectToi.treeHoverHTMLX + "px";
        this.markerTop = paddingTop + selectToi.treeHoverHTMLY + "px";
        this.markerHeight = selectToi.selectedBoxData.attr.style.height;
        this.markerWidth = "4px";
      }
    },
  },
});
