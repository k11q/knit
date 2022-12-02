<template>
  <template v-for="element in elements"> </template>
</template>

<script setup>
const props = defineProps({
  elements: Array,
});
</script>
