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
    <DesignerCanvas />
    <DesignerTopBar />
    <div class="flex flex-row justify-between">
      <DesignerLeftSidePanel />
      <ClientOnly>
        <DesignerRuler />
      </ClientOnly>
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

<script setup>
import { useCounterStore } from "@/stores/counter";
import { useCanvasStore } from "@/stores/canvas";

const selectToi = useCounterStore();
const canvasStore = useCanvasStore();
const { x, y } = useMouse();
</script>

<style>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  display: none;
}
</style>
