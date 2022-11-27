<template>
  <aside
    class="border-l w-60 flex flex-col h-screen overflow-x-hidden pb-16 z-10 bg-[#232323] border-[#303030]"
  >
    <div class="flex flex-row gap-5 mr-5 items-center">
      <div class="flex items-center justify-center">
        <div class="bg-gray-400 rounded-full aspect-square h-6"></div>
      </div>
      <NuxtLink
        :to="`/p/${route.params.id}/${selectToi.selectedBoxData.name}/preview`"
      >
        <div
          class="flex items-center justify-center text-center cursor-default hover:bg-[#232323] h-8 aspect-square"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="17"
            height="17"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <polygon points="5 3 19 12 5 21 5 3"></polygon>
          </svg>
        </div>
      </NuxtLink>
      <div class="flex items-center justify-center">
        <div>Export</div>
      </div>
      <div class="flex items-center justify-center">
        <NuxtLink
          :to="`http://${route.params.id}.localhost:3000/${selectToi.selectedBoxData.name}`"
        >
          <button
            class="bg-[#0191FA] px-2 py-1 text-[#EDEDED] rounded-md border-none"
          >
            Deploy
          </button>
        </NuxtLink>
      </div>
      <div class="flex items-center justify-center w-10">
        <p>{{ `${(addaSquare.scale * 100).toFixed(2)}` }}%</p>
      </div>
    </div>
    <div
      class="h-10 flex-none flex flex-row items-center px-2 sticky top-0 bg-[#232323]"
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
