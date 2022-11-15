<template>
  <div class="flex flex-col w-full">
    <div class="px-8 py-4 border-b">Recently viewed</div>
    <div class="flex flex-col px-8 py-6 gap-6">
      <div class="grid grid-cols-4 gap-8">
        <div class="border py-4 px-6 rounded flex flex-col gap-0.5">
          <p>Add new project</p>
          <p class="opacity-60 text-xs">Description</p>
        </div>
        <div class="border py-4 px-6 rounded flex flex-col gap-0.5">
          <p>Add new project</p>
          <p class="opacity-60 text-xs">Description</p>
        </div>
        <div class="border py-4 px-6 rounded flex flex-col gap-0.5">
          <p>Add new project</p>
          <p class="opacity-60 text-xs">Description</p>
        </div>
      </div>
      <div class="flex flex-row justify-between">
        <div>Haha hihi huu</div>
        <div>Haha hihi huu</div>
      </div>
      <div class="grid grid-cols-4 gap-8">
        <div
          class="border aspect-[4/3] flex flex-col rounded"
          v-for="canvas in selectToi.canvas"
        >
          <div class="flex-1"></div>
          <div class="bg-gray-200 p-4">{{ canvas.id }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCounterStore } from "@/stores/counter";

const selectToi = useCounterStore();
</script>
