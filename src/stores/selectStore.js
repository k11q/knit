import { defineStore } from "pinia";

export const useSelectStore = defineStore({
  id: "selectStore",
  state: () => ({
    showSelect: false,
    X: NaN,
    Y: NaN,
    width: NaN,
    height: NaN,
  }),
  actions: {},
});
