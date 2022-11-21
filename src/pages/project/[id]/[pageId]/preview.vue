<template>
  <PreviewTopBar />
  <template
    v-for="node in [
      selectToi.data[
        selectToi.data.findIndex((p) => p.id === selectToi.selectedBoxData.id)
      ],
    ]"
    :key="node.id"
  >
    <component
      :is="node.type === 'text' ? 'p' : node.type"
      v-bind="node.attr"
      :style="{
        left: depth === 1 ? '' : node.attr.style.left,
        top: depth === 1 ? '' : node.attr.style.top,
      }"
    >
      <template v-if="node.type === 'text'">
        {{ node.textContent }}
      </template>
      <PreviewUIBrowser
        v-if="(node.children && node.type === 'div') || node.type === 'box'"
        :key="node.id"
        :nodes="node.children"
        :depth="depth + 1"
      />
    </component>
  </template>
</template>

<script setup lang="ts">
import { useCounterStore } from "@/stores/counter";
import { useCanvasDndStore } from "@/stores/canvasDnd";
import { useCanvasFF } from "@/stores/canvasFreeForm";
import { useSquareStore } from "@/stores/dataSquare";
import { useCanvasMarkerStore } from "@/stores/canvasMarker";

const selectToi = useCounterStore();
const canvasDnd = useCanvasDndStore();
const canvasFF = useCanvasFF();
const squareStore = useSquareStore();
const canvasMarker = useCanvasMarkerStore();
const route = useRoute();
const paramsId = route.params.id;
const paramsPageId = route.params.pageId;

const props = defineProps({
  modelValue: String,
  nodes: Array,
  depth: {
    type: Number,
    default: 1,
  },
});
const emit = defineEmits("update:modelValue");
function changePageTitle(title) {
  emit("update:modelValue", title); // previously was `this.$emit('input', title)`
}
</script>
