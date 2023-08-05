import { useAuthCookieStore } from "./../stores/auth-cookie"
export const useBaseFetch = () => {
  const access_token = useCookie("secret-token")
  const refresh_token = useCookie("secret-refresh-token")

  const store = useAuthCookieStore()

  var bearerToken = process.server
    ? `Bearer ${access_token.value}`
    : `Bearer ${store.access_token}`

  var refreshToken = process.server ? refresh_token.value : store.refresh_token

  const fetch = $fetch.create({
    baseURL: useRuntimeConfig().public.API_LMS,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: bearerToken,
    },
    async onResponseError({ response, options, request }) {
      if (response.status == 401) {
        const { data, error } = await useAsyncData("refresh_token", () =>
          $fetch<BaseResponse<TokenResponse>>(
            useRuntimeConfig().public.API_LMS + "/auth/refresh-token",
            {
              method: "POST",
              body: JSON.stringify({
                refresh_token: refreshToken,
              }),
            }
          )
        )

        if (error.value) {
          store.removeUser()
          store.removeToken()
          await useFetch("/api/delete-cookie", {
            method: "DELETE",
            server: false,
          })
          await navigateTo("/auth")
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
            store.setUser({
              name: "Super Admin",
              username: "superadmin",
            })
            store.setToken(data.value.data)
            // reloadNuxtApp() use this if client side
            refreshNuxtData("session") // use this if server side
          })
          .catch(async () => {
            store.removeUser()
            store.removeToken()
            await useFetch("/api/delete-cookie", {
              method: "DELETE",
              server: false,
            })
            await navigateTo("/auth")
          })
      }
    },
  })

  return fetch
}
