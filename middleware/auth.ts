import { CookieRef } from "nuxt/app";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const { user, token } = storeToRefs(useAuthStore());
  // const authStore = useAuthStore();

  const secret = useRuntimeConfig().public.AUTH_COOKIE;
  // const cookie: CookieRef<{ user: TUserState; access_token: string }> =
  //   useCookie(secret);
  // const refresh_token: CookieRef<{ refresh_token: string }> =
  //   useCookie("refresh_token");
  // const token_expired: CookieRef<{ token_expired: string }> =
  //   useCookie("token_expired");

  // const expiredDate = token_expired.value?.token_expired;
  // const refreshToken = refresh_token.value?.refresh_token;
  // const tokenExpired = token_expired.value?.token_expired;

  // if (!cookie.value?.access_token && tokenExpired && refreshToken) {
  //   const currentDate = new Date().toISOString();

  //   if (expiredDate < currentDate) {
  //     const { data, error } = await useAsyncData("refresh_token", () =>
  //       fetchRefreshToken(refreshToken)
  //     );

  //     if (error.value) {
  //       return navigateTo("/auth");
  //     }

  //     authStore.setToken(data.value);
  //     // return navigateTo(to.path, {
  //     //   replace: true,
  //     // });
  //   }
  // }

  // if token exists and url is /auth/locked redirect to Locked Page
  // if (access_token.value && to?.name === "auth") {
  //   return navigateTo("/auth/locked");
  // }

  // // if token doesn't exist and route name 'auth-locked' redirect to Login
  // if (!access_token.value && to?.name === "auth-locked") {
  //   abortNavigation();
  //   return navigateTo("/auth");
  // }
});
