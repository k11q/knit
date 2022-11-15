<template>
  <div
    class="h-12 border-b flex flex-row flex-none justify-between z-10 bg-white"
  >
    <div class="flex flex-row">Dashboardtopbar</div>
    <div class="flex flex-row gap-5 mr-5 items-center">
      <div class="flex items-center justify-center">
        <div class="bg-gray-400 rounded-full aspect-square h-6"></div>
      </div>
      <NuxtLink
        :to="`/project/1/${selectToi.data.findIndex(
          (p) => p.id === selectToi.selectedBoxData.id
        )}/preview`"
      >
        <div
          class="flex items-center justify-center text-center cursor-default hover:bg-blue-50 h-8 aspect-square"
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
        <button class="bg-blue-600 px-2 py-1 text-white rounded-md border-none">
          Deploy
        </button>
      </div>
      <div class="flex items-center justify-center">
        <button>100%</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useSquareStore } from "@/stores/dataSquare";
import { useCanvasFF } from "@/stores/canvasFreeForm";
import { useCounterStore } from "@/stores/counter";

const addaSquare = useSquareStore();
const canvasFF = useCanvasFF();
const selectToi = useCounterStore();
</script>
