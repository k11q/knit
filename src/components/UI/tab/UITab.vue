<template>
  <div>
    <slot />
  </div>
</template>

<script>
const props = defineProps({
  name: String,
  size: Number,
});
</script>
