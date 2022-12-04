<template>
  <div
    class="flex flex-col h-screen overflow-hidden max-h-screen min-h-screen text-xs text-[#EFEEF1]"
    :style="{ backgroundColor: selectToi.canvas[0].bgColor }"
  >
    <DesignerCanvas />
    <DesignerTopBar />
    <div class="flex flex-row justify-between">
      <DesignerLeftSidePanel />
      <DesignerRightSidePanel />
    </div>
  </div>
</template>

<script setup>
import { useCounterStore } from "~~/src/stores/counter";

const selectToi = useCounterStore();
</script>
