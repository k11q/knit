<template>
  <div
    class="flex flex-col w-full h-fit"
    v-show="leftPanelStore.activeTab === 'layers'"
  >
    <TreeBrowser :nodes="selectToi.data" />
  </div>
</template>

<script setup>
import { useCounterStore } from "../../../stores/counter";
import { useLeftPanelStore } from "../../../stores/leftPanelStore";

const selectToi = useCounterStore();
const leftPanelStore = useLeftPanelStore();
</script>
