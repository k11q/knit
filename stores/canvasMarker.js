import { defineStore } from "pinia";

export const useCanvasMarkerStore = defineStore({
  id: "canvasMarker",
  state: () => ({
    isDragging: false,
    lines: [
      { height: 40, width: 50, left: 50, top: 200 },
      { height: 60, width: 20, left: 100, top: 240 },
      { height: 200, width: 100, left: 200, top: 100 },
    ],
  }),
  actions: {
    getChild(id) {},
  },
});
