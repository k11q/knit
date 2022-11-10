<template>
  <div
    class="h-12 border-b flex flex-row flex-none justify-between z-10 bg-white"
  >
    <div class="flex flex-row">
      <div
        class="aspect-square flex items-center justify-center w-12 text-center cursor-default"
        @mousedown="canvasFF.dragCanvasStart"
        @mousemove="canvasFF.dragCanvasMove"
        @mouseup="canvasFF.dragCanvasUp"
        :class="{
          'bg-blue-200': addaSquare.normalPointer === true,
          'hover:bg-blue-50': addaSquare.normalPointer === false,
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
        class="aspect-square flex items-center justify-center w-12 text-center cursor-default"
        @click="addaSquare.turnOnDragPointer"
        :class="{
          'bg-blue-200':
            addaSquare.dragPointer === true ||
            addaSquare.draggingPointer === true,
          'hover:bg-blue-50':
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
        class="aspect-square flex items-center justify-center w-12 text-center cursor-default"
        @click="addaSquare.turnOnAddFrameActivated"
        :class="{
          'bg-blue-200': addaSquare.addFrameActivated === true,
          'hover:bg-blue-50': addaSquare.addFrameActivated === false,
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
        class="aspect-square flex items-center justify-center w-12 text-center cursor-default"
        @click="addaSquare.turnOnAddSquareActivated"
        :class="{
          'bg-blue-200': addaSquare.addSquareActivated === true,
          'hover:bg-blue-50': addaSquare.addSquareActivated === false,
        }"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="1"
            y="1"
            width="13"
            height="13"
            rx="2"
            stroke="black"
            stroke-width="1.5"
          />
        </svg>
      </div>
      <div
        class="aspect-square flex items-center justify-center w-12 text-center cursor-default"
        @click="addaSquare.turnOnAddTextActivated"
        :class="{
          'bg-blue-200': addaSquare.addTextActivated === true,
          'hover:bg-blue-50': addaSquare.addTextActivated === false,
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
      <div
        class="aspect-square flex items-center justify-center bg-gray-100 w-12"
      >
        <div>icon</div>
      </div>
      <div class="aspect-square flex items-center justify-center w-12">
        <div>icon</div>
      </div>
    </div>
    <div class="flex flex-row gap-5 mr-5">
      <div class="flex items-center justify-center">
        <div class="bg-gray-400 rounded-full aspect-square h-6"></div>
      </div>
      <div
        class="flex items-center justify-center text-center cursor-default hover:bg-blue-50"
        @click="addaSquare.turnOnAddTextActivated"
        :class="{
          'bg-blue-200': addaSquare.addTextActivated === true,
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
          <polygon points="5 3 19 12 5 21 5 3"></polygon>
        </svg>
      </div>
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
import { useSquareStore } from "../stores/dataSquare";
import { useCanvasFF } from "../stores/canvasFreeForm";

const addaSquare = useSquareStore();
const canvasFF = useCanvasFF();
</script>
