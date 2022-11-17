<template>
  <div class="flex flex-col pt-[5px] gap-[1px] pb-3">
    <div class="flex flex-row justify-between pl-4 pr-2 items-center pb-[5px]">
      <p class="font-medium">Add element</p>
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
    <p class="flex px-4 pb-4 pt-2 opacity-80">Layout</p>
    <div class="grid grid-cols-2 gap-4 px-4">
      <div
        class="border aspect-square flex flex-col rounded-md border-[#505050] bg-[#292929] overflow-clip opacity-80 hover:opacity-100"
      >
        <div class="flex-1 flex items-center justify-center">
          <svg
            width="56"
            height="56"
            viewBox="0 0 56 56"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="6.125"
              y="6.125"
              width="43.75"
              height="43.75"
              rx="6"
              stroke="#454545"
              stroke-width="2"
            />
            <rect
              x="12.25"
              y="30.625"
              width="31.5"
              height="12.25"
              rx="5"
              fill="#6C6C6C"
            />
            <rect
              x="12.25"
              y="13.125"
              width="31.5"
              height="12.25"
              rx="5"
              fill="#6C6C6C"
            />
          </svg>
        </div>
        <p class="px-2 pb-2 -mt-1 text-center">Flexbox</p>
      </div>
      <div
        class="border aspect-square flex flex-col rounded-md border-[#505050] bg-[#292929] overflow-clip opacity-80 hover:opacity-100"
      >
        <div class="flex-1 flex items-center justify-center">
          <svg
            width="56"
            height="56"
            viewBox="0 0 56 56"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="6.125"
              y="6.125"
              width="43.75"
              height="43.75"
              rx="6"
              stroke="#454545"
              stroke-width="2"
            />
            <rect
              x="12.25"
              y="12.25"
              width="14"
              height="14"
              rx="5"
              fill="#6C6C6C"
            />
            <rect
              x="12.25"
              y="29.75"
              width="14"
              height="14"
              rx="5"
              fill="#6C6C6C"
            />
            <rect
              x="29.75"
              y="29.75"
              width="14"
              height="14"
              rx="5"
              fill="#6C6C6C"
            />
            <rect
              x="29.75"
              y="12.25"
              width="14"
              height="14"
              rx="5"
              fill="#6C6C6C"
            />
          </svg>
        </div>
        <p class="px-2 pb-2 -mt-1 text-center">Grid</p>
      </div>
    </div>
    <p class="flex px-4 pb-4 pt-6 opacity-80">Layout</p>
    <div class="grid grid-cols-2 gap-4 px-4">
      <div
        class="border aspect-square flex flex-col rounded-md border-[#505050] bg-[#292929] overflow-clip opacity-80 hover:opacity-100"
        @click="addaSquare.turnOnAddTextActivated"
      >
        <div class="flex-1 flex items-center justify-center text-[#6C6C6C]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="42"
            height="42"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <polyline points="4 7 4 4 20 4 20 7"></polyline>
            <line x1="9" y1="20" x2="15" y2="20"></line>
            <line x1="12" y1="4" x2="12" y2="20"></line>
          </svg>
        </div>
        <p class="px-2 pb-2 -mt-1 text-center">Text</p>
      </div>
      <div
        class="border aspect-square flex flex-col rounded-md border-[#505050] bg-[#292929] overflow-clip opacity-80 hover:opacity-100"
      >
        <div class="flex-1 flex items-center justify-center text-[#6C6C6C]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="46"
            height="46"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <line x1="21" y1="6" x2="3" y2="6"></line>
            <line x1="15" y1="12" x2="3" y2="12"></line>
            <line x1="17" y1="18" x2="3" y2="18"></line>
          </svg>
        </div>
        <p class="px-2 pb-2 -mt-1 text-center">Paragraph</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useSquareStore } from "@/stores/dataSquare";

const addaSquare = useSquareStore();
</script>
