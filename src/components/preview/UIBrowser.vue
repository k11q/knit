<template>
  <template v-for="node in nodes" :key="node.id">
    <component
      :is="node.type === 'text' || node.type === 'box' ? 'div' : node.type"
      v-bind="node.attr"
      :style="{
        width: depth === 1 ? '' : node.attr.style.width,
        left: depth === 1 ? '' : node.attr.style.left,
        top: depth === 1 ? '' : node.attr.style.top,
      }"
    >
      {{ node.type === "text" ? node.textContent : null }}
      <DesignerCanvasUIBrowser
        v-if="(node.children && node.type === 'div') || node.type === 'box'"
        :key="node.id"
        :nodes="node.children"
        :depth="depth + 1"
      />
    </component>
  </template>
</template>

<script setup>
const props = defineProps({
  modelValue: String,
  nodes: Array,
  depth: {
    type: Number,
    default: 1,
  },
});
const emit = defineEmits("update:modelValue");
</script>
