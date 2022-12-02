<template>
  <template v-for="element in elements">
    <div
      class="absolute"
      :style="{
        willChange: 'left, top',
        left: element.attr?.style?.left,
        top: element.attr?.style?.top,
        width: element.attr?.style?.width,
        height: element.attr?.style?.height,
        border: `${1 / squareStore.scale}px solid #0191FA`,
      }"
    ></div>
  </template>
</template>

<script setup>
import { useSquareStore } from "@/stores/dataSquare";

const squareStore = useSquareStore();

const props = defineProps({
  elements: Array,
});
</script>
