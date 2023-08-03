export default defineNuxtRouteMiddleware((to, from) => {
  const { user } = storeToRefs(useAuthStore());
  const token = useCookie("auth-zcief123");

  // if token exists and url is /login redirect to homepage
  if (token.value && to?.name === "auth") {
    return navigateTo("/auth/locked");
  }

  // if token doesn't exist redirect to log in
  if (!token.value && to?.name !== "auth") {
    abortNavigation();
    return navigateTo("/auth");
  }
});
