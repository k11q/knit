<template>
  <template v-for="line in lines" :key="line.height" class="overflow-visible">
    <div
      v-if="line.lineTop"
      :style="{
        top: line.lineTop + squareStore.offsetTop + 'px',
        width: '100vw',
      }"
      class="h-[1px] bg-red-600 fixed pointer-events-none overflow-visible"
    ></div>
    <div
      v-if="line.lineBottom"
      :style="{
        top: line.lineBottom + squareStore.offsetTop + 'px',
        width: '100vw',
      }"
      class="h-[1px] bg-red-600 fixed pointer-events-none overflow-visible"
    ></div>
    <div
      v-if="line.lineLeft"
      :style="{
        left: line.lineLeft + squareStore.offsetLeft + 'px',
        height: '100vh',
      }"
      class="w-[1px] bg-red-600 fixed pointer-events-none overflow-visible"
    ></div>
    <div
      v-if="line.lineRight"
      :style="{
        left: line.lineRight + squareStore.offsetLeft + 'px',
        height: '100vh',
      }"
      class="w-[1px] bg-red-600 fixed pointer-events-none overflow-visible"
    ></div>
  </template>
</template>

<script setup>
import { useSquareStore } from "~~/stores/dataSquare";

const squareStore = useSquareStore();
</script>

<script>
export default {
  name: "rulerBrowser",
  props: {
    lines: Array,
  },
  data() {
    return {};
  },
  emits: [],
  methods: {},
};
</script>
