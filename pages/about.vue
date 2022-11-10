<template>
  <NuxtLayout name="designerLayout">
    <TopBar />

    <div class="flex flex-row justify-between">
      <LeftSidePanel />
      <Canvas />
      <RightSidePanel />
    </div>
  </NuxtLayout>
</template>

<script setup>
definePageMeta({
  layout: false,
});
</script>
