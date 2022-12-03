import { defineStore } from "pinia";

export const useDocumentStore = defineStore({
  id: "documentStore",
  state: () => ({
    frameCount: 1,
    rectangleCount: 1,
  }),
  actions: {},
});
