<template>
  <template v-for="line in lines" :key="line.height" class="overflow-visible">
    <div
      v-if="line.lineTop"
      :style="{
        top: line.lineTop + 'px',
        width: '100vw',
      }"
      class="h-[1px] bg-red-600 fixed pointer-events-none overflow-visible"
    ></div>
    <div
      v-if="line.lineBottom"
      :style="{
        top: line.lineBottom + 'px',
        width: '100vw',
      }"
      class="h-[1px] bg-red-600 fixed pointer-events-none overflow-visible"
    ></div>
    <div
      v-if="line.lineLeft"
      :style="{
        left: line.lineLeft + 'px',
        height: '100vh',
      }"
      class="w-[1px] bg-red-600 fixed pointer-events-none overflow-visible"
    ></div>
    <div
      v-if="line.lineRight"
      :style="{
        left: line.lineRight + 'px',
        height: '100vh',
      }"
      class="w-[1px] bg-red-600 fixed pointer-events-none overflow-visible"
    ></div>
  </template>
</template>

<script setup lang="ts">
import { useSquareStore } from "../stores/dataSquare";

const squareStore = useSquareStore();

const props = defineProps({
  lines: Array,
});
</script>
