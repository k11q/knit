import { defineStore } from "pinia";

type RootState = {
  frameCount: number;
  rectangleCount: number;
  textCount: number;
};

export const useDocumentStore = defineStore({
  id: "documentStore",
  state: () =>
    ({
      frameCount: 1,
      rectangleCount: 1,
      textCount: 1,
    } as RootState),
  actions: {},
});
