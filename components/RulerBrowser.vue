<template>
  <template v-for="line in lines" :key="line.height">
    <div style="left: line.left" class="h-1 bg-red-600 w-full absolute"></div>
    <div style="top: line.top" class="h-1 bg-red-600 w-full absolute"></div>
  </template>
</template>

<script setup></script>

<script>
export default {
  name: "rulerBrowser",
  props: {
    lines: Array,
  },
  data() {
    return {};
  },
  emits: [],
  methods: {},
};
</script>
