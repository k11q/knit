<template>
  <aside class="flex flex-row flex-none bg-[#1C1C1C] z-10">
    <div
      class="w-14 border-r border-[#282828] p-2 gap-2 flex flex-col flex-none"
    >
      <div
        class="aspect-square flex items-center justify-center text-center cursor-default w-full flex-none rounded hover:bg-[#2E2E2E] hover:opacity-100 transition-all duration-300"
        :class="{
          'opacity-100 bg-[#2E2E2E]': activeTab === 'addElement',
          'opacity-60': activeTab !== 'addElement',
        }"
        @click="activeTab = 'addElement'"
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
          'opacity-100 bg-[#2E2E2E]': activeTab === 'layers',
          'opacity-60': activeTab !== 'layers',
        }"
        @click="activeTab = 'layers'"
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
          'opacity-100 bg-[#2E2E2E]': activeTab === 'library',
          'opacity-60': activeTab !== 'library',
        }"
        @click="activeTab = 'library'"
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
      <!--data-->
      <div
        class="aspect-square flex items-center justify-center text-center cursor-default w-full flex-none rounded hover:bg-[#2E2E2E] hover:opacity-100 transition-all duration-300"
        :class="{
          'opacity-100 bg-[#2E2E2E]': activeTab === 'data',
          'opacity-60': activeTab !== 'data',
        }"
        @click="activeTab = 'data'"
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
      <!--pages-->
      <div
        class="aspect-square flex items-center justify-center text-center cursor-default w-full flex-none rounded hover:bg-[#2E2E2E] hover:opacity-100 transition-all duration-300"
        :class="{
          'opacity-100 bg-[#2E2E2E]': activeTab === 'pages',
          'opacity-60': activeTab !== 'pages',
        }"
        @click="activeTab = 'pages'"
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
          <path
            d="M15.5 2H8.6c-.4 0-.8.2-1.1.5-.3.3-.5.7-.5 1.1v12.8c0 .4.2.8.5 1.1.3.3.7.5 1.1.5h9.8c.4 0 .8-.2 1.1-.5.3-.3.5-.7.5-1.1V6.5L15.5 2z"
          ></path>
          <path d="M3 7.6v12.8c0 .4.2.8.5 1.1.3.3.7.5 1.1.5h9.8"></path>
          <path d="M15 2v5h5"></path>
        </svg>
      </div>
      <!--assets-->
      <div
        class="aspect-square flex items-center justify-center text-center cursor-default w-full flex-none rounded hover:bg-[#2E2E2E] hover:opacity-100 transition-all duration-300"
        :class="{
          'opacity-100 bg-[#2E2E2E]': activeTab === 'assets',
          'opacity-60': activeTab !== 'assets',
        }"
        @click="activeTab = 'assets'"
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
      <!--settings-->
      <div
        class="aspect-square flex items-center justify-center text-center cursor-default w-full flex-none rounded hover:bg-[#2E2E2E] hover:opacity-100 transition-all duration-300"
        :class="{
          'opacity-100 bg-[#2E2E2E]': activeTab === 'settings',
          'opacity-60': activeTab !== 'settings',
        }"
        @click="activeTab = 'settings'"
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
          <path
            d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"
          ></path>
          <circle cx="12" cy="12" r="3"></circle>
        </svg>
      </div>
    </div>
    <div
      class="border-r w-60 flex flex-col flex-none h-screen overflow-x-hidden pb-16 z-10 border-[#282828]"
    >
      <!--layers tab content -->
      <DesignerLeftSidePanelTabsAddElement v-if="activeTab === 'addElement'" />
      <DesignerLeftSidePanelTabsLayers v-if="activeTab === 'layers'" />
      <DesignerLeftSidePanelTabsLibrary v-if="activeTab === 'library'" />
      <DesignerLeftSidePanelTabsData v-if="activeTab === 'data'" />
      <DesignerLeftSidePanelTabsPages v-if="activeTab === 'pages'" />
      <DesignerLeftSidePanelTabsAssets v-if="activeTab === 'assets'" />
      <DesignerLeftSidePanelTabsSettings v-if="activeTab === 'settings'" />
    </div>
  </aside>
</template>

<script setup lang="ts">
import { useCounterStore } from "@/stores/counter";

const selectToi = useCounterStore();
let activeTab = ref("layers");
</script>
