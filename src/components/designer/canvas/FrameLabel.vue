<template>
  <template v-for="frame in frames">
    <div
      :style="{
        left: frame.cssRules[0].style.left
          ? (frame.cssRules[0].style.left.value as number +
              squareStore.offsetLeft / squareStore.scale) *
              squareStore.scale +
            'px'
          : useGetElementRect(frame.id)?.x + 'px',
        top: frame.cssRules[0].style.top
          ? (frame.cssRules[0].style.top.value as number +
              squareStore.offsetTop / squareStore.scale) *
              squareStore.scale +
            'px'
          : useGetElementRect(frame.id)?.y + 'px',
      }"
      class="absolute overflow-x-hidden -mt-5 pointer-events-auto cursor-default overflow-ellipsis"
    >
      <p
        @mousedown.stop="canvasStore.dndWithoutParent($event, frame.id)"
        @mouseover.stop="
          () => {
            if (!canvasStore.isDragging) {
              useSetOutlineHover(frame.id);
            }
            selectToi.treeHoverId = frame.id;
          }
        "
        @mouseout="
          () => {
            selectToi.treeHover = false;
            selectToi.treeHoverId = '';
          }
        "
        @click="useSetSelectSingle($event, frame.id)"
        class="fixed pointer-events-auto cursor-default hover:text-[#6EB0E0] hover:opacity-100 overflow-hidden overflow-ellipsis"
        :class="{
          'text-[#6EB0E0] opacity-100':
            selectToi.selectedBox === frame.id ||
            selectToi.treeHoverId === frame.id,
          'text-[#FAFAFA] opacity-40':
            selectToi.selectedBox !== frame.id &&
            selectToi.treeHoverId !== frame.id,
        }"
        :style="{
          maxWidth: frame.cssRules[0].style.width
          ? Math.round(frame.cssRules[0].style.width.value as number * squareStore.scale) +
            'px'
          : useGetElementRect(frame.id)?.width + 'px',
        }"
      >
        {{ frame.name }}
      </p>
    </div>
  </template>
</template>

<script setup lang="ts">
import { useCounterStore } from "~~/src/stores/counter";
import { useSquareStore } from "~~/src/stores/dataSquare";
import { useCanvasStore } from "~~/src/stores/canvas";
import { Node as knitNode } from "@/stores/counter";

const selectToi = useCounterStore();
const squareStore = useSquareStore();
const canvasStore = useCanvasStore();

const props = defineProps({
  frames: Array<knitNode>,
});
</script>
