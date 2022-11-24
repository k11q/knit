import { defineStore } from "pinia";
import { useSquareStore } from "./dataSquare";
import { useCounterStore } from "./counter";

export const usePaddingResizeStore = defineStore({
  id: "paddingResize",
  state: () => ({
    showPaddingResizer: false,
    isResizing: false,
    currentResizing: "",
  }),
  actions: {
    setShowPaddingResizer() {
      this.showPaddingResizer = true;
    },
    resizePaddingRight(e) {
      const squareStore = useSquareStore();
      if (!squareStore.dragPointer && !squareStore.draggingPointer) {
        const selectToi = useCounterStore();
        this.currentResizing = "right";

        let prevPaddingRight =
          parseInt(selectToi.selectedBoxData.attr.style.paddingRight) || 0;

        let prevX = e.clientX;

        this.isResizing = true;

        window.addEventListener("mousemove", mousemove);
        window.addEventListener("mouseup", mouseup);

        function mousemove(e) {
          selectToi.selectedBoxData.attr.style.paddingRight =
            Math.round(
              prevPaddingRight / 2 +
                (prevPaddingRight / 2 + (prevX - e.clientX) / squareStore.scale)
            ) + "px";
        }

        function mouseup() {
          this.isResizing = false;
          this.currentResizing = "";
          window.removeEventListener("mousemove", mousemove);
          window.removeEventListener("mouseup", mouseup);
        }
      }
    },
    resizePaddingLeft(e) {
      const squareStore = useSquareStore();
      if (!squareStore.dragPointer && !squareStore.draggingPointer) {
        const selectToi = useCounterStore();
        this.currentResizing = "left";

        let prevPaddingLeft =
          parseInt(selectToi.selectedBoxData.attr.style.paddingLeft) || 0;

        let prevX = e.clientX;

        this.isResizing = true;

        window.addEventListener("mousemove", mousemove);
        window.addEventListener("mouseup", mouseup);

        function mousemove(e) {
          selectToi.selectedBoxData.attr.style.paddingLeft =
            Math.round(
              prevPaddingLeft / 2 +
                (prevPaddingLeft / 2 + (e.clientX - prevX) / squareStore.scale)
            ) + "px";
        }

        function mouseup() {
          this.isResizing = false;
          this.currentResizing = "";
          window.removeEventListener("mousemove", mousemove);
          window.removeEventListener("mouseup", mouseup);
        }
      }
    },
    resizePaddingTop(e) {
      const squareStore = useSquareStore();
      if (!squareStore.dragPointer && !squareStore.draggingPointer) {
        const selectToi = useCounterStore();
        this.currentResizing = "top";

        let prevPaddingTop =
          parseInt(selectToi.selectedBoxData.attr.style.paddingTop) || 0;

        let prevY = e.clientY;

        this.isResizing = true;

        window.addEventListener("mousemove", mousemove);
        window.addEventListener("mouseup", mouseup);

        function mousemove(e) {
          selectToi.selectedBoxData.attr.style.paddingTop =
            Math.round(
              prevPaddingTop / 2 +
                (prevPaddingTop / 2 + (e.clientY - prevY) / squareStore.scale)
            ) + "px";
        }

        function mouseup() {
          this.isResizing = false;
          this.currentResizing = "";
          window.removeEventListener("mousemove", mousemove);
          window.removeEventListener("mouseup", mouseup);
        }
      }
    },
    resizePaddingBottom(e) {
      const squareStore = useSquareStore();
      if (!squareStore.dragPointer && !squareStore.draggingPointer) {
        const selectToi = useCounterStore();
        this.currentResizing = "bottom";

        let prevPaddingBottom =
          parseInt(selectToi.selectedBoxData.attr.style.paddingBottom) || 0;

        let prevY = e.clientY;

        this.isResizing = true;

        window.addEventListener("mousemove", mousemove);
        window.addEventListener("mouseup", mouseup);

        function mousemove(e) {
          selectToi.selectedBoxData.attr.style.paddingBottom =
            Math.round(
              prevPaddingBottom / 2 +
                (prevPaddingBottom / 2 +
                  (prevY - e.clientY) / squareStore.scale)
            ) + "px";
        }

        function mouseup() {
          this.isResizing = false;
          this.currentResizing = "";
          window.removeEventListener("mousemove", mousemove);
          window.removeEventListener("mouseup", mouseup);
        }
      }
    },
  },
});
