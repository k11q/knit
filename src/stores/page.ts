import { defineStore } from "pinia";

export const usePageStore = defineStore({
  id: "pageStore",
  state: () => ({
    frameCount: 1,
    rectangleCount: 1,
  }),
  actions: {},
});
