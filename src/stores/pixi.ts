import { defineStore } from "pinia";

export type CanvasEvent = "createRectangle" | "default";

export const usePixiStore = defineStore({
  id: "pixiStore",
  state: () => ({
    canvasEvent: "default" as CanvasEvent,
  }),
  actions: {
    changeCanvasEvent(event: CanvasEvent) {
      this.canvasEvent = event;
      console.log(this.canvasEvent);
    },
  },
});
