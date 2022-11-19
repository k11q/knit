import { defineStore } from "pinia";

export const useCanvasMarkerStore = defineStore({
  id: "canvasMarker",
  state: () => ({
    isDragging: false,
    setRuler: false,
    lines: [],
  }),
  actions: {
    getChild(id) {},
  },
});
