<template>
  <div
    class="flex flex-row justify-start h-screen overflow-hidden max-h-screen min-h-screen text-sm"
  >
    <DashboardLeftSidePanel />
    <DashboardContent />
  </div>
</template>

<script setup>
import { useCounterStore } from "@/stores/counter";

const selectToi = useCounterStore();
</script>
