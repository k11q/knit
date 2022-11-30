<template>
  <div
    class="h-14 border-b flex flex-row flex-none justify-between z-10 bg-[#18181A] border-[#040407] p-2 border-r"
  >
    <div class="flex flex-row gap-2 w-60">
      <NuxtLink
        to="/dashboard"
        class="aspect-square flex items-center justify-center text-center cursor-default h-full"
      >
        <div
          class="aspect-square flex items-center justify-center text-center cursor-default hover:bg-[#2E2E2E] h-full rounded opacity-60 hover:opacity-100"
        >
          <UIIcon name="home" :size="18" />
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
        <UIIcon name="cursor-default" :size="18" />
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
        <UIIcon name="cursor-hand" :size="18" />
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
        <UIIcon name="frame" :size="18" />
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
        <UIIcon name="square" :size="18" />
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
        <UIIcon name="text" :size="17" />
      </div>
    </div>
    <div class="flex items-center justify-center">
      <p>{{ route.params.id }}</p>
    </div>
    <div class="flex flex-row px-2 gap-5 items-center justify-end w-60">
      <div
        class="flex items-center justify-center rounded-full w-6 h-6 overflow-clip"
      >
        <img :src="user?.user_metadata.avatar_url" />
      </div>
      <NuxtLink
        class="aspect-square flex items-center justify-center text-center cursor-default h-[39px] flex-none rounded hover:opacity-100"
        :class="{
          'bg-[#2E2E2E] opacity-100': addaSquare.addTextActivated === true,
          'hover:bg-[#2E2E2E] opacity-60':
            addaSquare.addTextActivated === false,
        }"
        :to="`/p/${route.params.id}/${selectToi.selectedBoxData.name}/preview`"
      >
        <div>
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
        <NuxtLink
          :to="`http://${route.params.id}.localhost:3000/${selectToi.selectedBoxData.name}`"
        >
          <button
            class="bg-[#0191FA] px-2 py-1 text-[#EFEEF1] rounded-md border-none"
          >
            Deploy
          </button>
        </NuxtLink>
      </div>
      <div class="flex items-center justify-center w-11">
        <p>{{ `${(addaSquare.scale * 100).toFixed(2)}` }}%</p>
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
const route = useRoute();
const user = useSupabaseUser();
</script>
