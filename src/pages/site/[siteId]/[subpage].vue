<template>
  <PreviewTopBar />
  <template
    v-for="node in [
      selectToi.data[selectToi.data.findIndex((p) => p.id === profile)],
    ]"
    :key="node.id"
  >
    <component
      :is="node.type === 'text' ? 'p' : node.type"
      v-bind="node.attr"
      :style="{
        width: depth === 1 ? '100%' : node.attr.style.width,
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
const subdomain = useSubdomain();
const route = useRoute();
const profile = route.params.subpage;

const props = defineProps({
  modelValue: String,
  nodes: Array,
  depth: {
    type: Number,
    default: 1,
  },
});
</script>
