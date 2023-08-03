import { CookieRef } from "nuxt/app"

export default defineNuxtRouteMiddleware(async (to, from) => {
  const { user } = storeToRefs(useAuthStore())
  const authStore = useAuthStore()

  const secret = useRuntimeConfig().public.AUTH_COOKIE
  const cookie: CookieRef<{ user: TUserState; access_token: string }> =
    useCookie(secret)
  const refresh_token: CookieRef<{ refresh_token: string }> =
    useCookie("refresh_token")

  // if (!cookie.value && refresh_token.value) {
  //   const { data, error } = await useAsyncData("refresh_token", () =>
  //     refreshToken(refresh_token.value.refresh_token)
  //   )
  //   console.log("dsfdsfds")

  //   if (error.value) {
  //     abortNavigation()
  //     return navigateTo("/auth")
  //   }

  //   authStore.setToken(data.value)

  //   abortNavigation()
  //   return navigateTo(to.path)
  // }

  // if token exists and url is /auth/locked redirect to Locked Page
  if (cookie.value.access_token && to?.name === "auth") {
    return navigateTo("/auth/locked")
  }

  console.log(cookie.value)

  // if token doesn't exist and route name 'auth-locked' redirect to Login
  if (!cookie.value.access_token && to?.name === "auth-locked") {
    abortNavigation()
    return navigateTo("/auth")
  }
})
