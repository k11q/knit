import { defineStore } from "pinia";

export const useRightPanelStore = defineStore({
  id: "rightPanel",

  state: () => ({
    toggleStroke: false,
    toggleShadow: false,
    activeTab: "style",
  }),
});
