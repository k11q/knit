import { defineStore } from "pinia";

export const useCanvasFF = defineStore({
  id: "canvasFF",
  state: () => ({
    isDragging: false,
    positionX: 0,
    positionY: 0,
    oriPositionX: 0,
    oriPositionY: 0,
    isCanvasDragging: false,
  }),
  actions: {
    dragCanvasStart(e: MouseEvent) {
      this.isCanvasDragging = true;
      this.oriPositionX = e.clientX;
      this.oriPositionY = e.clientY;
    },
    dragCanvasMove(e: MouseEvent) {
      if (this.isCanvasDragging == true) {
        this.positionX = e.clientX - this.oriPositionX;
        this.positionY = e.clientY - this.oriPositionX;
      }
    },
    dragCanvasup() {
      this.isCanvasDragging = false;
    },
  },
});
