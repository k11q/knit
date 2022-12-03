import { defineStore } from "pinia";
import { useCounterStore } from "./counter";
import { useSquareStore } from "./dataSquare";
import { useRulerSnapStore } from "./rulerSnap";
import { useNodeStore } from "./node";

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
    resizeWidthForward(e) {
      const squareStore = useSquareStore();
      const nodeStore = useNodeStore();

      let unit = "px";

      nodeStore.changeWidth(
        Math.round(
          this.prevWidth + (e.clientX - this.prevX) / squareStore.scale
        ),
        unit
      );
    },
    resizeWidthReverse(e) {
      const squareStore = useSquareStore();
      const nodeStore = useNodeStore();

      let unit = "px";

      nodeStore.changeWidth(
        Math.round(
          this.prevWidth + (this.prevX - e.clientX) / squareStore.scale
        ),
        unit
      );
    },
    resizeHeightForward(e) {
      const squareStore = useSquareStore();
      const nodeStore = useNodeStore();

      let unit = "px";

      nodeStore.changeHeight(
        Math.round(
          this.prevHeight + (e.clientY - this.prevY) / squareStore.scale
        ),
        unit
      );
    },
    resizeHeightReverse(e) {
      const squareStore = useSquareStore();
      const nodeStore = useNodeStore();

      let unit = "px";

      nodeStore.changeHeight(
        Math.round(
          this.prevHeight + (this.prevY - e.clientY) / squareStore.scale
        ),
        unit
      );
    },
    resizeLeftForward(e) {
      const squareStore = useSquareStore();
      const selectToi = useCounterStore();

      if (selectToi.selectedBoxData.cssRules[0]?.style?.left) {
        selectToi.selectedBoxData.cssRules[0].style.left.value = Math.round(
          this.prevLeft + (e.clientX - this.prevX) / squareStore.scale
        );
      }
    },
    resizeLeftReverse(e) {
      const squareStore = useSquareStore();
      const selectToi = useCounterStore();

      if (selectToi.selectedBoxData.cssRules[0]?.style?.left) {
        selectToi.selectedBoxData.cssRules[0].style.left.value = Math.round(
          this.prevLeft + (this.prevX - e.clientX) / squareStore.scale
        );
      }
    },
    resizeTopForward(e) {
      const squareStore = useSquareStore();
      const selectToi = useCounterStore();

      if (selectToi.selectedBoxData.cssRules[0]?.style?.top) {
        selectToi.selectedBoxData.cssRules[0].style.top.value = Math.round(
          this.prevTop + (e.clientY - this.prevY) / squareStore.scale
        );
      }
    },
    resizeTopReverse(e) {
      const squareStore = useSquareStore();
      const selectToi = useCounterStore();

      if (selectToi.selectedBoxData.cssRules[0]?.style?.top) {
        selectToi.selectedBoxData.cssRules[0].style.top.value = Math.round(
          this.prevTop + (this.prevY - e.clientY) / squareStore.scale
        );
      }
    },

    resizeBottomRight(e) {
      const resizeStore = useResizeStore();
      const squareStore = useSquareStore();
      const rulerSnap = useRulerSnapStore();
      if (!squareStore.dragPointer && !squareStore.draggingPointer) {
        const selectToi = useCounterStore();

        this.prevLeft = selectToi.selectedBoxData.cssRules[0].style.left?.value;
        this.prevTop = selectToi.selectedBoxData.cssRules[0].style.top?.value;
        this.prevWidth = parseInt(
          selectToi.selectedBoxData.cssRules[0].style.width.value
        );
        this.prevHeight = parseInt(
          selectToi.selectedBoxData.cssRules[0].style.height.value
        );

        this.prevX = e.clientX;
        this.prevY = e.clientY;

        this.isResizing = true;

        window.addEventListener("mousemove", mousemove);
        window.addEventListener("mouseup", mouseup);

        function mousemove(e) {
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
    resizeBottomLeft(e) {
      const resizeStore = useResizeStore();
      const squareStore = useSquareStore();
      const rulerSnap = useRulerSnapStore();
      if (!squareStore.dragPointer && !squareStore.draggingPointer) {
        const selectToi = useCounterStore();

        this.prevTop = parseInt(
          selectToi.selectedBoxData.cssRules[0].style.top?.value
        );
        this.prevWidth = parseInt(
          selectToi.selectedBoxData.cssRules[0].style.width.value
        );
        this.prevHeight = parseInt(
          selectToi.selectedBoxData.cssRules[0].style.height.value
        );
        this.prevLeft = parseInt(
          selectToi.selectedBoxData.cssRules[0].style.left?.value
        );

        this.prevX = e.clientX;
        this.prevY = e.clientY;

        this.isResizing = true;

        window.addEventListener("mousemove", mousemove);
        window.addEventListener("mouseup", mouseup);

        function mousemove(e) {
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
    resizeTopLeft(e) {
      const resizeStore = useResizeStore();
      const squareStore = useSquareStore();
      const rulerSnap = useRulerSnapStore();
      if (!squareStore.dragPointer && !squareStore.draggingPointer) {
        const selectToi = useCounterStore();

        this.prevLeft = parseInt(
          selectToi.selectedBoxData.cssRules[0].style.left?.value
        );
        this.prevTop = parseInt(
          selectToi.selectedBoxData.cssRules[0].style.top?.value
        );
        this.prevWidth = parseInt(
          selectToi.selectedBoxData.cssRules[0].style.width.value
        );
        this.prevHeight = parseInt(
          selectToi.selectedBoxData.cssRules[0].style.height.value
        );

        this.prevX = e.clientX;
        this.prevY = e.clientY;

        this.isResizing = true;

        window.addEventListener("mousemove", mousemove);
        window.addEventListener("mouseup", mouseup);

        function mousemove(e) {
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
    resizeTopRight(e) {
      const resizeStore = useResizeStore();
      const squareStore = useSquareStore();
      const rulerSnap = useRulerSnapStore();
      if (!squareStore.dragPointer && !squareStore.draggingPointer) {
        const selectToi = useCounterStore();

        this.prevLeft = parseInt(
          selectToi.selectedBoxData.cssRules[0].style.left?.value
        );
        this.prevWidth = parseInt(
          selectToi.selectedBoxData.cssRules[0].style.width.value
        );
        this.prevTop = parseInt(
          selectToi.selectedBoxData.cssRules[0].style.top?.value
        );
        this.prevHeight = parseInt(
          selectToi.selectedBoxData.cssRules[0].style.height.value
        );

        this.prevX = e.clientX;
        this.prevY = e.clientY;

        this.isResizing = true;

        window.addEventListener("mousemove", mousemove);
        window.addEventListener("mouseup", mouseup);

        function mousemove(e) {
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
    resizeRight(e) {
      const resizeStore = useResizeStore();
      const squareStore = useSquareStore();
      const rulerSnap = useRulerSnapStore();
      if (!squareStore.dragPointer && !squareStore.draggingPointer) {
        const selectToi = useCounterStore();

        this.prevLeft = selectToi.selectedBoxData.cssRules[0].style.left?.value;
        this.prevWidth =
          selectToi.selectedBoxData.cssRules[0].style.width.value;

        this.prevX = e.clientX;

        this.isResizing = true;

        window.addEventListener("mousemove", mousemove);
        window.addEventListener("mouseup", mouseup);

        function mousemove(e) {
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
    resizeLeft(e) {
      const resizeStore = useResizeStore();
      const squareStore = useSquareStore();
      const rulerSnap = useRulerSnapStore();
      if (!squareStore.dragPointer && !squareStore.draggingPointer) {
        const selectToi = useCounterStore();

        this.prevWidth = parseInt(
          selectToi.selectedBoxData.cssRules[0].style.width.value
        );
        this.prevLeft = parseInt(
          selectToi.selectedBoxData.cssRules[0].style.left?.value
        );

        this.prevX = e.clientX;

        this.isResizing = true;

        window.addEventListener("mousemove", mousemove);
        window.addEventListener("mouseup", mouseup);

        function mousemove(e) {
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
    resizeTop(e) {
      const resizeStore = useResizeStore();
      const squareStore = useSquareStore();
      const rulerSnap = useRulerSnapStore();
      if (!squareStore.dragPointer && !squareStore.draggingPointer) {
        const selectToi = useCounterStore();

        this.prevHeight =
          selectToi.selectedBoxData.cssRules[0].style.height.value;
        this.prevTop = selectToi.selectedBoxData.cssRules[0].style.top?.value;

        this.prevY = e.clientY;

        this.isResizing = true;

        window.addEventListener("mousemove", mousemove);
        window.addEventListener("mouseup", mouseup);

        function mousemove(e) {
          resizeStore.isResizingTop = true;
          if (Math.abs(e.movementX) <= 5 && Math.abs(e.movementX) <= 5) {
            rulerSnap.on = true;
            rulerSnap.setResizeSnap(e, selectToi.selectedBoxData?.id);
            if (!rulerSnap.snapTop && !rulerSnap.snapHeight) {
              resizeStore.resizeHeightReverse(e);
              resizeStore.resizeTopForward(e);
            }
          } else if (Math.abs(e.movementX) > 5 || Math.abs(e.movementX) > 5) {
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
    resizeBottom(e) {
      const resizeStore = useResizeStore();
      const squareStore = useSquareStore();
      const rulerSnap = useRulerSnapStore();
      if (!squareStore.dragPointer && !squareStore.draggingPointer) {
        const selectToi = useCounterStore();

        this.prevTop = selectToi.selectedBoxData.cssRules[0].style.top?.value;
        this.prevHeight =
          selectToi.selectedBoxData.cssRules[0].style.height.value;

        this.prevY = e.clientY;

        this.isResizing = true;

        window.addEventListener("mousemove", mousemove);
        window.addEventListener("mouseup", mouseup);

        function mousemove(e) {
          resizeStore.isResizingBottom = true;
          if (Math.abs(e.movementX) <= 5 && Math.abs(e.movementX) <= 5) {
            rulerSnap.on = true;
            rulerSnap.setResizeSnap(e, selectToi.selectedBoxData?.id);
            if (!rulerSnap.snapHeight) {
              resizeStore.resizeHeightForward(e);
            }
          } else if (Math.abs(e.movementX) > 5 || Math.abs(e.movementX) > 5) {
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
