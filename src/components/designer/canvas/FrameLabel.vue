<template>
  <template v-for="frame in frames">
    <div
      :style="{
        pointerEvents:
          selectToi.selectedBox === frame.id &&
          canvasStore.isDragging &&
          (frame.type !== 'text' ||
            (frame.type === 'text' &&
              canvasStore.isDragging &&
              selectToi.selectedTextEditor !== frame.id))
            ? 'none'
            : 'auto',
        transform: `translate(${left(frame)}, ${top(frame)})`,
      }"
      class="absolute -mt-5 cursor-default overflow-ellipsis"
    >
      <p
        @mousedown.stop="canvasStore.dndWithoutParent($event, frame.id)"
        @mouseenter="
          () => {
            canvasStore.hoverData = useGetElementData(selectToi.data, frame.id);
            selectToi.treeHoverId = frame.id;
          }
        "
        @mouseout="
          () => {
            selectToi.treeHover = false;
            selectToi.treeHoverId = '';
            canvasStore.hoverData = {} as Node;
          }
        "
        @click="useSetSelectSingle($event, frame.id)"
        class="fixed cursor-default hover:text-[#6EB0E0] hover:opacity-100 overflow-hidden overflow-ellipsis"
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
import { Node } from "@/stores/counter";

const selectToi = useCounterStore();
const squareStore = useSquareStore();
const canvasStore = useCanvasStore();

function left(frame: Node) {
  return frame.cssRules[0].style.left
    ? ((frame.cssRules[0].style.left.value as number) +
        squareStore.offsetLeft / squareStore.scale) *
        squareStore.scale +
        "px"
    : useGetElementRect(frame.id)?.x + "px";
}

function top(frame: Node) {
  return frame.cssRules[0].style.top
    ? ((frame.cssRules[0].style.top.value as number) +
        squareStore.offsetTop / squareStore.scale) *
        squareStore.scale +
        "px"
    : useGetElementRect(frame.id)?.y + "px";
}

const props = defineProps({
  frames: Array<Node>,
});
</script>
