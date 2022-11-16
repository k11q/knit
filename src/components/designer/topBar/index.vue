<template>
  <div
    class="h-14 border-b flex flex-row flex-none justify-between z-10 bg-[#1C1C1C] border-[#282828] p-2"
  >
    <div class="flex flex-row gap-2">
      <NuxtLink
        to="/dashboard"
        class="aspect-square flex items-center justify-center text-center cursor-default h-full"
      >
        <div
          class="aspect-square flex items-center justify-center text-center cursor-default hover:bg-[#2E2E2E] h-full rounded opacity-60 hover:opacity-100"
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
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
        </div>
      </NuxtLink>
      <div
        class="aspect-square flex items-center justify-center text-center cursor-default h-full flex-none rounded hover:opacity-100"
        @mousedown="canvasFF.dragCanvasStart"
        @mousemove="canvasFF.dragCanvasMove"
        @mouseup="canvasFF.dragCanvasUp"
        :class="{
          'bg-[#2E2E2E] opacity-100': addaSquare.normalPointer === true,
          'hover:bg-[#2E2E2E] opacity-60': addaSquare.normalPointer === false,
        }"
        @click="addaSquare.turnOnNormalPointer"
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
          <path d="m4 4 7.07 17 2.51-7.39L21 11.07z"></path>
        </svg>
      </div>
      <div
        class="aspect-square flex items-center justify-center text-center cursor-default h-full flex-none rounded hover:opacity-100"
        @click="addaSquare.turnOnDragPointer"
        :class="{
          'bg-[#2E2E2E] opacity-100':
            addaSquare.dragPointer === true ||
            addaSquare.draggingPointer === true,
          'hover:bg-[#2E2E2E] opacity-60':
            addaSquare.dragPointer === false &&
            addaSquare.draggingPointer === false,
        }"
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
          <path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0"></path>
          <path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2"></path>
          <path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8"></path>
          <path
            d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"
          ></path>
        </svg>
      </div>
      <div
        class="aspect-square flex items-center justify-center text-center cursor-default h-full flex-none rounded hover:opacity-100"
        @click="addaSquare.turnOnAddFrameActivated"
        :class="{
          'bg-[#2E2E2E] opacity-100': addaSquare.addFrameActivated === true,
          'hover:bg-[#2E2E2E] opacity-60':
            addaSquare.addFrameActivated === false,
        }"
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
          <line x1="22" y1="6" x2="2" y2="6"></line>
          <line x1="22" y1="18" x2="2" y2="18"></line>
          <line x1="6" y1="2" x2="6" y2="22"></line>
          <line x1="18" y1="2" x2="18" y2="22"></line>
        </svg>
      </div>
      <div
        class="aspect-square flex items-center justify-center text-center cursor-default h-full flex-none rounded hover:opacity-100"
        @click="addaSquare.turnOnAddSquareActivated"
        :class="{
          'bg-[#2E2E2E] opacity-100': addaSquare.addSquareActivated === true,
          'hover:bg-[#2E2E2E] opacity-60':
            addaSquare.addSquareActivated === false,
        }"
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
        </svg>
      </div>
      <div
        class="aspect-square flex items-center justify-center text-center cursor-default h-full flex-none rounded hover:opacity-100"
        @click="addaSquare.turnOnAddTextActivated"
        :class="{
          'bg-[#2E2E2E] opacity-100': addaSquare.addTextActivated === true,
          'hover:bg-[#2E2E2E] opacity-60':
            addaSquare.addTextActivated === false,
        }"
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
          <polyline points="4 7 4 4 20 4 20 7"></polyline>
          <line x1="9" y1="20" x2="15" y2="20"></line>
          <line x1="12" y1="4" x2="12" y2="20"></line>
        </svg>
      </div>
    </div>
    <div class="flex flex-row">
      <div class="aspect-square flex items-center justify-center w-14">
        <div>icon</div>
      </div>
      <div class="aspect-square flex items-center justify-center w-14">
        <div>icon</div>
      </div>
    </div>
    <div class="flex flex-row gap-5 mr-5 items-center">
      <div class="flex items-center justify-center">
        <div class="bg-gray-400 rounded-full aspect-square h-6"></div>
      </div>
      <NuxtLink :to="`/project/1/${selectToi.selectedBoxData.id}/preview`">
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
        <button
          class="bg-[#0191FA] px-2 py-1 text-[#EDEDED] rounded-md border-none"
        >
          Deploy
        </button>
      </div>
      <div class="flex items-center justify-center">
        <button>{{ `${(addaSquare.scale * 100).toFixed(2)}` }}%</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSquareStore } from "@/stores/dataSquare";
import { useCanvasFF } from "@/stores/canvasFreeForm";
import { useCounterStore } from "@/stores/counter";

const addaSquare = useSquareStore();
const canvasFF = useCanvasFF();
const selectToi = useCounterStore();
</script>
