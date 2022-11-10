<template>
  <div
    class="border-r w-60 flex flex-col flex-none h-full overflow-x-hidden overflow-y-scroll z-10 bg-white"
  >
    <div
      class="h-10 border-b flex-none flex flex-row items-center px-2 sticky top-0 bg-white"
    >
      <div
        class="px-2 h-full items-center flex flex-row cursor-pointer"
        :class="{
          'font-medium text-black': leftPanelStore.activeTab === 'layers',
          'text-neutral-400': leftPanelStore.activeTab !== 'layers',
        }"
        @click="leftPanelStore.activeTab = 'layers'"
      >
        <span>Layers</span>
      </div>
      <div
        class="px-2 h-full items-center flex flex-row cursor-pointer"
        :class="{
          'font-medium text-black': leftPanelStore.activeTab === 'data',
          'text-neutral-400': leftPanelStore.activeTab !== 'data',
        }"
        @click="leftPanelStore.activeTab = 'data'"
      >
        <span>Data</span>
      </div>
      <div
        class="px-2 h-full items-center flex flex-row cursor-pointer"
        :class="{
          'font-medium text-black': leftPanelStore.activeTab === 'assets',
          'text-neutral-400': leftPanelStore.activeTab !== 'assets',
        }"
        @click="leftPanelStore.activeTab = 'assets'"
      >
        <span>Assets</span>
      </div>
    </div>
    <!--layers tab content -->
    <div
      class="flex flex-col w-full h-fit"
      v-show="leftPanelStore.activeTab === 'layers'"
    >
      <TreeBrowser :nodes="selectToi.data" />
    </div>
  </div>
</template>

<script setup>
import { useCounterStore } from "../stores/counter";
import { useLeftPanelStore } from "../stores/leftPanelStore";

const selectToi = useCounterStore();
const leftPanelStore = useLeftPanelStore();
</script>

<script>
export default {
  name: "LeftSidePanel",
  props: {},
  data() {
    return {};
  },
  emits: "",
  methods: {},
};
</script>
