<template>
  <div class="flex flex-col h-fit">
    <!--pages-->
    <div
      class="flex flex-col border-b pt-[5px] gap-[1px] pb-3 border-[#303030]"
    >
      <div class="flex flex-row justify-between pl-4 pr-2 items-center">
        <p class="font-medium">Pages</p>
        <div
          class="aspect-square h-8 flex flex-col justify-center items-center hover:bg-[#2E2E2E] rounded"
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
      <div class="flex flex-col">
        <template v-for="canvas in selectToi.canvas">
          <NuxtLink
            :to="`/project/${paramsId}/${canvas.id}`"
            class="cursor-default"
          >
            <div class="flex flex-row gap-2 hover:bg-[#232323] py-2 px-4">
              <div
                class="flex flex-col items-center justify-center w-3 flex-none aspect-square"
              >
                <svg
                  v-if="paramsPageId === canvas.id"
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <p class="cursor-default focus:outline-none">{{ canvas.id }}</p>
            </div>
          </NuxtLink>
        </template>
      </div>
    </div>
    <!--tree-->
    <DesignerLeftSidePanelTabsLayersTreeBrowser :nodes="selectToi.data" />
  </div>
</template>

<script setup>
import { useCounterStore } from "@/stores/counter";

const route = useRoute();
const paramsId = route.params.id;
const paramsPageId = route.params.pageId;

const selectToi = useCounterStore();
</script>
