import { defineStore } from "pinia";
import { useCounterStore } from "./counter";
import { useCanvasFF } from "./canvasFreeForm";

export const useSquareStore = defineStore({
  id: "square",

  state: () => ({
    countBox: 13,
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
    originX: 0,
    originY: 0,

    dataFrame: {
      id: "rectangle" + Math.random() * 100,
      type: "div",
      attr: {
        style: {
          display: "flex",
          backgroundColor: "white",
          height: "100px",
          width: "100px",
          position: "absolute",
          flexDirection: "row",
        },
      },
      parent: "",
      children: [],
    },
    dataText: {
      type: "text",
      textContent: "Text here",
      attr: {
        style: {
          color: "black",
          fontSize: "14px",
          position: "absolute",
        },
      },
      parent: "",
      children: [],
    },
    dataSquare: {
      id: "rectangle" + Math.random() * 100,
      type: "box",
      attr: {
        style: {
          display: "flex",
          backgroundColor: "white",
          height: "100px",
          width: "100px",
          position: "absolute",
          flexDirection: "row",
        },
      },
      parent: "",
      children: [],
    },
  }),
  getters: {},
  actions: {
    addSquare(event, dataPushed) {
      const counter = useCounterStore();
      const canvasFF = useCanvasFF();
      const squareStore = useSquareStore();
      console.log("mousedown = " + event.target);

      function vh(percent) {
        var h = Math.max(
          document.documentElement.clientHeight,
          window.innerHeight || 0
        );
        return (percent * h) / 100;
      }

      function vw(percent) {
        var w = Math.max(
          document.documentElement.clientWidth,
          window.innerWidth || 0
        );
        return (percent * w) / 100;
      }
      if (this.normalPointer === true) {
        counter.clearSelected();
      }
      if (this.dragPointer === true || this.draggingPointer === true) {
        window.addEventListener("mousemove", mousemove);
        window.addEventListener("mouseup", mouseup);

        squareStore.draggingPointer = true;
        squareStore.dragPointer = false;

        let initialOffsetLeft = event.clientX - squareStore.offsetLeft;
        let initialOffsetTop = event.clientY - squareStore.offsetTop;

        function mousemove(event) {
          squareStore.offsetLeft = parseInt(
            Math.round(event.clientX - initialOffsetLeft)
          );
          squareStore.offsetTop = parseInt(
            Math.round(event.clientY - initialOffsetTop)
          );

          console.log("offsetLeft = " + this.offsetLeft);
          console.log("offsetTop = " + this.offsetTop);
          event.preventDefault();
          event.stopPropagation();
        }

        function mouseup(event) {
          squareStore.dragPointer = true;
          squareStore.draggingPointer = false;
          console.log("draggingpointer =" + this.draggingPointer);
          console.log("dragpointer =" + this.dragPointer);

          window.removeEventListener("mousemove", mousemove);
          window.removeEventListener("mouseup", mouseup);
          event.preventDefault();
          event.stopPropagation();
        }
      }

      if (this.addSquareActivated === true) {
        this.dataSquare.id = "box" + this.countBox;
        this.dataSquare.attr.style.left =
          Math.round((event.clientX - this.offsetLeft) / this.scale - 50) +
          "px";
        this.dataSquare.attr.style.top =
          Math.round((event.clientY - this.offsetTop) / this.scale - 50) + "px";
        this.dataSquare.children = [];
        let clonedDataSquare = { ...this.dataSquare };
        clonedDataSquare.attr = { ...this.dataSquare.attr };
        clonedDataSquare.attr.style = { ...this.dataSquare.attr.style };

        this.turnOnNormalPointer();
        dataPushed.push({ ...clonedDataSquare });
        counter.changeSelectedNewlyAdded(event, clonedDataSquare);
        this.countBox = this.countBox + 1;
      }
      if (this.addTextActivated === true) {
        this.dataText.id = "text" + this.countBox;
        this.dataText.attr.style.left =
          Math.round((event.clientX - this.offsetLeft) / this.scale - 50) +
          "px";
        this.dataText.attr.style.top =
          Math.round((event.clientY - this.offsetTop) / this.scale - 50) + "px";
        this.dataText.children = [];
        let clonedDataText = { ...this.dataText };
        clonedDataText.attr = { ...this.dataText.attr };
        clonedDataText.attr.style = { ...this.dataText.attr.style };

        dataPushed.push({ ...clonedDataText });
        this.turnOnNormalPointer();
        counter.changeSelectedNewlyAdded(event, clonedDataText);
        this.countBox = this.countBox + 1;
      }
      if (this.addFrameActivated === true) {
        this.dataFrame.id = "frame" + this.countBox;
        this.dataFrame.attr.style.left =
          Math.round((event.clientX - this.offsetLeft) / this.scale - 50) +
          "px";
        this.dataFrame.attr.style.top =
          Math.round((event.clientY - this.offsetTop) / this.scale - 50) + "px";
        this.dataFrame.children = [];
        let clonedDataFrame = { ...this.dataFrame };
        clonedDataFrame.attr = { ...this.dataFrame.attr };
        clonedDataFrame.attr.style = { ...this.dataFrame.attr.style };

        this.turnOnNormalPointer();

        dataPushed.push({ ...clonedDataFrame });
        counter.changeSelectedNewlyAdded(event, clonedDataFrame);
        this.countBox = this.countBox + 1;
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
