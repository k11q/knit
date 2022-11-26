<template class="overflow-visible">
  <div
    v-show="
      rulerSnap.currDragPoints?.topLeft?.display &&
      rulerSnap.currDragPoints?.topMiddle?.display &&
      rulerSnap.currDragPoints?.topRight?.display
    "
    :style="{
      top: rulerSnap.currDragPoints?.topLeft?.y + 'px',
      width: '100vw',
    }"
    class="h-[1px] bg-red-600 fixed pointer-events-none overflow-visible"
  ></div>
  <div
    v-show="
      rulerSnap.currDragPoints?.bottomLeft?.display &&
      rulerSnap.currDragPoints?.bottomMiddle?.display &&
      rulerSnap.currDragPoints?.bottomRight?.display
    "
    :style="{
      top: rulerSnap.currDragPoints?.bottomLeft?.y + 'px',
      width: '100vw',
    }"
    class="h-[1px] bg-red-600 fixed pointer-events-none overflow-visible"
  ></div>
  <div
    v-show="
      rulerSnap.currDragPoints?.middleLeft?.display &&
      rulerSnap.currDragPoints?.middle?.display &&
      rulerSnap.currDragPoints?.middleRight?.display
    "
    :style="{
      top: rulerSnap.currDragPoints?.middle?.y + 'px',
      width: '100vw',
    }"
    class="h-[1px] bg-red-600 fixed pointer-events-none overflow-visible"
  ></div>
  <div
    v-show="
      rulerSnap.currDragPoints?.topLeft?.display &&
      rulerSnap.currDragPoints?.middleLeft?.display &&
      rulerSnap.currDragPoints?.bottomLeft?.display
    "
    :style="{
      left: rulerSnap.currDragPoints?.topLeft?.x + 'px',
      height: '100vh',
    }"
    class="w-[1px] bg-red-600 fixed pointer-events-none overflow-visible"
  ></div>
  <div
    v-show="
      rulerSnap.currDragPoints?.topRight?.display &&
      rulerSnap.currDragPoints?.middleRight?.display &&
      rulerSnap.currDragPoints?.bottomRight?.display
    "
    :style="{
      left: rulerSnap.currDragPoints?.topRight?.x + 'px',
      height: '100vh',
    }"
    class="w-[1px] bg-red-600 fixed pointer-events-none overflow-visible"
  ></div>
  <div
    v-show="
      rulerSnap.currDragPoints?.topMiddle?.display &&
      rulerSnap.currDragPoints?.middle?.display &&
      rulerSnap.currDragPoints?.bottomMiddle?.display
    "
    :style="{
      left: rulerSnap.currDragPoints?.middle?.x + 'px',
      height: '100vh',
    }"
    class="w-[1px] bg-red-600 fixed pointer-events-none overflow-visible"
  ></div>
</template>

<script setup>
import { useSquareStore } from "@/stores/dataSquare";
import { useRulerSnapStore } from "@/stores/rulerSnap";

const squareStore = useSquareStore();
const rulerSnap = useRulerSnapStore();
</script>
