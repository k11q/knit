<template>
  <div
    class="flex flex-row justify-start h-screen overflow-hidden max-h-screen min-h-screen text-sm"
  >
    <DashboardLeftSidePanel />
    <DashboardContent />
  </div>
</template>

<script setup lang="ts">
const client = useSupabaseClient();

const { data: projects } = await useLazyAsyncData("projects", async () => {
  const { data } = await client.from("projects").select("*");
  return data;
});

console.log("data = " + projects.value);
</script>
