import { CookieRef } from "nuxt/app"

export default defineNuxtRouteMiddleware(async (to, from) => {

  // if token exists and url is /auth/locked redirect to Locked Page
  // if (access_token.value && to?.name === "auth") {
  //   return navigateTo("/auth/locked");
  // }

  // // if token doesn't exist and route name 'auth-locked' redirect to Login
  // if (!access_token.value && to?.name === "auth-locked") {
  //   abortNavigation();
  //   return navigateTo("/auth");
  // }
})
