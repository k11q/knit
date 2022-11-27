<template>
  <div
    class="h-14 border-b flex flex-row flex-none justify-between z-10 bg-[#232323] border-[#303030] p-2 border-r"
  >
    <div class="flex flex-row gap-2">
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
</script>
