import { defineStore } from "pinia";

export const useEditorStore = defineStore({
  id: "editor",

  state: () => ({
    editor: undefined,
  }),
});
