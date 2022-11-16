<template>
  <div
    class="flex flex-col h-screen overflow-hidden max-h-screen min-h-screen text-xs text-[#EDEDED]"
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

const route = useRoute();
const paramsId = route.params.id;
const paramsPageId = route.params.pageId;
</script>
