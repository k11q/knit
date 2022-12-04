<template>
  <PreviewTopBar />
  <PreviewUIBrowser
    :nodes="[
      selectToi.data[
        selectToi.data.findIndex((p) => p.id === selectToi.selectedBoxData.id)
      ],
    ]"
  />
</template>

<script setup>
import { useCounterStore } from "~~/src/stores/counter";

const selectToi = useCounterStore();

const props = defineProps({
  nodes: Array,
  depth: {
    type: Number,
    default: 1,
  },
});
</script>
