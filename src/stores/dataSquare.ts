import { defineStore } from "pinia";
import { useCounterStore } from "./counter";
import { useCanvasStore } from "./canvas";

export const useSquareStore = defineStore({
  id: "square",

  state: () => ({
    addSquareActivated: false,
    addTextActivated: false,
    addBoxActivated: false,
    addFrameActivated: false,
    normalPointer: true,
    dragPointer: false,
    draggingPointer: false,
    offsetLeft: 0,
    offsetTop: 0,
    scale: 1,
  }),
  actions: {
    addSquare(event: MouseEvent) {
      const selectToi = useCounterStore();
      const squareStore = useSquareStore();
      const canvasStore = useCanvasStore();

      if (this.normalPointer === true) {
        useSetDeselect();
        canvasStore.selection = [];
        useSetSelect(event);
      }
      if (this.dragPointer === true || this.draggingPointer === true) {
        window.addEventListener("mousemove", mousemove);
        window.addEventListener("mouseup", mouseup);

        squareStore.draggingPointer = true;
        squareStore.dragPointer = false;

        let initialOffsetLeft = event.clientX - squareStore.offsetLeft;
        let initialOffsetTop = event.clientY - squareStore.offsetTop;

        function mousemove(event: MouseEvent) {
          squareStore.offsetLeft = Math.round(
            event.clientX - initialOffsetLeft
          );
          squareStore.offsetTop = Math.round(event.clientY - initialOffsetTop);

          event.preventDefault();
          event.stopPropagation();
        }

        function mouseup(event: MouseEvent) {
          squareStore.dragPointer = true;
          squareStore.draggingPointer = false;

          window.removeEventListener("mousemove", mousemove);
          window.removeEventListener("mouseup", mouseup);
          event.preventDefault();
          event.stopPropagation();
        }
      }

      if (this.addSquareActivated === true) {
        canvasStore.selection = [];
        createRectangle(event);
      }
      if (this.addTextActivated === true) {
        canvasStore.selection = [];
        createText(event);
      }
      if (this.addFrameActivated === true) {
        canvasStore.selection = [];
        createFrame(event);
      }
    },
    turnOnAddSquareActivated() {
      this.addSquareActivated = true;
      this.addTextActivated = false;
      this.addFrameActivated = false;
      this.normalPointer = false;
      this.dragPointer = false;
      this.draggingPointer = false;
    },
    turnOnAddTextActivated() {
      this.addTextActivated = true;
      this.addSquareActivated = false;
      this.addFrameActivated = false;
      this.normalPointer = false;
      this.dragPointer = false;
      this.draggingPointer = false;
    },
    turnOnAddFrameActivated() {
      this.addFrameActivated = true;
      this.addSquareActivated = false;
      this.addTextActivated = false;
      this.normalPointer = false;
      this.dragPointer = false;
      this.draggingPointer = false;
    },
    turnOnNormalPointer() {
      this.addFrameActivated = false;
      this.addSquareActivated = false;
      this.addTextActivated = false;
      this.normalPointer = true;
      this.dragPointer = false;
      this.draggingPointer = false;
    },
    turnOnDragPointer() {
      this.addFrameActivated = false;
      this.addSquareActivated = false;
      this.addTextActivated = false;
      this.normalPointer = false;
      this.dragPointer = true;
      this.draggingPointer = false;
    },
  },
});
