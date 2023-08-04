import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  modules: [
    "@nuxt/image",
    "@nuxthq/ui",
    "@nuxtjs/google-fonts",
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
    "@vueuse/nuxt",
  ],
  pinia: {
    autoImports: [
      "defineStore",
      "definePiniaStore",
      "storeToRefs",
      "acceptHMRUpdate",
    ],
  },
  devtools: { enabled: true },
  sourcemap: false,
  runtimeConfig: {
    AUTH_COOKIE: process.env.AUTH_COOKIE,
    public: {
      AUTH_COOKIE: process.env.AUTH_COOKIE,
      API_PLATZI: process.env.API_PLATZI,
      API_RICK_MORTY: process.env.API_RICK_MORTY,
      API_LMS: process.env.API_LMS,
    },
  },
  experimental: {
    writeEarlyHints: false,
  },
  imports: {
    dirs: [
      "composables/*/index.{ts,js,mjs,mts}",
      "utils/*/index.{ts,js,mjs,mts}",
      "types",
      "services",
      "stores",
    ],
  },
  image: {
    domains: ["rickandmortyapi.com/"],
  },
  colorMode: {
    preference: "light",
  },
  tailwindcss: {
    cssPath: "~/assets/css/tailwind.css",
    configPath: "~/tailwind.config.ts",
    exposeConfig: false,
    injectPosition: 0,
    viewer: true,
  },
  ui: {
    icons: ["la"],
  },
  googleFonts: {
    subsets: "greek",
    download: true,
    inject: true,
    families: {
      Roboto: true,
      Monoton: true,
      Montserrat: [300, 400, 500, 600, 700, 800],
    },
  },
});
