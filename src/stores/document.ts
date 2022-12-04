import { defineStore } from "pinia";

type RootState = {
  frameCount: number;
  rectangleCount: number;
};

export const useDocumentStore = defineStore({
  id: "documentStore",
  state: () =>
    ({
      frameCount: 1,
      rectangleCount: 1,
    } as RootState),
  actions: {},
});
