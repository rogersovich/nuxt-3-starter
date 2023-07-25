import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  modules: ["@nuxtjs/apollo", "@nuxt/image", "@nuxtjs/tailwindcss"],
  devtools: { enabled: true },
  runtimeConfig: {
    // The private keys which are only available server-side
    API_SECRET: process.env.API_SECRET || "234",
    // Keys within public are also exposed client-side
    public: {
      apiBase: "/api",
    },
  },
  imports: {
    dirs: [
      "composables/*/index.{ts,js,mjs,mts}",
      "utils/*/index.{ts,js,mjs,mts}",
    ],
  },
  apollo: {
    clients: {
      default: {
        httpEndpoint: "https://rickandmortyapi.com/graphql",
      },
    },
  },
  image: {
    domains: ["rickandmortyapi.com/"],
  },
});
