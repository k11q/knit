<script setup lang="ts">
const user = useSupabaseUser();
const client = useSupabaseClient();
const router = useRouter();
const email = ref("");
const password = ref("");
const firstName = ref("");
const lastName = ref("");
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

const emailSignUp = async () => {
  const { data, error } = await client.auth.signUp({
    email: email.value,
    password: password.value,
    options: {
      data: { first_name: firstName.value, last_name: lastName.value },
    },
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
    <form>
      <div
        class="rounded-xl p-8 bg-[#1F1F1F] gap-8 flex flex-col w-[440px] border-[#2A2A2A]"
      >
        <div class="flex flex-col w-full gap-3">
          <p class="text-[#E0E0E0]">Log in with</p>
          <div class="flex flex-col gap-2">
            <button
              class="px-4 py-[10px] bg-[#2A2A2A] rounded font-medium text-[13px]"
              @click="login('google')"
            >
              Sign up with Google
            </button>
            <button
              class="px-4 py-[10px] bg-[#2A2A2A] rounded font-medium text-[13px]"
              @click="login('facebook')"
            >
              Sign up with Facebook
            </button>
            <button
              class="px-4 py-[10px] bg-[#2A2A2A] rounded font-medium text-[13px]"
              @click="login('github')"
            >
              Sign up with Github
            </button>
          </div>
        </div>
        <div class="flex flex-col gap-5 items-start">
          <div class="flex flex-col gap-3 items-start w-full">
            <label for="firstName" class="text-[#E0E0E0]">First name</label>
            <input
              type="text"
              required
              id="firstName"
              class="bg-[#1F1F1F] border border-[#444444] pl-4 py-[10px] rounded w-full"
              v-model="firstName"
            />
          </div>
          <div class="flex flex-col gap-3 items-start w-full">
            <label for="lastName" class="text-[#E0E0E0]">Last name</label>
            <input
              type="text"
              required
              id="lastName"
              class="bg-[#1F1F1F] border border-[#444444] pl-4 py-[10px] rounded w-full"
              v-model="lastName"
            />
          </div>
          <div class="flex flex-col gap-3 items-start w-full">
            <label for="email" class="text-[#E0E0E0]">Email</label>
            <input
              type="text"
              required
              id="email"
              class="bg-[#1F1F1F] border border-[#444444] pl-4 py-[10px] rounded w-full"
              v-model="email"
            />
          </div>
          <div class="flex flex-col gap-3 items-start w-full">
            <label for="password" class="text-[#E0E0E0]">Password</label>
            <input
              type="password"
              required
              id="password"
              class="bg-[#1F1F1F] border border-[#444444] pl-4 py-[10px] rounded w-full"
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
                class="appearance-none rounded w-4 h-4 accent-[#47CE90] bg-[#1F1F1F] border border-[#444444]"
              />
              <label for="vehicle1" class="text-[#E0E0E0]"> Remember me</label>
            </div>
            <a href="" class="text-[#47CE90] underline">Forgot password?</a>
          </div>
          <button
            class="px-4 py-[10px] bg-[#47CE90] rounded font-medium w-full text-[13px]"
            @click="emailSignUp"
          >
            Sign up
          </button>
          <a href="" class="text-[#47CE90] mx-auto underline"
            >Login with magic link</a
          >
          <nuxt-link to="/login" class="w-full flex items-center">
            <p class="text-[#47CE90] mx-auto underline">
              Already have an account? Log in
            </p>
          </nuxt-link>
        </div>
      </div>
    </form>
  </div>
</template>
