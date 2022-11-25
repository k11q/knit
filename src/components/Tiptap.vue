<template>
  <editor-content :editor="editor" @keyup="$event.stopImmediatePropagation()" />
</template>

<script lang="ts" setup>
import { useEditor, EditorContent } from "@tiptap/vue-3";
import { useSquareStore } from "@/stores/dataSquare";
import { useEditorStore } from "@/stores/editorStore";
import StarterKit from "@tiptap/starter-kit";
import HardBreak from "@tiptap/extension-hard-break";

const squareStore = useSquareStore();
const editorStore = useEditorStore();

const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["update:modelValue"]);

const editor = useEditor({
  content: props.modelValue,
  autofocus: "all",
  extensions: [
    StarterKit,
    HardBreak.extend({
      addKeyboardShortcuts() {
        return {
          Enter: () => this.editor.commands.setHardBreak(),
        };
      },
    }),
  ],
  onUpdate: ({ editor }) => {
    let content = editor.getHTML();
    emit("update:modelValue", content);
  },
});

watch(
  () => props.modelValue,
  (newValue, oldValue) => {
    const isSame = newValue === editor.value.getHTML();
    if (isSame) {
      return;
    }
    editor.value?.commands.setContent(newValue, false);
  }
);

editorStore.editor = editor;
</script>

<style>
.ProseMirror {
  white-space: pre !important;
  border-radius: 0;
}

.ProseMirror-focused {
  outline: v-bind(`${1 / squareStore.scale}px solid #0191FA`);
}
</style>
