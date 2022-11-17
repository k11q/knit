<template>
  <aside
    class="border-r w-60 flex flex-col flex-none h-screen overflow-x-hidden pb-16 z-10 text-xs border-[#282828]"
  >
    <div
      class="border-b px-[18px] h-[52px] flex flex-row gap-4 items-center border-[#282828]"
    >
      <div
        class="flex flex-col items-center justify-center w-3 flex-none aspect-square opacity-80"
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
          <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path>
          <line x1="16" y1="8" x2="2" y2="22"></line>
          <line x1="17.5" y1="15" x2="9" y2="15"></line>
        </svg>
      </div>
      <div>
        <p>Khairul Haaziq</p>
        <p class="opacity-40 text-xs">rhycoz@gmail.com</p>
      </div>
    </div>
    <div class="flex flex-col w-full h-fit">
      <div
        class="flex flex-col border-b pt-[5px] gap-[1px] pb-3 border-[#282828]"
      >
        <div class="flex flex-col">
          <div
            class="flex flex-row gap-4 items-center hover:bg-[#232323] py-[10px] px-[18px]"
          >
            <div
              class="flex flex-col items-center justify-center w-3 flex-none aspect-square opacity-80"
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
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
            </div>
            <p class="cursor-default focus:outline-none">Recent</p>
          </div>
          <div
            class="flex flex-row gap-4 items-center hover:bg-[#232323] py-[10px] px-[18px]"
          >
            <div
              class="flex flex-col items-center justify-center w-3 flex-none aspect-square opacity-80"
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
                <path
                  d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"
                ></path>
                <polyline points="14 2 14 8 20 8"></polyline>
              </svg>
            </div>
            <p class="cursor-default focus:outline-none">Drafts</p>
          </div>
          <div
            class="flex flex-row gap-4 items-center hover:bg-[#232323] py-[10px] px-[18px]"
          >
            <div
              class="flex flex-col items-center justify-center w-3 flex-none aspect-square opacity-80"
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
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="2" y1="12" x2="22" y2="12"></line>
                <path
                  d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
                ></path>
              </svg>
            </div>
            <p class="cursor-default focus:outline-none">Community</p>
          </div>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { useCounterStore } from "@/stores/counter";

const selectToi = useCounterStore();
</script>
