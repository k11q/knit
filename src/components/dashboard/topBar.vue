<template>
  <div
    class="h-[52px] border-b flex flex-row flex-none justify-between z-10 px-4 border-[#303030]"
  >
    <div class="flex flex-row items-center py-[6px] flex-shrink">
      <input
        class="rounded-lg pl-6 h-full w-[500px] bg-[#232323] placeholder-white placeholder-opacity-20"
        placeholder="Search"
      />
    </div>
    <div class="flex flex-row gap-5 mr-5 items-center">
      <div class="flex items-center justify-center gap-8">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="19"
          height="19"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
          <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
        </svg>
        <div
          class="flex items-center justify-center rounded-full aspect-square h-6 overflow-clip"
        >
          <img :src="user?.user_metadata.avatar_url" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const user = useSupabaseUser();
</script>
