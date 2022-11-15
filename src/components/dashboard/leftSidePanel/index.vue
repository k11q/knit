<template>
  <div
    class="border-r w-60 flex flex-col flex-none h-screen overflow-x-hidden pb-16 z-10 bg-white text-xs"
  >
    <div
      class="h-10 border-b flex-none flex flex-row items-center px-2 sticky top-0 bg-white z-10"
    >
      <div
        class="px-2 h-full items-center flex flex-row cursor-default"
        :class="{
          'font-medium text-black': leftPanelStore.activeTab === 'layers',
          'text-neutral-400': leftPanelStore.activeTab !== 'layers',
        }"
        @click="leftPanelStore.activeTab = 'layers'"
      >
        <span>Layers</span>
      </div>
      <div
        class="px-2 h-full items-center flex flex-row cursor-default"
        :class="{
          'font-medium text-black': leftPanelStore.activeTab === 'data',
          'text-neutral-400': leftPanelStore.activeTab !== 'data',
        }"
        @click="leftPanelStore.activeTab = 'data'"
      >
        <span>Data</span>
      </div>
      <div
        class="px-2 h-full items-center flex flex-row cursor-default"
        :class="{
          'font-medium text-black': leftPanelStore.activeTab === 'assets',
          'text-neutral-400': leftPanelStore.activeTab !== 'assets',
        }"
        @click="leftPanelStore.activeTab = 'assets'"
      >
        <span>Assets</span>
      </div>
    </div>
    <div
      class="flex flex-col w-full h-fit"
      v-show="leftPanelStore.activeTab === 'layers'"
    >
      <!--pages-->
      <div
        class="flex flex-col border-b pt-[5px] gap-[1px] pb-3 border-gray-200"
      >
        <div class="flex flex-row justify-between pl-4 pr-2 items-center">
          <p class="font-medium">Pages</p>
          <div
            class="aspect-square h-8 flex flex-col justify-center items-center hover:bg-gray-100 rounded"
            @click="
              () => {
                selectToi.canvas.push({
                  id: 'Page ' + (selectToi.canvas.length + 1),
                });
              }
            "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </div>
        </div>
        <div class="flex flex-col">
          <div
            v-for="canvas in selectToi.canvas"
            class="flex flex-row gap-2 hover:bg-gray-100 py-2 px-4"
            @click="
              () => {
                selectToi.activeCanvas = canvas.id;
              }
            "
          >
            <div
              class="flex flex-col items-center justify-center w-3 flex-none aspect-square"
            >
              <svg
                v-if="selectToi.activeCanvas === canvas.id"
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <p class="cursor-default focus:outline-none">{{ canvas.id }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCounterStore } from "@/stores/counter";
import { useLeftPanelStore } from "@/stores/leftPanelStore";

const selectToi = useCounterStore();
const leftPanelStore = useLeftPanelStore();
</script>
