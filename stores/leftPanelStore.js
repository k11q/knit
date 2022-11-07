import { defineStore } from "pinia";

export const useLeftPanelStore = defineStore({
  id: "leftPanel",

  state: () => ({
    toggleStroke: false,
    activeTab: "layers",
  }),
});
