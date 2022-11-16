<template>
  <div class="flex flex-col pt-[5px] gap-[1px] pb-3">
    <div class="flex flex-row justify-between pl-4 pr-2 items-center pb-[5px]">
      <p class="font-medium">Assets</p>
      <div
        class="aspect-square h-8 flex flex-col justify-center items-center rounded opacity-80 hover:bg-[#2E2E2E] hover:opacity-100 transition-all duration-300"
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
    <div class="grid grid-cols-2 gap-4 px-4">
      <div
        class="border aspect-square flex flex-col rounded-md border-[#3E3E3E] bg-[#222222] overflow-clip hover:border-[#505050] hover:bg-[#292929]"
      >
        <div class="flex-1"></div>
        <p class="px-2 py-2">Frame</p>
      </div>
      <div
        class="border aspect-square flex flex-col rounded-md border-[#3E3E3E] bg-[#222222] overflow-clip hover:border-[#505050] hover:bg-[#292929]"
      >
        <div class="flex-1"></div>
        <p class="px-2 py-2">Square</p>
      </div>
      <div
        class="border aspect-square flex flex-col rounded-md border-[#3E3E3E] bg-[#222222] overflow-clip hover:border-[#505050] hover:bg-[#292929]"
      >
        <div class="flex-1"></div>
        <p class="px-2 py-2">Text</p>
      </div>
    </div>
  </div>
</template>
