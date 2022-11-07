import { defineStore } from "pinia";

export const useTopBarStore = defineStore({
  id: "topBar",
  state: () => ({
    globalEvent: "",
  }),
  actions: {},
});
