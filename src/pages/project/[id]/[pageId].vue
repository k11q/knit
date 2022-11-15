<template>project {{ paramsId }} project {{ paramsPageId }}</template>

<script setup>
const route = useRoute();
const paramsId = route.params.Id;
const paramsPageId = route.params.pageId;
// When accessing /posts/1, route.params.id will be 1
</script>
