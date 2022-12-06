<template>
  <div class="flex flex-col w-full h-fit">
    <!--pages-->
    <div
      class="flex flex-col border-b pt-[5px] gap-[1px] pb-3 border-[#3A3A3A]"
    >
      <div class="flex flex-row justify-between pl-4 pr-2 items-center">
        <p class="font-medium">Settings</p>
        <div
          class="aspect-square h-8 flex flex-col justify-center items-center opacity-80 hover:bg-[#2E2E2E] hover:opacity-100 transition-all duration-300 rounded"
          @click="
            () => {
              selectToi.canvas.push({
                id: 'Page ' + (selectToi.canvas.length + 1),
              });
            }
          "
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
      <div class="flex flex-col px-2">
        <template v-for="canvas in selectToi.canvas">
          <div
            class="flex flex-row gap-[10px] px-2 py-2 items-center border border-transparent hover:bg-[#2E2E2E] rounded-md"
          >
            <div
              class="aspect-square h-[14px] flex items-center justify-center opacity-60"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
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
            </div>
            <p class="flex-grow">{{ canvas.id }}</p>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCounterStore } from "~~/src/stores/counter";

const route = useRoute();
const paramsId = route.params.id;
const paramsPageId = route.params.pageId;

const selectToi = useCounterStore();
</script>
