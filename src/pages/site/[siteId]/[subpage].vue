<script setup lang="ts">
const subdomain = useSubdomain();
const route = useRoute();
const profile = route.params.subpage;
</script>

<template>
  <div class="my-20">
    <h1 class="text-4xl font-semibold">{{ profile }}'s posts</h1>
    {{ subdomain }} subpage
    <div></div>
    <!-- <aside></aside> -->
  </div>
</template>
