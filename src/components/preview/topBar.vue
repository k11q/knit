<template>
  <div class="flex flex-row justify-between p-3 items-center">
    <div>This is a preview page</div>
    <button
      @click.prevent="$router.back()"
      class="rounded bg-black text-white px-2 py-1 text-xs cursor-default"
    >
      Back to designer
    </button>
  </div>
</template>
