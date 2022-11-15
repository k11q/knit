<template>
  <div class="flex flex-col w-full">
    <DashboardTopBar />
    <div class="px-8 py-4 border-b">Recently viewed</div>
    <div class="flex flex-col px-8 py-6 gap-6">
      <div class="grid grid-cols-4 gap-8">
        <div
          class="flex flex-row gap-4 border py-3 px-4 rounded-md items-center"
        >
          <svg
            class="opacity-80"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path
              d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"
            ></path>
            <polyline points="14 2 14 8 20 8"></polyline>
          </svg>
          <div class="flex flex-col gap-0.5">
            <p>New design file</p>
            <p class="opacity-60 text-xs">Description</p>
          </div>
        </div>
        <div
          class="flex flex-row gap-4 border py-3 px-4 rounded-md items-center"
        >
          <svg
            class="opacity-80"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path
              d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"
            ></path>
            <polyline points="14 2 14 8 20 8"></polyline>
          </svg>
          <div class="flex flex-col gap-0.5">
            <p>New jam file</p>
            <p class="opacity-60 text-xs">Description</p>
          </div>
        </div>
        <div
          class="flex flex-row gap-4 border py-3 px-4 rounded-md items-center"
        >
          <svg
            class="opacity-80"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path
              d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"
            ></path>
            <polyline points="14 2 14 8 20 8"></polyline>
          </svg>
          <div class="flex flex-col gap-0.5">
            <p>Import file</p>
            <p class="opacity-60 text-xs">Description</p>
          </div>
        </div>
      </div>
      <div class="flex flex-row justify-between">
        <div class="flex flex-row gap-[3px] items-center">
          <p class="text-[11px] opacity-60">Filter:</p>
          <select name="" id="" class="text-xs focus:outline-none">
            <option value="">All files</option>
            <option value="">Design files</option>
            <option value="">Jam files</option>
            <option value="">Prototypes</option>
          </select>
        </div>
        <div class="flex flex-row gap-[3px] items-center">
          <p class="text-[11px] opacity-60">Sort:</p>
          <select name="" id="" class="text-xs focus:outline-none">
            <option value="">Last viewed</option>
            <option value="">Date created</option>
            <option value="">Alphabetical</option>
          </select>
          <div class="flex flex-row gap-2 ml-4">
            <div
              class="flex items-center justify-center h-6 aspect-square rounded-sm hover:bg-gray-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <rect x="3" y="3" width="7" height="7"></rect>
                <rect x="14" y="3" width="7" height="7"></rect>
                <rect x="14" y="14" width="7" height="7"></rect>
                <rect x="3" y="14" width="7" height="7"></rect>
              </svg>
            </div>
            <div
              class="flex items-center justify-center h-6 aspect-square rounded-sm hover:bg-gray-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div class="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-8">
        <template v-for="canvas in selectToi.canvas">
          <NuxtLink :to="`/project/1/${canvas.id}`" class="cursor-default">
            <div class="border aspect-[4/3] flex flex-col rounded-md">
              <div class="flex-1"></div>
              <div
                class="flex flex-row gap-4 py-3 px-4 bg-gray-100 items-center"
              >
                <svg
                  class="opacity-80"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path
                    d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"
                  ></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                </svg>
                <div class="flex flex-col gap-[1px]">
                  <p>{{ canvas.id }}</p>
                  <p class="opacity-60 text-xs">Description</p>
                </div>
              </div>
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
