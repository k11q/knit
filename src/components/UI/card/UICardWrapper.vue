<template>
  <div>
    Hahahah
    <slot></slot>
  </div>
</template>

<script setup>
const props = defineProps({
  name: String,
});
</script>
