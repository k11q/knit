<template>
  <div
    class="flex flex-col h-screen overflow-hidden max-h-screen min-h-screen text-xs bg-neutral-200"
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

<script setup lang="ts">
import { useCounterStore } from "@/stores/counter";

const selectToi = useCounterStore();
</script>
