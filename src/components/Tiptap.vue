<template>
  <ClientOnly>
    <editor-content
      :editor="editor"
      @keyup="$event.stopImmediatePropagation()"
      spellcheck="false"
      :style="{
        outline: `${1 / squareStore.scale}px solid #0191FA`,
        height: getHeight()
          ? getHeight() === 'fit-content' || getHeight() === 'auto'
            ? Math.round(
                useGetElementRect(selectToi.selectedBoxData.id)?.height
              ) /
                squareStore.scale +
              'px'
            : getHeight() + 'px'
          : '',
      }"
    />
  </ClientOnly>
</template>

<script lang="ts" setup>
import { useEditor, EditorContent } from "@tiptap/vue-3";
import { useSquareStore } from "~~/src/stores/dataSquare";
import { useCounterStore } from "../stores/counter";
import { useCanvasStore } from "@/stores/canvas";
import StarterKit from "@tiptap/starter-kit";
import HardBreak from "@tiptap/extension-hard-break";

const selectToi = useCounterStore();
const squareStore = useSquareStore();
const canvasStore = useCanvasStore();

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

canvasStore.textEditor = editor;
</script>

<style>
.ProseMirror {
  white-space: pre !important;
  border-radius: 0;
}

.ProseMirror-focused {
  outline: none;
}
</style>
