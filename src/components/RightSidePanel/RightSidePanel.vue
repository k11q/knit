<template>
  <div
    class="border-l w-60 flex flex-col h-screen overflow-x-hidden pb-16 z-10 bg-white"
  >
    <div
      class="h-10 flex-none flex flex-row items-center px-2 sticky top-0 bg-white"
    >
      <div
        class="px-2 h-full items-center flex flex-row cursor-default"
        :class="{
          'font-medium text-black': rightPanelStore.activeTab === 'style',
          'text-neutral-400': rightPanelStore.activeTab !== 'style',
        }"
        @click="rightPanelStore.activeTab = 'style'"
      >
        <span>Style</span>
      </div>
      <div
        class="px-2 h-full items-center flex flex-row cursor-default"
        :class="{
          'font-medium text-black': rightPanelStore.activeTab === 'props',
          'text-neutral-400': rightPanelStore.activeTab !== 'props',
        }"
        @click="rightPanelStore.activeTab = 'props'"
      >
        <span>Props</span>
      </div>
      <div
        class="px-2 h-full items-center flex flex-row cursor-default"
        :class="{
          'font-medium text-black': rightPanelStore.activeTab === 'action',
          'text-neutral-400': rightPanelStore.activeTab !== 'action',
        }"
        @click="rightPanelStore.activeTab = 'action'"
      >
        <span>Action</span>
      </div>
      {{ noTouch }}
    </div>
    <RightSidePanelTabsTabStyle />
    <RightSidePanelTabsTabProps />
    <RightSidePanelTabsTabAction />
  </div>
</template>

<script setup>
import { useCounterStore } from "../../stores/counter";
import { useRightPanelStore } from "../../stores/rightPanelStore";

const selectToi = useCounterStore();
const rightPanelStore = useRightPanelStore();
</script>
