import { defineStore } from "pinia";
import { useCounterStore } from "./counter";

export const useCanvasDndStore = defineStore({
  id: "canvasDnd",
  state: () => ({
    dragzone: "",
    dropzone: "",
  }),
});
