<template>
  <div
    class="flex flex-col h-screen overflow-hidden max-h-screen min-h-screen text-[11px] text-white"
    :style="{ backgroundColor: selectToi.canvas[0].bgColor }"
    :class="{
      '!cursor-row-resize': canvasStore.cursorType === 'row-resize',
      '!cursor-col-resize': canvasStore.cursorType === 'col-resize',
      '!cursor-ew-resize': canvasStore.cursorType === 'ew-resize',
    }"
  >
    <DesignerTopBar />
    <div class="flex flex-row justify-between relative">
      <div
        class="left-0 top-0 bottom-0 right-[240px] w-auto h-auto absolute overflow-hidden"
      >
        <div class="absolute inset-0 left-[296px] top-0 bottom-0">
          <div id="canvas-wrapper" v-once></div>
        </div>
      </div>
      <DesignerLeftSidePanel />
      <DesignerRightSidePanel />
    </div>
    <div
      v-if="canvasStore.cursorLabel"
      :style="{
        lineHeight: 1.1,
        transform: `translate(${x + 10}px, ${y - 25}px)`,
        willChange: 'transform',
      }"
      class="bg-[#E93372] absolute pointer-events-none px-1 rounded-sm py-0.5 text-[11px]"
    >
      {{ canvasStore.cursorLabel }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCanvasStore } from "@/stores/canvas";
import { useCounterStore } from "@/stores/counter";

const selectToi = useCounterStore();
const canvasStore = useCanvasStore();
const { x, y } = useMouse();

onMounted(() => {
  renderPixi();
});
</script>

<style>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  display: none;
}
</style>
