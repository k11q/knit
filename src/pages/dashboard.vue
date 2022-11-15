<template>
  <div
    class="flex flex-row justify-start h-screen overflow-hidden max-h-screen min-h-screen text-sm"
  >
    <DashboardLeftSidePanel />
    <DashboardContent />
  </div>
</template>

<script setup>
import { useCounterStore } from "@/stores/counter";

const selectToi = useCounterStore();

const client = useSupabaseClient();
const { data: project } = await useAsyncData("project", async () => {
  const { data } = await client.from("project").select("*");
  return data;
});

console.log("data =" + project.value);
</script>
