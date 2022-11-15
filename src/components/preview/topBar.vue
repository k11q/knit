<template>
  <div
    class="flex flex-row justify-between p-3 items-center bg-[#1C1C1C] text-[#EDEDED]"
  >
    <div>This is a preview page</div>
    <button
      @click.prevent="$router.back()"
      class="rounded bg-white px-2 py-1 text-[#1C1C1C] text-xs cursor-default"
    >
      Back to designer
    </button>
  </div>
</template>
