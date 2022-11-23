<template>
  <div class="flex flex-col pt-[5px] gap-[1px] pb-3">
    <div class="flex flex-row justify-between pl-4 pr-2 items-center">
      <p class="font-medium">Data</p>
      <div
        class="aspect-square h-8 flex flex-col justify-center items-center rounded opacity-80 hover:bg-[#2E2E2E] hover:opacity-100 transition-all duration-300"
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
    <div class="flex flex-row items-center">
      <input
        placeholder="Search library"
        class="flex-grow bg-transparent px-4 py-2 focus:outline-none placeholder-[#EDEDED] placeholder-opacity-40"
      />
    </div>
    <div class="flex flex-col px-2">
      <div
        class="flex flex-row gap-[10px] px-2 py-2 items-center border border-transparent hover:bg-[#2E2E2E] rounded-md"
      >
        <div
          class="aspect-square h-[14px] flex items-center justify-center opacity-60"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
          </svg>
        </div>
        <p class="flex-grow">projects</p>
      </div>
      <div
        class="flex flex-row gap-[10px] px-2 py-2 items-center border border-transparent hover:bg-[#2E2E2E] rounded-md"
      >
        <div
          class="aspect-square h-[14px] flex items-center justify-center opacity-60"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
          </svg>
        </div>
        <p class="flex-grow">users</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCounterStore } from "@/stores/counter";

const route = useRoute();
const paramsId = route.params.id;
const paramsPageId = route.params.pageId;

const selectToi = useCounterStore();
</script>
