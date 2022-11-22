<script setup lang="ts">
const user = useSupabaseUser();
const client = useSupabaseClient();
const router = useRouter();
const email = ref("");
const password = ref("");
// Login method using providers
const login = async (
  provider: "github" | "google" | "gitlab" | "bitbucket" | "facebook"
) => {
  const { error } = await client.auth.signInWithOAuth({ provider });
  if (error) {
    return alert("Something went wrong !");
  }
  router.push("/dashboard");
};

const emailLogin = async () => {
  const { data, error } = await client.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  });
  if (error) {
    return alert("Something went wrong !");
  }
  router.push("/dashboard");
};
</script>
<template>
  <div
    class="bg-[#181818] min-h-screen flex items-center justify-center text-xs text-[#EDEDED]"
  >
    <div
      class="rounded-md p-8 bg-[#1F1F1F] gap-8 flex flex-col w-[500px] border-[#2A2A2A] border"
    >
      <div class="flex flex-col w-full gap-3">
        <p class="text-[#E0E0E0]">Log in with</p>
        <div class="flex flex-col gap-2">
          <button
            class="px-4 py-[10px] bg-[#2A2A2A] rounded-md font-medium text-[13px]"
            @click="login('google')"
          >
            Login with Google
          </button>
          <button
            class="px-4 py-[10px] bg-[#2A2A2A] rounded-md font-medium text-[13px]"
            @click="login('facebook')"
          >
            Login with Facebook
          </button>
          <button
            class="px-4 py-[10px] bg-[#2A2A2A] rounded-md font-medium text-[13px]"
            @click="login('github')"
          >
            Login with Github
          </button>
        </div>
      </div>
      <form>
        <div class="flex flex-col gap-5 items-start">
          <div class="flex flex-col gap-3 items-start w-full">
            <label for="email" class="text-[#E0E0E0]">Email</label>
            <input
              type="email"
              required
              id="email"
              class="bg-[#1F1F1F] border border-[#444444] pl-4 py-[10px] rounded-md w-full autofill:bg-[#1F1F1F] focus:outline-[#47CE90]"
              v-model="email"
            />
          </div>
          <div class="flex flex-col gap-3 items-start w-full">
            <label for="password" class="text-[#E0E0E0]">Password</label>
            <input
              type="password"
              required
              id="password"
              class="bg-[#1F1F1F] border border-[#444444] pl-4 py-[10px] rounded-md w-full autofill:bg-[#1F1F1F] focus:outline-[#47CE90]"
              v-model="password"
            />
          </div>
          <div class="flex flex-row place-content-between items-center w-full">
            <div class="flex flex-row gap-3 items-center">
              <input
                type="checkbox"
                id="terms"
                name="vehicle1"
                value="Bike"
                class="appearance-none rounded-md w-4 h-4 accent-[#47CE90] bg-[#1F1F1F] border border-[#444444]"
              />
              <label for="vehicle1" class="text-[#E0E0E0]"> Remember me</label>
            </div>
            <a href="" class="text-[#47CE90] underline">Forgot password?</a>
          </div>
          <button
            class="px-4 py-[10px] bg-[#47CE90] rounded-md font-medium w-full text-[13px]"
            @click.prevent="emailLogin"
          >
            Login
          </button>
          <a href="" class="text-[#47CE90] mx-auto underline"
            >Login with magic link</a
          >
          <nuxt-link to="/signup" class="w-full flex items-center">
            <p class="text-[#47CE90] mx-auto underline">
              Don't have an account? Sign up
            </p>
          </nuxt-link>
        </div>
      </form>
    </div>
  </div>
</template>

<style>
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus {
  transition: background-color 600000s 0s, color 600000s 0s;
}
,
textarea:-webkit-autofill,
textarea:-webkit-autofill:hover,
textarea:-webkit-autofill:focus,
select:-webkit-autofill,
select:-webkit-autofill:hover,
select:-webkit-autofill:focus {
  -webkit-box-shadow: 0 0 0px 1000px #ffffff inset !important;
}
</style>
