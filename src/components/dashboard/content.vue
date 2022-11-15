<template>
  <div class="flex flex-col w-full">
    <DashboardTopBar />
    <div class="px-8 py-4 border-b">Recently viewed</div>
    <div class="flex flex-col px-8 py-6 gap-6">
      <div class="grid grid-cols-4 gap-8">
        <div class="border py-4 px-6 rounded-md flex flex-col gap-0.5">
          <p>New design file</p>
          <p class="opacity-60 text-xs">Description</p>
        </div>
        <div class="border py-4 px-6 rounded-md flex flex-col gap-0.5">
          <p>New jam file</p>
          <p class="opacity-60 text-xs">Description</p>
        </div>
        <div class="border py-4 px-6 rounded-md flex flex-col gap-0.5">
          <p>Import file</p>
          <p class="opacity-60 text-xs">Description</p>
        </div>
      </div>
      <div class="flex flex-row justify-between">
        <div>Haha hihi huu</div>
        <div>Haha hihi huu</div>
      </div>
      <div class="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-8">
        <template v-for="canvas in selectToi.canvas">
          <NuxtLink :to="`/project/1/${canvas.id}`" class="cursor-default">
            <div class="border aspect-[4/3] flex flex-col rounded-md">
              <div class="flex-1"></div>
              <div class="bg-gray-200 p-4">{{ canvas.id }}</div>
            </div>
          </NuxtLink>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCounterStore } from "@/stores/counter";

const selectToi = useCounterStore();
</script>
