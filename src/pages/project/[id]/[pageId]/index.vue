<template>{{ paramsId }} page {{ paramsPageId }}</template>

<script setup>
const route = useRoute();
const paramsId = route.params.id;
const paramsPageId = route.params.pageId;
</script>
