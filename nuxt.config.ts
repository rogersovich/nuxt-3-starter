import { defineNuxtConfig } from "nuxt/config"

export default defineNuxtConfig({
  modules: ["@nuxt/image", "@nuxthq/ui", "@nuxtjs/google-fonts"],
  devtools: { enabled: true },
  runtimeConfig: {
    API_SECRET: process.env.API_SECRET || "https://rickandmortyapi.com/api",
    public: {
      API_SECRET: process.env.API_SECRET || "https://rickandmortyapi.com/api",
    },
  },
  experimental: {
    writeEarlyHints: false,
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
})
