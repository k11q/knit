<template>
  <div
    class="flex flex-row justify-start h-screen overflow-hidden max-h-screen min-h-screen text-sm bg-[#1C1C1C] text-[#EDEDED]"
  >
    <DashboardLeftSidePanel />
    <DashboardContent />
  </div>
</template>

<script setup>
const client = useSupabaseClient();

const { data: projects } = await useAsyncData("projects", async () => {
  const { data } = await client.from("users").select("*");
  return data;
});

console.log("data = " + projects.value);
</script>
