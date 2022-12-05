// https://v3.nuxtjs.org/api/configuration/nuxt.config

export default defineNuxtConfig({
  modules: [
    "@nuxtjs/tailwindcss",
    "@vueuse/nuxt",
    "nuxt-headlessui",
    "@nuxtjs/supabase",
    "@pinia/nuxt",
  ],
  buildModules: ["@pinia/nuxt", "gpu.js"],
  headlessui: {
    prefix: "Headless",
  },
  srcDir: "src/",
});
