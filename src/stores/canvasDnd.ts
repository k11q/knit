import { defineStore } from "pinia";
import { useCounterStore } from "./counter";

export const useCanvasDndStore = defineStore({
  id: "canvasDnd",
  state: () => ({
    isDragging: false,
    currDrag: "",
    currDragValue: "",
    dragzone: "",
    dropzone: "",
  }),
});
