<template>
  <template
    v-for="gap in gaps"
    class="overflow-visible flex items-center justify-center text-center"
  >
    <div
      @mouseenter="
        () => {
          hoverState = true;
          if (selectToi.selectedBoxData) {
            selectToi.treeHoverId = selectToi.selectedBoxData.id;
          }
        }
      "
      @mouseleave="
        () => {
          hoverState = false;
        }
      "
      :style="{
        left: useCheckParent(selectToi.selectedBoxData.id)
          ? getFlexDirection() && getFlexDirection() === 'column'
            ? gap.left + 'px'
            : gap.left -
              useGetElement(selectToi.selectedBoxData.id)?.offsetLeft +
              'px'
          : gap.left + 'px',
        top: useCheckParent(selectToi.selectedBoxData.id)
          ? getFlexDirection() && getFlexDirection() === 'column'
            ? gap.top -
              useGetElement(selectToi.selectedBoxData.id)?.offsetTop +
              'px'
            : gap.top + 'px'
          : gap.top + 'px',
        height: gap.height ? gap.height + 'px' : '0px',
        width: gap.width ? gap.width + 'px' : '0px',
        border: canvasStore.isResizingGap
          ? `${1.5 / squareStore.scale}px solid #E93372`
          : '',
        backgroundImage:
          hoverState === true && !canvasStore.isResizingGap
            ? `repeating-linear-gradient(-45deg, #E9337266 ${
                8 / squareStore.scale
              }px, #E9337266 ${9 / squareStore.scale}px, transparent ${
                10 / squareStore.scale
              }px, transparent ${13 / squareStore.scale}px)`
            : '',
        backgroundColor:
          hoverState === true && !canvasStore.isResizingGap ? '#E933720D' : '',
      }"
      class="absolute pointer-events-auto overflow-visible flex items-center justify-center"
    >
      <div
        @mousedown.stop.prevent="useResizeGap($event)"
        @mouseenter="
          getGap()
            ? (canvasStore.cursorLabel = getGap() as string)
            : (canvasStore.cursorLabel = '0')
        "
        @mouseleave="
          canvasStore.isResizingGap ? '' : (canvasStore.cursorLabel = '')
        "
        class="flex items-center justify-center flex-none"
        :class="{
          'hover:cursor-row-resize':
            getFlexDirection() && getFlexDirection() === 'column',
          'hover:cursor-col-resize':
            !getFlexDirection() || getFlexDirection() === 'row',
        }"
        :style="{
          height: `${18 / squareStore.scale}px`,
        }"
      >
        <div
          v-show="!canvasStore.isResizingGap"
          class="bg-[#E93372] pointer-events-none"
          :style="{
            height: `${
              getFlexDirection() && getFlexDirection() === 'column'
                ? 1.5 / squareStore.scale
                : 12 / squareStore.scale
            }px`,
            width: `${
              getFlexDirection() && getFlexDirection() === 'column'
                ? 12 / squareStore.scale
                : 1.5 / squareStore.scale
            }px`,
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
import { useCounterStore } from "@/stores/counter";
import { usePaddingResizeStore } from "~~/src/stores/paddingResizeStore";

const resizeStore = useResizeStore();
const squareStore = useSquareStore();
const canvasStore = useCanvasStore();
const selectToi = useCounterStore();
const paddingResize = usePaddingResizeStore();

const hoverState = ref(false);

const props = defineProps({
  gaps: Array<GapPosition>,
});
</script>
