import { defineStore } from "pinia";

export const useEditorStore = defineStore({
  id: "editorStore",

  state: () => ({
    editor: undefined,
  }),
});
