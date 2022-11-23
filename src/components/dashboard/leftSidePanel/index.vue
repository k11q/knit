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
        <div
          class="aspect-square flex items-center justify-center text-center cursor-default h-8"
        >
          <div
            class="aspect-square flex items-center justify-center text-center cursor-default hover:bg-[#2E2E2E] h-full rounded opacity-60 hover:opacity-100 p-[6px]"
          >
            <svg
              width="337"
              height="337"
              viewBox="0 0 337 337"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.9706 250.316C7.59802 240.943 7.59802 225.747 16.9706 216.375L216.375 16.9705C225.747 7.59796 240.943 7.59796 250.316 16.9705C259.688 26.3431 259.688 41.5391 250.316 50.9117L50.9117 250.316C41.5391 259.688 26.3432 259.688 16.9706 250.316Z"
                fill="#D9D9D9"
              />
              <path
                d="M86.2673 16.9706C95.6398 7.59798 110.836 7.59798 120.208 16.9706L319.612 216.375C328.985 225.747 328.985 240.943 319.612 250.316C310.24 259.688 295.044 259.688 285.671 250.316L86.2673 50.9117C76.8947 41.5391 76.8947 26.3431 86.2673 16.9706Z"
                fill="#D9D9D9"
              />
              <path
                d="M16.9708 86.267C26.3434 76.8944 41.5393 76.8944 50.9119 86.267L250.316 285.671C259.689 295.044 259.689 310.24 250.316 319.612C240.943 328.985 225.747 328.985 216.375 319.612L16.9708 120.208C7.59822 110.836 7.59822 95.6396 16.9708 86.267Z"
                fill="#D9D9D9"
              />
              <path
                d="M86.2672 319.612C76.8946 310.24 76.8946 295.044 86.2672 285.671L285.671 86.267C295.044 76.8944 310.24 76.8944 319.612 86.267C328.985 95.6396 328.985 110.836 319.612 120.208L120.208 319.612C110.836 328.985 95.6398 328.985 86.2672 319.612Z"
                fill="#D9D9D9"
              />
            </svg>
          </div>
        </div>
      </div>
      <div>
        <p>{{ user?.user_metadata.full_name }}</p>
        <p class="opacity-40 text-xs">{{ user?.user_metadata.email }}</p>
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

<script setup>
import { useCounterStore } from "@/stores/counter";
const user = useSupabaseUser();

const selectToi = useCounterStore();
</script>
