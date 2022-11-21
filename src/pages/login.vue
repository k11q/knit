<script setup lang="ts">
const user = useSupabaseUser();
const client = useSupabaseClient();
const router = useRouter();
// Login method using providers
const login = async (
  provider: "github" | "google" | "gitlab" | "bitbucket"
) => {
  const { error } = await client.auth.signInWithOAuth({ provider });
  if (error) {
    return alert("Something went wrong !");
  }
  router.push("/dashboard");
};
</script>
<template>
  <button @click="login('google')">Login with Google</button>
</template>
