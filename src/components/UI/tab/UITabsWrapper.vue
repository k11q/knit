<template>
  <div>
    <slot />
  </div>
</template>

<script setup>
const tabTitles = ref(slots.default().map(tab.props.title));
</script>
