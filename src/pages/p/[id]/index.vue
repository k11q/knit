<template>
  <div
    class="flex flex-col h-screen overflow-hidden max-h-screen min-h-screen text-xs text-white"
    :style="{ backgroundColor: selectToi.canvas[0].bgColor }"
  >
    <DesignerCanvas />
    <DesignerTopBar />
    <div class="flex flex-row justify-between">
      <DesignerLeftSidePanel />
      <DesignerRightSidePanel />
    </div>
    <div
      v-if="canvasStore.cursorLabel"
      :style="{ left: `${x + 10}px`, top: `${y - 25}px`, lineHeight: 1 }"
      class="bg-red-600 absolute pointer-events-none px-1 rounded-sm py-0.5"
    >
      {{ canvasStore.cursorLabel }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCounterStore } from "@/stores/counter";
import { useCanvasStore } from "@/stores/canvas";

const selectToi = useCounterStore();
const canvasStore = useCanvasStore();
const { x, y } = useMouse();
</script>
