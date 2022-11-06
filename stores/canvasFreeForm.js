import { defineStore } from "pinia";

export const useCanvasFF = defineStore({
  id: "canvasFF",
  state: () => ({
    isDragging: false,
    isResizing: false,
    scale: 1,
    positionX: 0,
    positionY: 0,
    oriPositionX: 0,
    oriPositionY: 0,
    isCanvasDragging: false,
    windowHeight: '',
    windowWidth: '',
  }),
  getter: {

    adjustScale() {
      
      return `transform: scale(${ this.scale })`
    }
  },
  actions: {
    dragCanvasStart() {
        console.log("start drag")
      isCanvasDragging = true;
      this.oriPositionX = e.clientX;
      this.oriPositionY = e.clientY;
    },
    dragCanvasMove() {
      if (this.isCanvasDragging == true) {
        console.log("e = "+e.clientX)
        console.log("y = "+y.clientX)
        positionX = e.clientX - this.oriPositionX;
        positionY = e.clientY - this.oriPositionX;
      }
    },
    dragCanvasup() {
      this.isCanvasDragging = false;
    },
  },
});
