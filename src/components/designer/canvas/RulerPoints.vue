<template>
  <template
    v-for="point in points"
    class="overflow-visible flex items-center justify-center text-center"
  >
    <div
      :style="{
        left: point.x - 2.5 + 'px',
        top: point.y - 9 + 'px',
      }"
      class="h-1 w-1 fixed pointer-events-none overflow-visible checkx"
    ></div>
  </template>
</template>

<script setup>
import { useSquareStore } from "~~/src/stores/dataSquare";
import { useRulerSnapStore } from "~~/src/stores/rulerSnap";

const rulerSnap = useRulerSnapStore();

const props = defineProps({
  points: Array,
});
</script>

<style scoped>
.checkx:after {
  content: "\d7"; /* use the hex value here... */
  color: #e93372;
  margin: auto;
  font-size: 10px;
  line-height: 10px;
  font-weight: 200;
}
</style>
