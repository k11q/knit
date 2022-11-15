<template>
  <div class="flex flex-row flex-none bg-[#1C1C1C] z-10">
    <div
      class="w-14 border-r border-[#282828] p-2 gap-2 flex flex-col flex-none"
    >
      <div
        class="aspect-square flex items-center justify-center text-center cursor-default w-full flex-none rounded hover:bg-[#2E2E2E] hover:opacity-100 transition-all duration-300"
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
      <!--navigator/layers-->
      <div
        class="aspect-square flex items-center justify-center text-center cursor-default w-full flex-none rounded hover:bg-[#2E2E2E] hover:opacity-100 transition-all duration-300"
        :class="{
          'opacity-100 bg-[#2E2E2E]': leftPanelStore.activeTab === 'layers',
          'opacity-60': leftPanelStore.activeTab !== 'layers',
        }"
        @click="leftPanelStore.activeTab = 'layers'"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clip-path="url(#clip0_544_35)">
            <path
              d="M1.5 4.5H11.5C11.7761 4.5 12 4.27614 12 4V2C12 1.72386 11.7761 1.5 11.5 1.5H1.5C1.22386 1.5 1 1.72386 1 2V4C1 4.27614 1.22386 4.5 1.5 4.5Z"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M6.5 16.5H16.5C16.7761 16.5 17 16.2761 17 16V14C17 13.7239 16.7761 13.5 16.5 13.5H6.5C6.22386 13.5 6 13.7239 6 14V16C6 16.2761 6.22386 16.5 6.5 16.5Z"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M6.5 10.5H16.5C16.7761 10.5 17 10.2761 17 10V8C17 7.72386 16.7761 7.5 16.5 7.5H6.5C6.22386 7.5 6 7.72386 6 8V10C6 10.2761 6.22386 10.5 6.5 10.5Z"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_544_35">
              <rect width="18" height="18" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </div>
      <!--library-->
      <div
        class="aspect-square flex items-center justify-center text-center cursor-default w-full flex-none rounded hover:bg-[#2E2E2E] hover:opacity-100 transition-all duration-300"
        :class="{
          'opacity-100 bg-[#2E2E2E]': leftPanelStore.activeTab === 'library',
          'opacity-60': leftPanelStore.activeTab !== 'library',
        }"
        @click="leftPanelStore.activeTab = 'library'"
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
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
        </svg>
      </div>
      <!--assets-->
      <div
        class="aspect-square flex items-center justify-center text-center cursor-default w-full flex-none rounded hover:bg-[#2E2E2E] hover:opacity-100 transition-all duration-300"
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
      <!--data-->
      <div
        class="aspect-square flex items-center justify-center text-center cursor-default w-full flex-none rounded hover:bg-[#2E2E2E] hover:opacity-100 transition-all duration-300"
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
    </div>
    <div
      class="border-r w-60 flex flex-col flex-none h-screen overflow-x-hidden pb-16 z-10 border-[#282828]"
    >
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
