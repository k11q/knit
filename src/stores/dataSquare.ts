import { defineStore } from "pinia";
import { useCounterStore } from "./counter";
import { useCanvasStore } from "./canvas";

export const useSquareStore = defineStore({
  id: "square",

  state: () => ({
    /*
    countBox: 13,
    */
    addSquareActivated: false,
    addTextActivated: false,
    addBoxActivated: false,
    addFrameActivated: false,
    normalPointer: true,
    dragPointer: false,
    draggingPointer: false,
    offsetLeft: NaN,
    offsetTop: NaN,
    scale: 1,
    /*
    dataText: {
      name: "",
      id: "",
      type: "text",
      textContent: "Text here",
      attr: {
        style: {
          color: "black",
          fontSize: "14px",
          position: "absolute",
          lineHeight: 1.2,
          width: "fit-content",
          height: "fit-content",
          whiteSpace: "pre",
        },
      },
      parent: "",
      children: [],
    },
    */
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
        /*
        this.dataText.name = "text" + this.countBox;
        this.dataText.id = useGetRandomLetter() + uid();
        this.dataText.attr.style.left =
          Math.round((event.clientX - this.offsetLeft) / this.scale - 7.75) +
          "px";
        this.dataText.attr.style.top =
          Math.round((event.clientY - this.offsetTop) / this.scale - 7.75) +
          "px";
        this.dataText.children = [];
        let clonedDataText = { ...this.dataText };
        clonedDataText.attr = { ...this.dataText.attr };
        clonedDataText.attr.style = { ...this.dataText.attr.style };

        Promise.resolve()
          .then(() => {
            dataPushed.push({ ...clonedDataText });
            useSetSelectSingle(event, clonedDataText);
          })
          .then(() => {
            useSetOutlineSelector(clonedDataText.id);
          });
        this.turnOnNormalPointer();
        this.countBox = this.countBox + 1;
        */
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
