<template>
  <div
    class="h-14 border-b flex flex-row flex-none justify-between z-10 bg-[#262626] border-[#3A3A3A] p-2 border-r"
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
      <div
        class="aspect-square flex items-center justify-center text-center cursor-default h-full flex-none rounded hover:opacity-100"
        :class="{
          'bg-[#2E2E2E] opacity-100': pixiStore.canvasEvent === 'default',
          'hover:bg-[#2E2E2E] opacity-60': pixiStore.canvasEvent !== 'default',
        }"
        @click="pixiStore.changeCanvasEvent('default')"
      >
        <UIIcon name="cursor-default" :size="18" />
      </div>
      <div
        class="aspect-square flex items-center justify-center text-center cursor-default h-full flex-none rounded hover:opacity-100"
        @click="pixiStore.changeCanvasEvent('createRectangle')"
        :class="{
          'bg-[#2E2E2E] opacity-100':
            pixiStore.canvasEvent === 'createRectangle',
          'hover:bg-[#2E2E2E] opacity-60':
            pixiStore.canvasEvent === 'createRectangle',
        }"
      >
        <UIIcon name="square" :size="18" />
      </div>
    </div>
    <div class="flex items-center justify-center">
      <p>{{ route.params.id }}</p>
      <input type="number" v-model="addaSquare.scale" />
    </div>
    <div class="flex flex-row px-2 gap-3 items-center justify-end w-60">
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
      <div class="flex items-center justify-center w-12">
        <p>{{ `${(addaSquare.scale * 100).toFixed(2)}` }}%</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSquareStore } from "~~/src/stores/dataSquare";
import { useCounterStore } from "~~/src/stores/counter";
import { usePixiStore } from "@/stores/pixi";

const addaSquare = useSquareStore();
const selectToi = useCounterStore();
const pixiStore = usePixiStore();
const route = useRoute();
const user = useSupabaseUser();
</script>
