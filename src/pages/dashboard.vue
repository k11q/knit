<template>
  <div
    class="flex flex-row justify-start h-screen overflow-hidden max-h-screen min-h-screen text-sm bg-[#1C1C1C] text-[#EDEDED]"
  >
    <DashboardLeftSidePanel />
    <DashboardContent />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: "auth",
});
</script>
