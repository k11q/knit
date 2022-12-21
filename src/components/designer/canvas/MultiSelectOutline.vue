<template>
  <template v-for="element in elements">
    <div
      class="absolute border-box"
      :style="{
        willChange: 'left, top',
        left: element.cssRules[0].style.left?.value + 'px',
        top: element.cssRules[0].style.top?.value + 'px',
        width:
          element.cssRules[0].style?.width &&
          element.cssRules[0].style.width.value !== 'fit-content'
            ? element.cssRules[0].style.width.value + 'px'
            : useGetElementRect(element.id)?.width / squareStore.scale + 'px',
        height:
          element.cssRules[0].style?.height &&
          element.cssRules[0].style.height.value !== 'fit-content'
            ? element.cssRules[0].style.height.value + 'px'
            : useGetElementRect(element.id)?.height / squareStore.scale + 'px',
        border: `${1 / squareStore.scale}px solid #0191FA`,
      }"
    ></div>
  </template>
</template>

<script setup lang="ts">
import { useSquareStore } from "@/stores/dataSquare";
import { Node } from "@/stores/counter";

const squareStore = useSquareStore();

const props = defineProps({
  elements: Array<Node>,
});
</script>
