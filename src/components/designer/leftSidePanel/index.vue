<template>
  <div class="flex flex-row flex-none bg-[#1C1C1C] z-10">
    <div
      class="w-14 border-r border-[#282828] p-2 gap-2 flex flex-col flex-none"
    >
      <div
        class="aspect-square flex items-center justify-center text-center cursor-default w-full flex-none rounded hover:bg-[#2E2E2E] hover:opacity-100"
        :class="{
          'opacity-100 bg-[#2E2E2E]': leftPanelStore.activeTab === 'addElement',
          'opacity-60': leftPanelStore.activeTab !== 'addElement',
        }"
        @click="leftPanelStore.activeTab = 'addElement'"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
      </div>
      <div
        class="aspect-square flex items-center justify-center text-center cursor-default w-full flex-none rounded hover:bg-[#2E2E2E] hover:opacity-100"
        :class="{
          'opacity-100 bg-[#2E2E2E]': leftPanelStore.activeTab === 'layers',
          'opacity-60': leftPanelStore.activeTab !== 'layers',
        }"
        @click="leftPanelStore.activeTab = 'layers'"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
          <polyline points="2 17 12 22 22 17"></polyline>
          <polyline points="2 12 12 17 22 12"></polyline>
        </svg>
      </div>
      <div
        class="aspect-square flex items-center justify-center text-center cursor-default w-full flex-none rounded hover:bg-[#2E2E2E] hover:opacity-100"
        :class="{
          'opacity-100 bg-[#2E2E2E]': leftPanelStore.activeTab === 'data',
          'opacity-60': leftPanelStore.activeTab !== 'data',
        }"
        @click="leftPanelStore.activeTab = 'data'"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
          <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
        </svg>
      </div>
      <div
        class="aspect-square flex items-center justify-center text-center cursor-default w-full flex-none rounded hover:bg-[#2E2E2E] hover:opacity-100"
        :class="{
          'opacity-100 bg-[#2E2E2E]': leftPanelStore.activeTab === 'assets',
          'opacity-60': leftPanelStore.activeTab !== 'assets',
        }"
        @click="leftPanelStore.activeTab = 'assets'"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          <circle cx="9" cy="9" r="2"></circle>
          <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path>
        </svg>
      </div>
    </div>
    <div
      class="border-r w-60 flex flex-col flex-none h-screen overflow-x-hidden pb-16 z-10 border-[#282828]"
    >
      <div
        class="h-10 border-b flex-none flex flex-row items-center px-2 sticky top-0 bg-[#1C1C1C] border-[#282828] z-10"
      >
        <div
          class="px-2 h-full items-center flex flex-row cursor-default"
          :class="{
            'font-medium': leftPanelStore.activeTab === 'layers',
            'opacity-40': leftPanelStore.activeTab !== 'layers',
          }"
          @click="leftPanelStore.activeTab = 'layers'"
        >
          <span>Layers</span>
        </div>
        <div
          class="px-2 h-full items-center flex flex-row cursor-default"
          :class="{
            'font-medium ': leftPanelStore.activeTab === 'data',
            'opacity-40': leftPanelStore.activeTab !== 'data',
          }"
          @click="leftPanelStore.activeTab = 'data'"
        >
          <span>Data</span>
        </div>
        <div
          class="px-2 h-full items-center flex flex-row cursor-default"
          :class="{
            'font-medium': leftPanelStore.activeTab === 'assets',
            'opacity-40': leftPanelStore.activeTab !== 'assets',
          }"
          @click="leftPanelStore.activeTab = 'assets'"
        >
          <span>Assets</span>
        </div>
      </div>
      <!--layers tab content -->
      <DesignerLeftSidePanelTabsAddElement
        v-if="leftPanelStore.activeTab === 'addElement'"
      />
      <DesignerLeftSidePanelTabsLayers
        v-if="leftPanelStore.activeTab === 'layers'"
      />
    </div>
  </div>
</template>

<script setup>
import { useCounterStore } from "@/stores/counter";
import { useLeftPanelStore } from "@/stores/leftPanelStore";

const selectToi = useCounterStore();
const leftPanelStore = useLeftPanelStore();
</script>
