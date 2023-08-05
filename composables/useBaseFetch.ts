import { useAuthCookieStore } from "./../stores/auth-cookie"
export const useBaseFetch = () => {
  const access_token = useCookie("secret-token")
  const refresh_token = useCookie("secret-refresh-token")

  const authCookieStore = useAuthCookieStore()

  const store = useAuthCookieStore()

  var bearerToken = process.server
    ? `Bearer ${access_token.value}`
    : `Bearer ${store.access_token}`

  const fetch = $fetch.create({
    baseURL: useRuntimeConfig().public.API_LMS,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: bearerToken,
    },
    async onResponseError({ response, options, request }) {
      // console.log({ request })
      if (response.status == 401) {
        const { data, error } = await useAsyncData("refresh_token", () =>
          $fetch<BaseResponse<TokenResponse>>(
            useRuntimeConfig().public.API_LMS + "/auth/refresh-token",
            {
              method: "POST",
              body: JSON.stringify({
                refresh_token: refresh_token,
              }),
            }
          )
        )

        if (error.value) {
          authCookieStore.removeUser()
          navigateTo("/auth")
        }

        useFetch("/api/set-cookie", {
          method: "POST",
          body: {
            token: data.value.data.token,
            refresh_token: data.value.data.refresh_token,
          },
          server: false,
        })

        await $fetch(request, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${data.value.data.token}`,
          },
        })
          .then(() => {
            reloadNuxtApp()
          })
          .catch(() => {
            navigateTo("/auth")
          })
      }
    },
  })

  return fetch
}
