<script setup>
const subdomain = useSubdomain();
const route = useRoute();
const profile = route.fullPath;
</script>

<template>
  <div class="my-20">
    HAHAHHAHA
    <h1 class="text-4xl font-semibold">{{ profile }}'s posts</h1>
    {{ subdomain }}
    <div></div>
    <!-- <aside></aside> -->
  </div>
</template>
