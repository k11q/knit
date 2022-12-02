<template>
  <template v-for="element in elements">
    <div
      class="absolute border-box"
      :style="{
        willChange: 'left, top',
        left: element.attr?.style?.left,
        top: element.attr?.style?.top,
        width:
          element.attr?.style?.width &&
          element.attr?.style?.width !== 'fit-content'
            ? element.attr?.style?.width
            : useGetElementRect(element.id)?.width / squareStore.scale + 'px',
        height:
          element.attr?.style?.height &&
          element.attr?.style?.height !== 'fit-content'
            ? element.attr?.style?.height
            : useGetElementRect(element.id)?.height / squareStore.scale + 'px',
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
