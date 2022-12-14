import { defineStore } from "pinia";
import { useCounterStore } from "./counter";
import { useSquareStore } from "./dataSquare";
import { useRulerSnapStore } from "./rulerSnap";
import { changeLeft } from "../composables/node";

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
    isResizingTop: false,
    isResizingBottom: false,
    isResizingLeft: false,
    isResizingRight: false,
    isResizingTopLeft: false,
    isResizingTopRight: false,
    isResizingBottomLeft: false,
    isResizingBottomRight: false,
  }),
  actions: {
    resizeWidthForward(e: MouseEvent) {
      const squareStore = useSquareStore();

      changeWidth(
        Math.round(
          this.prevWidth + (e.clientX - this.prevX) / squareStore.scale
        )
      );
    },
    resizeWidthReverse(e: MouseEvent) {
      const squareStore = useSquareStore();

      changeWidth(
        Math.round(
          this.prevWidth + (this.prevX - e.clientX) / squareStore.scale
        )
      );
    },
    resizeHeightForward(e: MouseEvent) {
      const squareStore = useSquareStore();

      changeHeight(
        Math.round(
          this.prevHeight + (e.clientY - this.prevY) / squareStore.scale
        )
      );
    },
    resizeHeightReverse(e: MouseEvent) {
      const squareStore = useSquareStore();

      changeHeight(
        Math.round(
          this.prevHeight + (this.prevY - e.clientY) / squareStore.scale
        )
      );
    },
    resizeLeftForward(e: MouseEvent) {
      const squareStore = useSquareStore();

      changeLeft(
        Math.round(this.prevLeft + (e.clientX - this.prevX) / squareStore.scale)
      );
    },
    resizeLeftReverse(e: MouseEvent) {
      const squareStore = useSquareStore();

      changeLeft(
        Math.round(this.prevLeft + (this.prevX - e.clientX) / squareStore.scale)
      );
    },
    resizeTopForward(e: MouseEvent) {
      const squareStore = useSquareStore();

      changeTop(
        Math.round(this.prevTop + (e.clientY - this.prevY) / squareStore.scale)
      );
    },
    resizeTopReverse(e: MouseEvent) {
      const squareStore = useSquareStore();

      changeTop(
        Math.round(this.prevTop + (this.prevY - e.clientY) / squareStore.scale)
      );
    },

    resizeBottomRight(e: MouseEvent) {
      const resizeStore = useResizeStore();
      const squareStore = useSquareStore();
      const rulerSnap = useRulerSnapStore();
      if (!squareStore.dragPointer && !squareStore.draggingPointer) {
        const selectToi = useCounterStore();

        this.prevLeft = getLeft() as number;
        this.prevTop = getTop() as number;
        this.prevWidth = getWidth() as number;
        this.prevHeight = getHeight() as number;

        this.prevX = e.clientX;
        this.prevY = e.clientY;

        this.isResizing = true;

        window.addEventListener("mousemove", mousemove);
        window.addEventListener("mouseup", mouseup);

        function mousemove(e: MouseEvent) {
          resizeStore.isResizingBottomRight = true;
          if (Math.abs(e.movementX) <= 5 && Math.abs(e.movementX) <= 5) {
            rulerSnap.on = true;
            rulerSnap.setResizeSnap(e, selectToi.selectedBoxData?.id);
            if (!rulerSnap.snapWidth) {
              resizeStore.resizeWidthForward(e);
            }
            if (!rulerSnap.snapHeight) {
              resizeStore.resizeHeightForward(e);
            }
          } else if (Math.abs(e.movementX) > 5 || Math.abs(e.movementX) > 5) {
            rulerSnap.on = false;
            resizeStore.resizeWidthForward(e);
            resizeStore.resizeHeightForward(e);
          }
        }

        function mouseup() {
          resizeStore.isResizing = false;
          resizeStore.isResizingBottomRight = false;
          rulerSnap.show = false;
          window.removeEventListener("mousemove", mousemove);
          window.removeEventListener("mouseup", mouseup);
        }
      }
    },
    resizeBottomLeft(e: MouseEvent) {
      const resizeStore = useResizeStore();
      const squareStore = useSquareStore();
      const rulerSnap = useRulerSnapStore();
      if (!squareStore.dragPointer && !squareStore.draggingPointer) {
        const selectToi = useCounterStore();

        this.prevTop = getTop() as number;
        this.prevWidth = getWidth() as number;
        this.prevHeight = getHeight() as number;
        this.prevLeft = getLeft() as number;

        this.prevX = e.clientX;
        this.prevY = e.clientY;

        this.isResizing = true;

        window.addEventListener("mousemove", mousemove);
        window.addEventListener("mouseup", mouseup);

        function mousemove(e: MouseEvent) {
          resizeStore.isResizingBottomLeft = true;
          if (Math.abs(e.movementX) <= 5 && Math.abs(e.movementX) <= 5) {
            rulerSnap.on = true;
            rulerSnap.setResizeSnap(e, selectToi.selectedBoxData?.id);
            if (!rulerSnap.snapWidth && !rulerSnap.snapLeft) {
              resizeStore.resizeWidthReverse(e);
              resizeStore.resizeLeftForward(e);
            }
            if (!rulerSnap.snapHeight) {
              resizeStore.resizeHeightForward(e);
            }
          } else if (Math.abs(e.movementX) > 5 || Math.abs(e.movementX) > 5) {
            rulerSnap.on = false;
            resizeStore.resizeWidthReverse(e);
            resizeStore.resizeHeightForward(e);
            resizeStore.resizeLeftForward(e);
          }
        }

        function mouseup() {
          resizeStore.isResizing = false;
          resizeStore.isResizingBottomLeft = false;
          rulerSnap.show = false;
          window.removeEventListener("mousemove", mousemove);
          window.removeEventListener("mouseup", mouseup);
        }
      }
    },
    resizeTopLeft(e: MouseEvent) {
      const resizeStore = useResizeStore();
      const squareStore = useSquareStore();
      const rulerSnap = useRulerSnapStore();
      if (!squareStore.dragPointer && !squareStore.draggingPointer) {
        const selectToi = useCounterStore();

        this.prevTop = getTop() as number;
        this.prevWidth = getWidth() as number;
        this.prevHeight = getHeight() as number;
        this.prevLeft = getLeft() as number;

        this.prevX = e.clientX;
        this.prevY = e.clientY;

        this.isResizing = true;

        window.addEventListener("mousemove", mousemove);
        window.addEventListener("mouseup", mouseup);

        function mousemove(e: MouseEvent) {
          resizeStore.isResizingTopLeft = true;
          if (Math.abs(e.movementX) <= 5 && Math.abs(e.movementX) <= 5) {
            rulerSnap.on = true;
            rulerSnap.setResizeSnap(e, selectToi.selectedBoxData?.id);
            if (!rulerSnap.snapWidth && !rulerSnap.snapLeft) {
              resizeStore.resizeLeftForward(e);
              resizeStore.resizeWidthReverse(e);
            }
            if (!rulerSnap.snapTop && !rulerSnap.snapHeight) {
              resizeStore.resizeTopForward(e);
              resizeStore.resizeHeightReverse(e);
            }
          } else if (Math.abs(e.movementX) > 5 || Math.abs(e.movementX) > 5) {
            rulerSnap.on = false;
            resizeStore.resizeLeftForward(e);
            resizeStore.resizeTopForward(e);
            resizeStore.resizeWidthReverse(e);
            resizeStore.resizeHeightReverse(e);
          }
        }

        function mouseup() {
          resizeStore.isResizing = false;
          resizeStore.isResizingTopLeft = false;
          rulerSnap.show = false;
          window.removeEventListener("mousemove", mousemove);
          window.removeEventListener("mouseup", mouseup);
        }
      }
    },
    resizeTopRight(e: MouseEvent) {
      const resizeStore = useResizeStore();
      const squareStore = useSquareStore();
      const rulerSnap = useRulerSnapStore();

      if (!squareStore.dragPointer && !squareStore.draggingPointer) {
        const selectToi = useCounterStore();

        this.prevTop = getTop() as number;
        this.prevWidth = getWidth() as number;
        this.prevHeight = getHeight() as number;
        this.prevLeft = getLeft() as number;

        this.prevX = e.clientX;
        this.prevY = e.clientY;

        this.isResizing = true;

        window.addEventListener("mousemove", mousemove);
        window.addEventListener("mouseup", mouseup);

        function mousemove(e: MouseEvent) {
          resizeStore.isResizingTopRight = true;
          if (Math.abs(e.movementX) <= 5 && Math.abs(e.movementX) <= 5) {
            rulerSnap.on = true;
            rulerSnap.setResizeSnap(e, selectToi.selectedBoxData?.id);

            if (!rulerSnap.snapTop && !rulerSnap.snapHeight) {
              resizeStore.resizeTopForward(e);
              resizeStore.resizeHeightReverse(e);
            }
            if (!rulerSnap.snapWidth) {
              resizeStore.resizeWidthForward(e);
            }
          } else if (Math.abs(e.movementX) > 5 || Math.abs(e.movementX) > 5) {
            rulerSnap.on = false;
            resizeStore.resizeWidthForward(e);
            resizeStore.resizeTopForward(e);
            resizeStore.resizeHeightReverse(e);
          }
        }

        function mouseup() {
          resizeStore.isResizing = false;
          resizeStore.isResizingTopRight = false;
          rulerSnap.show = false;
          window.removeEventListener("mousemove", mousemove);
          window.removeEventListener("mouseup", mouseup);
        }
      }
    },
    resizeRight(e: MouseEvent) {
      const resizeStore = useResizeStore();
      const squareStore = useSquareStore();
      const rulerSnap = useRulerSnapStore();

      if (!squareStore.dragPointer && !squareStore.draggingPointer) {
        const selectToi = useCounterStore();

        this.prevWidth = getWidth() as number;
        this.prevLeft = getLeft() as number;

        this.prevX = e.clientX;

        this.isResizing = true;

        window.addEventListener("mousemove", mousemove);
        window.addEventListener("mouseup", mouseup);

        function mousemove(e: MouseEvent) {
          resizeStore.isResizingRight = true;

          if (Math.abs(e.movementX) <= 5 && Math.abs(e.movementX) <= 5) {
            rulerSnap.on = true;
            rulerSnap.setResizeSnap(e, selectToi.selectedBoxData?.id);

            if (!rulerSnap.snapWidth) {
              resizeStore.resizeWidthForward(e);
            }
          } else if (Math.abs(e.movementX) > 5 || Math.abs(e.movementX) > 5) {
            rulerSnap.on = false;
            resizeStore.resizeWidthForward(e);
          }
        }

        function mouseup() {
          resizeStore.isResizing = false;
          resizeStore.isResizingRight = false;
          rulerSnap.show = false;
          window.removeEventListener("mousemove", mousemove);
          window.removeEventListener("mouseup", mouseup);
        }
      }
    },
    resizeLeft(e: MouseEvent) {
      const resizeStore = useResizeStore();
      const squareStore = useSquareStore();
      const rulerSnap = useRulerSnapStore();
      if (!squareStore.dragPointer && !squareStore.draggingPointer) {
        const selectToi = useCounterStore();

        this.prevWidth = getWidth() as number;
        this.prevLeft = getLeft() as number;

        this.prevX = e.clientX;

        this.isResizing = true;

        window.addEventListener("mousemove", mousemove);
        window.addEventListener("mouseup", mouseup);

        function mousemove(e: MouseEvent) {
          resizeStore.isResizingLeft = true;
          if (Math.abs(e.movementX) <= 5 && Math.abs(e.movementX) <= 5) {
            rulerSnap.on = true;
            rulerSnap.setResizeSnap(e, selectToi.selectedBoxData?.id);
            if (!rulerSnap.snapLeft && !rulerSnap.snapWidth) {
              resizeStore.resizeWidthReverse(e);
              resizeStore.resizeLeftForward(e);
            }
          } else if (Math.abs(e.movementX) > 5 || Math.abs(e.movementX) > 5) {
            rulerSnap.on = false;
            resizeStore.resizeWidthReverse(e);
            resizeStore.resizeLeftForward(e);
          }
        }

        function mouseup() {
          resizeStore.isResizing = false;
          resizeStore.isResizingLeft = false;
          rulerSnap.show = false;
          window.removeEventListener("mousemove", mousemove);
          window.removeEventListener("mouseup", mouseup);
        }
      }
    },
    resizeTop(e: MouseEvent) {
      const resizeStore = useResizeStore();
      const squareStore = useSquareStore();
      const rulerSnap = useRulerSnapStore();
      if (!squareStore.dragPointer && !squareStore.draggingPointer) {
        const selectToi = useCounterStore();

        this.prevTop = getTop() as number;
        this.prevHeight = getHeight() as number;

        this.prevY = e.clientY;

        this.isResizing = true;

        window.addEventListener("mousemove", mousemove);
        window.addEventListener("mouseup", mouseup);

        function mousemove(e: MouseEvent) {
          resizeStore.isResizingTop = true;
          if (Math.abs(e.movementY) <= 5 && Math.abs(e.movementY) <= 5) {
            rulerSnap.on = true;
            rulerSnap.setResizeSnap(e, selectToi.selectedBoxData?.id);
            if (!rulerSnap.snapTop && !rulerSnap.snapHeight) {
              resizeStore.resizeHeightReverse(e);
              resizeStore.resizeTopForward(e);
            }
          } else if (Math.abs(e.movementY) > 5 || Math.abs(e.movementY) > 5) {
            rulerSnap.on = false;
            resizeStore.resizeHeightReverse(e);
            resizeStore.resizeTopForward(e);
          }
        }

        function mouseup() {
          resizeStore.isResizing = false;
          resizeStore.isResizingTop = false;
          rulerSnap.show = false;
          window.removeEventListener("mousemove", mousemove);
          window.removeEventListener("mouseup", mouseup);
        }
      }
    },
    resizeBottom(e: MouseEvent) {
      const resizeStore = useResizeStore();
      const squareStore = useSquareStore();
      const rulerSnap = useRulerSnapStore();
      if (!squareStore.dragPointer && !squareStore.draggingPointer) {
        const selectToi = useCounterStore();

        this.prevTop = getTop() as number;
        this.prevHeight = getHeight() as number;

        this.prevY = e.clientY;

        this.isResizing = true;

        window.addEventListener("mousemove", mousemove);
        window.addEventListener("mouseup", mouseup);

        function mousemove(e: MouseEvent) {
          resizeStore.isResizingBottom = true;
          if (Math.abs(e.movementY) <= 5 && Math.abs(e.movementY) <= 5) {
            rulerSnap.on = true;
            rulerSnap.setResizeSnap(e, selectToi.selectedBoxData?.id);
            if (!rulerSnap.snapHeight) {
              resizeStore.resizeHeightForward(e);
            }
          } else if (Math.abs(e.movementY) > 5 || Math.abs(e.movementY) > 5) {
            rulerSnap.on = false;
            resizeStore.resizeHeightForward(e);
          }
        }

        function mouseup() {
          resizeStore.isResizing = false;
          resizeStore.isResizingBottom = false;
          rulerSnap.show = false;
          window.removeEventListener("mousemove", mousemove);
          window.removeEventListener("mouseup", mouseup);
        }
      }
    },
  },
});
