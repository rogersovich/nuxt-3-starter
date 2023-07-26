import { defineNuxtConfig } from "nuxt/config"

export default defineNuxtConfig({
  modules: ["@nuxt/image", "@nuxtjs/tailwindcss"],
  devtools: { enabled: true },
  runtimeConfig: {
    // The private keys which are only available server-side
    API_SECRET: process.env.API_SECRET || "https://rickandmortyapi.com/api",
    // Keys within public are also exposed client-side
    public: {
      API_SECRET: process.env.API_SECRET || "https://rickandmortyapi.com/api",
    },
  },
  imports: {
    dirs: [
      "composables/*/index.{ts,js,mjs,mts}",
      "utils/*/index.{ts,js,mjs,mts}",
    ],
  },
  image: {
    domains: ["rickandmortyapi.com/"],
  },
})
