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
      type: "frame",
      bgColor: "white",
      height: 100,
      width: 100,
      unit: "px",
      Xunit: "px",
      Yunit: "px",
      position: "absolute",
      flexDirection: "row",
      parent: "",
      children: [],
    },
    dataText: {
      id: "rectangle" + Math.random() * 100,
      type: "text",
      textContent: "Text here",
      fontSize: 14,
      unit: "px",
      Xunit: "px",
      Yunit: "px",
      position: "absolute",
      parent: "",
    },
    dataSquare: {
      id: "rectangle" + Math.random() * 100,
      type: "box",
      bgColor: "white",
      height: 100,
      width: 100,
      unit: "px",
      Xunit: "px",
      Yunit: "px",
      position: "absolute",
      flexDirection: "row",
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
        this.dataSquare.X = (event.clientX - this.offsetLeft) / this.scale - 50;
        this.dataSquare.Y = (event.clientY - this.offsetTop) / this.scale - 50;
        this.dataSquare.children = [];
        let clonedDataSquare = { ...this.dataSquare };

        this.turnOnNormalPointer();
        dataPushed.push(clonedDataSquare);
        counter.changeSelectedNewlyAdded(event, clonedDataSquare);
        this.countBox = this.countBox + 1;
      } else if (this.addTextActivated === true) {
        this.dataText.id = "text" + this.countBox;
        this.dataText.X = (event.clientX - this.offsetLeft) / this.scale - 50;
        this.dataText.Y = (event.clientY - this.offsetTop) / this.scale - 50;
        let clonedDataText = { ...this.dataText };

        this.turnOnNormalPointer();

        dataPushed.push(clonedDataText);
        counter.changeSelectedNewlyAdded(e, clonedDataText);
        this.countBox = this.countBox + 1;
      } else if (this.addFrameActivated === true) {
        this.dataFrame.id = "frame" + this.countBox;
        this.dataFrame.X = (event.clientX - this.offsetLeft) / this.scale - 50;
        this.dataFrame.Y = (event.clientY - this.offsetTop) / this.scale - 50;
        this.dataFrame.children = [];
        let clonedDataFrame = { ...this.dataFrame };

        this.turnOnNormalPointer();

        dataPushed.push(clonedDataFrame);
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
