<template>
  <aside
    class="border-l w-60 flex flex-col h-screen overflow-x-hidden pb-16 z-10 bg-[#18181A] border-[#040407]"
  >
    <div
      class="h-10 flex-none flex flex-row items-center px-2 sticky top-0 bg-[#18181A]"
    >
      <div
        class="px-2 h-full items-center flex flex-row cursor-default"
        :class="{
          'font-medium': activeTab === 'style',
          'opacity-40': activeTab !== 'style',
        }"
        @click="activeTab = 'style'"
      >
        <span>Style</span>
      </div>
      <div
        class="px-2 h-full items-center flex flex-row cursor-default"
        :class="{
          'font-medium': activeTab === 'action',
          'opacity-40': activeTab !== 'action',
        }"
        @click="activeTab = 'action'"
      >
        <span>Action</span>
      </div>
      <div
        class="px-2 h-full items-center flex flex-row cursor-default"
        :class="{
          'font-medium': activeTab === 'props',
          'opacity-40': activeTab !== 'props',
        }"
        @click="activeTab = 'props'"
      >
        <span>Props</span>
      </div>
    </div>
    <DesignerRightSidePanelTabsStyle v-if="activeTab === 'style'" />
    <DesignerRightSidePanelTabsTabProps v-if="activeTab === 'props'" />
    <DesignerRightSidePanelTabsTabAction v-if="activeTab === 'action'" />
  </aside>
</template>

<script setup>
import { useSquareStore } from "@/stores/dataSquare";
import { useCanvasFF } from "@/stores/canvasFreeForm";
import { useCounterStore } from "@/stores/counter";
import { useRightPanelStore } from "@/stores/rightPanelStore";

let activeTab = ref("style");

const selectToi = useCounterStore();
const rightPanelStore = useRightPanelStore();
const route = useRoute();
const addaSquare = useSquareStore();
const canvasFF = useCanvasFF();
</script>
