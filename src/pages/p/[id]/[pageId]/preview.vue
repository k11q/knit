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
      :is="node.type === 'text' || node.type === 'box' ? 'div' : node.type"
      v-bind="node.attr"
      :style="{
        width: depth === 1 ? '100%' : node.attr.style.width,
        left: depth === 1 ? '' : node.attr.style.left,
        top: depth === 1 ? '' : node.attr.style.top,
      }"
    >
      <template v-if="node.type === 'text'">
        <span v-html="node.textContent"></span>
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

const selectToi = useCounterStore();

const props = defineProps({
  nodes: Array,
  depth: {
    type: Number,
    default: 1,
  },
});
</script>
