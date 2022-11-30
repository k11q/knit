import { defineStore } from "pinia";
import { useCounterStore } from "./counter";
import { useSquareStore } from "./dataSquare";
import { useRulerSnapStore } from "./rulerSnap";

export const useResizeStore = defineStore({
  id: "resize",

  state: () => ({
    isResizing: false,
    prevX: NaN,
    prevY: NaN,
    prevWidth: NaN,
    prevHeight: NaN,
    prevLeft: NaN,
    prevTop: NaN,
  }),
  actions: {
    resizeWidthForward(e) {
      const squareStore = useSquareStore();
      const selectToi = useCounterStore();

      selectToi.selectedBoxData.attr.style.width =
        Math.round(
          this.prevWidth + (e.clientX - this.prevX) / squareStore.scale
        ) + "px";
    },
    resizeWidthReverse(e) {
      const squareStore = useSquareStore();
      const selectToi = useCounterStore();

      selectToi.selectedBoxData.attr.style.width =
        Math.round(
          this.prevWidth + (this.prevX - e.clientX) / squareStore.scale
        ) + "px";
    },
    resizeHeightForward(e) {
      const squareStore = useSquareStore();
      const selectToi = useCounterStore();

      selectToi.selectedBoxData.attr.style.height =
        Math.round(
          this.prevHeight + (e.clientY - this.prevY) / squareStore.scale
        ) + "px";
    },
    resizeHeightReverse(e) {
      const squareStore = useSquareStore();
      const selectToi = useCounterStore();

      selectToi.selectedBoxData.attr.style.height =
        Math.round(
          this.prevHeight + (this.prevY - e.clientY) / squareStore.scale
        ) + "px";
    },
    resizeLeftForward(e) {
      const squareStore = useSquareStore();
      const selectToi = useCounterStore();

      if (selectToi.selectedBoxData.attr?.style?.left) {
        selectToi.selectedBoxData.attr.style.left =
          Math.round(
            this.prevLeft + (e.clientX - this.prevX) / squareStore.scale
          ) + "px";
      }
    },
    resizeLeftReverse(e) {
      const squareStore = useSquareStore();
      const selectToi = useCounterStore();

      if (selectToi.selectedBoxData.attr?.style?.left) {
        selectToi.selectedBoxData.attr.style.left =
          Math.round(
            this.prevLeft + (this.prevX - e.clientX) / squareStore.scale
          ) + "px";
      }
    },
    resizeTopForward(e) {
      const squareStore = useSquareStore();
      const selectToi = useCounterStore();

      if (selectToi.selectedBoxData.attr?.style?.top) {
        selectToi.selectedBoxData.attr.style.top =
          Math.round(
            this.prevTop + (e.clientY - this.prevY) / squareStore.scale
          ) + "px";
      }
    },
    resizeTopReverse(e) {
      const squareStore = useSquareStore();
      const selectToi = useCounterStore();

      if (selectToi.selectedBoxData.attr?.style?.top) {
        selectToi.selectedBoxData.attr.style.top =
          Math.round(
            this.prevTop + (this.prevY - e.clientY) / squareStore.scale
          ) + "px";
      }
    },

    resizeBottomRight(e) {
      const resizeStore = useResizeStore();
      const squareStore = useSquareStore();
      const rulerSnap = useRulerSnapStore();
      if (!squareStore.dragPointer && !squareStore.draggingPointer) {
        const selectToi = useCounterStore();

        this.prevWidth = parseInt(selectToi.selectedBoxData.attr.style.width);
        this.prevHeight = parseInt(selectToi.selectedBoxData.attr.style.height);

        this.prevX = e.clientX;
        this.prevY = e.clientY;

        this.isResizing = true;

        window.addEventListener("mousemove", mousemove);
        window.addEventListener("mouseup", mouseup);

        function mousemove(e) {
          resizeStore.resizeWidthForward(e);
          resizeStore.resizeHeightForward(e);
        }

        function mouseup() {
          resizeStore.isResizing = false;
          window.removeEventListener("mousemove", mousemove);
          window.removeEventListener("mouseup", mouseup);
        }
      }
    },
    resizeBottomLeft(e) {
      const resizeStore = useResizeStore();
      const squareStore = useSquareStore();
      if (!squareStore.dragPointer && !squareStore.draggingPointer) {
        const selectToi = useCounterStore();

        this.prevWidth = parseInt(selectToi.selectedBoxData.attr.style.width);
        this.prevHeight = parseInt(selectToi.selectedBoxData.attr.style.height);
        this.prevLeft = parseInt(selectToi.selectedBoxData.attr.style.left);

        this.prevX = e.clientX;
        this.prevY = e.clientY;

        this.isResizing = true;

        window.addEventListener("mousemove", mousemove);
        window.addEventListener("mouseup", mouseup);

        function mousemove(e) {
          resizeStore.resizeWidthReverse(e);
          resizeStore.resizeHeightForward(e);
          resizeStore.resizeLeftForward(e);
        }

        function mouseup() {
          resizeStore.isResizing = false;
          window.removeEventListener("mousemove", mousemove);
          window.removeEventListener("mouseup", mouseup);
        }
      }
    },
    resizeTopLeft(e) {
      const resizeStore = useResizeStore();
      const squareStore = useSquareStore();

      if (!squareStore.dragPointer && !squareStore.draggingPointer) {
        const selectToi = useCounterStore();

        this.prevLeft = parseInt(selectToi.selectedBoxData.attr.style.left);
        this.prevTop = parseInt(selectToi.selectedBoxData.attr.style.top);
        this.prevWidth = parseInt(selectToi.selectedBoxData.attr.style.width);
        this.prevHeight = parseInt(selectToi.selectedBoxData.attr.style.height);

        this.prevX = e.clientX;
        this.prevY = e.clientY;

        this.isResizing = true;

        window.addEventListener("mousemove", mousemove);
        window.addEventListener("mouseup", mouseup);

        function mousemove(e) {
          resizeStore.resizeLeftForward(e);
          resizeStore.resizeTopForward(e);
          resizeStore.resizeWidthReverse(e);
          resizeStore.resizeHeightReverse(e);
        }

        function mouseup() {
          resizeStore.isResizing = false;
          window.removeEventListener("mousemove", mousemove);
          window.removeEventListener("mouseup", mouseup);
        }
      }
    },
    resizeTopRight(e) {
      const resizeStore = useResizeStore();
      const squareStore = useSquareStore();
      if (!squareStore.dragPointer && !squareStore.draggingPointer) {
        const selectToi = useCounterStore();

        this.prevWidth = parseInt(selectToi.selectedBoxData.attr.style.width);
        this.prevTop = parseInt(selectToi.selectedBoxData.attr.style.top);
        this.prevHeight = parseInt(selectToi.selectedBoxData.attr.style.height);

        this.prevX = e.clientX;
        this.prevY = e.clientY;

        this.isResizing = true;

        window.addEventListener("mousemove", mousemove);
        window.addEventListener("mouseup", mouseup);

        function mousemove(e) {
          resizeStore.resizeWidthForward(e);
          resizeStore.resizeTopForward(e);
          resizeStore.resizeHeightReverse(e);
        }

        function mouseup() {
          resizeStore.isResizing = false;
          window.removeEventListener("mousemove", mousemove);
          window.removeEventListener("mouseup", mouseup);
        }
      }
    },
    resizeRight(e) {
      const resizeStore = useResizeStore();
      const squareStore = useSquareStore();
      if (!squareStore.dragPointer && !squareStore.draggingPointer) {
        const selectToi = useCounterStore();

        this.prevWidth = parseInt(selectToi.selectedBoxData.attr.style.width);

        this.prevX = e.clientX;

        this.isResizing = true;

        window.addEventListener("mousemove", mousemove);
        window.addEventListener("mouseup", mouseup);

        function mousemove(e) {
          resizeStore.resizeWidthForward(e);
        }

        function mouseup() {
          resizeStore.isResizing = false;
          window.removeEventListener("mousemove", mousemove);
          window.removeEventListener("mouseup", mouseup);
        }
      }
    },
    resizeLeft(e) {
      const resizeStore = useResizeStore();
      const squareStore = useSquareStore();
      if (!squareStore.dragPointer && !squareStore.draggingPointer) {
        const selectToi = useCounterStore();

        this.prevWidth = parseInt(selectToi.selectedBoxData.attr.style.width);
        this.prevLeft = parseInt(selectToi.selectedBoxData.attr.style.left);

        this.prevX = e.clientX;

        this.isResizing = true;

        window.addEventListener("mousemove", mousemove);
        window.addEventListener("mouseup", mouseup);

        function mousemove(e) {
          resizeStore.resizeWidthReverse(e);
          resizeStore.resizeLeftForward(e);
        }

        function mouseup() {
          resizeStore.isResizing = false;
          window.removeEventListener("mousemove", mousemove);
          window.removeEventListener("mouseup", mouseup);
        }
      }
    },
    resizeTop(e) {
      const resizeStore = useResizeStore();
      const squareStore = useSquareStore();
      if (!squareStore.dragPointer && !squareStore.draggingPointer) {
        const selectToi = useCounterStore();

        this.prevHeight = parseInt(selectToi.selectedBoxData.attr.style.height);
        this.prevTop = parseInt(selectToi.selectedBoxData.attr.style.top);

        this.prevY = e.clientY;

        this.isResizing = true;

        window.addEventListener("mousemove", mousemove);
        window.addEventListener("mouseup", mouseup);

        function mousemove(e) {
          resizeStore.resizeHeightReverse(e);
          resizeStore.resizeTopForward(e);
        }

        function mouseup() {
          resizeStore.isResizing = false;
          window.removeEventListener("mousemove", mousemove);
          window.removeEventListener("mouseup", mouseup);
        }
      }
    },
    resizeBottom(e) {
      const resizeStore = useResizeStore();
      const squareStore = useSquareStore();
      if (!squareStore.dragPointer && !squareStore.draggingPointer) {
        const selectToi = useCounterStore();

        this.prevHeight = parseInt(selectToi.selectedBoxData.attr.style.height);

        this.prevY = e.clientY;

        this.isResizing = true;

        window.addEventListener("mousemove", mousemove);
        window.addEventListener("mouseup", mouseup);

        function mousemove(e) {
          resizeStore.resizeHeightForward(e);
        }

        function mouseup() {
          resizeStore.isResizing = false;
          window.removeEventListener("mousemove", mousemove);
          window.removeEventListener("mouseup", mouseup);
        }
      }
    },
  },
});
