<template>
  <aside
    class="border-l w-60 flex flex-col h-screen overflow-x-visible pb-16 z-10 bg-[#262626] border-[#3A3A3A]"
  >
    <div
      class="h-10 flex-none flex flex-row items-center px-2 sticky top-0 bg-[#262626]"
    >
      <div
        class="px-2 h-full items-center flex flex-row cursor-default"
        :class="{
          'font-medium': activeTab === 'style',
          'opacity-60': activeTab !== 'style',
        }"
        @click="activeTab = 'style'"
      >
        <span>Style</span>
      </div>
      <div
        class="px-2 h-full items-center flex flex-row cursor-default"
        :class="{
          'font-medium': activeTab === 'action',
          'opacity-60': activeTab !== 'action',
        }"
        @click="activeTab = 'action'"
      >
        <span>Action</span>
      </div>
      <div
        class="px-2 h-full items-center flex flex-row cursor-default"
        :class="{
          'font-medium': activeTab === 'props',
          'opacity-60': activeTab !== 'props',
        }"
        @click="activeTab = 'props'"
      >
        <span>Props</span>
      </div>
    </div>
    <DesignerRightSidePanelTabsStyle v-if="activeTab === 'style'" />
    <DesignerRightSidePanelTabsTabProps v-if="activeTab === 'props'" />
    <DesignerRightSidePanelTabsTabAction v-if="activeTab === 'action'" />
  </aside>
</template>

<script setup lang="ts">
import { useSquareStore } from "~~/src/stores/dataSquare";
import { useCounterStore } from "~~/src/stores/counter";

const activeTab = ref("style");

const selectToi = useCounterStore();
const route = useRoute();
const addaSquare = useSquareStore();
</script>
