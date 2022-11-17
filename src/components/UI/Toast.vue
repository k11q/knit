<template>
  <slot />
  <div>Haha</div>
</template>

<script setup>
const props = defineProps({
  name: String,
});
</script>
