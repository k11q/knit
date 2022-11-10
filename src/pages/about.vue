<template>
  <div
    class="flex flex-col h-screen overflow-hidden max-h-screen min-h-screen text-xs bg-neutral-200"
  >
    <TopBar />
    <div class="flex flex-row justify-between">
      <LeftSidePanel />
      <Canvas />
      <RightSidePanel />
    </div>
  </div>
</template>

<script setup></script>
