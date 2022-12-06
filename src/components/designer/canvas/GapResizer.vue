<template>
  <template
    v-for="gap in gaps"
    class="overflow-visible flex items-center justify-center text-center relative"
  >
    <div
      @mouseenter="hoverState = true"
      @mouseleave="hoverState = false"
      :style="{
        left: gap.left + 'px',
        height: gap.height + 'px',
        top: gap.top + 'px',
        right: `${1 / squareStore.scale}px`,
        border: canvasStore.isResizingGap
          ? `${1.5 / squareStore.scale}px solid #E93372`
          : '',
      }"
      class="absolute pointer-events-auto overflow-visible flex items-center justify-center"
      :class="{
        'bg-[#E93372]/20': hoverState === true && !canvasStore.isResizingGap,
      }"
    >
      <div
        @mousedown.stop.prevent="useResizeGap($event)"
        class="flex items-center justify-center flex-none hover:cursor-row-resize"
        :style="{
          height: `${18 / squareStore.scale}px`,
        }"
      >
        <div
          v-show="!canvasStore.isResizingGap"
          class="bg-[#E93372] pointer-events-none"
          :style="{
            height: `${1.5 / squareStore.scale}px`,
            width: `${12 / squareStore.scale}px`,
            outline: `${1 / squareStore.scale}px solid white`,
            borderRadius: `${0.5 / squareStore.scale}px`,
          }"
        ></div>
      </div>
    </div>
  </template>
</template>

<script setup lang="ts">
import { GapPosition } from "~~/src/stores/paddingResizeStore";
import { useResizeStore } from "@/stores/resizeStore";
import { useSquareStore } from "~~/src/stores/dataSquare";
import { useCanvasStore } from "@/stores/canvas";

const resizeStore = useResizeStore();
const squareStore = useSquareStore();
const canvasStore = useCanvasStore();

const hoverState = ref(false);

const props = defineProps({
  gaps: Array<GapPosition>,
});
</script>
