import { defineStore } from "pinia";

export const useCanvasMarkerStore = defineStore({
  id: "canvasMarker",
  state: () => ({
    isDragging: false,
    lines: [],
  }),
  actions: {
    getChild(id) {},
  },
});
