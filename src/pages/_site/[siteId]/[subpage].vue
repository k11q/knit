<template>
  <PreviewTopBar />
  <NuxtLink to="/rectangle2"> to haha</NuxtLink>
  <template
    v-for="node in [
      selectToi.data[selectToi.data.findIndex((p) => p.name === profile)],
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
      {{ node.type === "text" ? node.textContent : null }}
      <PreviewUIBrowser
        v-if="(node.children && node.type === 'div') || node.type === 'box'"
        :key="node.id"
        :nodes="node.children"
        :depth="depth + 1"
      />
    </component>
  </template>
</template>

<script setup>
import { useCounterStore } from "@/stores/counter";
import { useCanvasDndStore } from "@/stores/canvasDnd";
import { useSquareStore } from "@/stores/dataSquare";

const selectToi = useCounterStore();
const subdomain = useSubdomain();
const route = useRoute();
const profile = route.params.subpage;

const props = defineProps({
  nodes: Array,
  depth: {
    type: Number,
    default: 1,
  },
});
</script>
