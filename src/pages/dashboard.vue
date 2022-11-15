<template>
  <div
    class="flex flex-col h-screen overflow-hidden max-h-screen min-h-screen text-xs bg-neutral-200"
    :style="{ backgroundColor: selectToi.canvas[0].bgColor }"
  >
    <Canvas />
    <TopBar />
    <div class="flex flex-row justify-start">
      <DashboardLeftSidePanel />
    </div>
  </div>
</template>

<script setup>
import { useCounterStore } from "@/stores/counter";

const selectToi = useCounterStore();
</script>
