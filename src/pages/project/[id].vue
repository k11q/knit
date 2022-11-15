<template>project {{ params }}</template>

<script setup>
const route = useRoute();
const params = route.params.id;
// When accessing /posts/1, route.params.id will be 1
</script>
