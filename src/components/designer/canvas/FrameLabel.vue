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
        willChange: 'transform',
      }"
      class="absolute -mt-5 cursor-default overflow-ellipsis"
    >
      <p
        @mousedown.stop="
          () => {
            if (mouseenter) {
              useSetSelectSingle($event, frame.id);
              canvasStore.dndWithoutParent($event, frame.id);
            }
          }
        "
        @mouseenter="
          () => {
            mouseenter = true;
            canvasStore.hoverId = frames.id;
            selectToi.treeHoverId = frame.id;
          }
        "
        @mouseout="
          () => {
            if (mouseenter) {
              selectToi.treeHover = false;
              selectToi.treeHoverId = '';
              canvasStore.hoverId = '';
              mouseenter = false;
            }
          }
        "
        class="fixed cursor-default hover:text-[#6EB0E0] hover:opacity-100 overflow-hidden overflow-ellipsis"
        :class="{
          'text-[#6EB0E0] opacity-100':
            mouseenter ||
            selectToi.selectedBox === frame.id ||
            selectToi.treeHoverId === frame.id,
          'text-[#FAFAFA] opacity-40':
            !mouseenter &&
            selectToi.selectedBox != frame.id &&
            selectToi.treeHoverId != frame.id,
        }"
        :style="{
          maxWidth: width(frame),
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

const mouseenter = ref(false);

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

function width(frame: Node) {
  return frame.cssRules[0].style.width
    ? Math.round(
        (frame.cssRules[0].style.width.value as number) * squareStore.scale
      ) + "px"
    : useGetElementRect(frame.id)?.width + "px";
}

const props = defineProps({
  frames: Array<Node>,
});
</script>
