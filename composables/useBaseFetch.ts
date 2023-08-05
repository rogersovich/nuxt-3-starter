import { useAuthCookieStore } from "./../stores/auth-cookie"
export const useBaseFetch = () => {
  const access_token = useCookie("secret-token")
  const refresh_token = useCookie("secret-refresh-token")

  const store = useAuthCookieStore()

  var bearerToken = process.server ? access_token.value : store.access_token
  var refreshToken = process.server ? refresh_token.value : store.refresh_token

  const tokenDecrypt = DecryptCookie({
    cookie: bearerToken ?? "",
    secret: ENCRYPT_SECRET_TOKEN,
  })

  const refreshTokenDecrypt = DecryptCookie({
    cookie: refreshToken ?? "",
    secret: ENCRYPT_SECRET_REFRESH_TOKEN,
  })
  // console.log({ tokenDecrypt })
  // console.log({ refreshTokenDecrypt })

  const fetch = $fetch.create({
    baseURL: useRuntimeConfig().public.API_LMS,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokenDecrypt}`,
    },
    async onResponseError({ response, options, request }) {
      if (response.status == 401) {
        const { data, error } = await useAsyncData("refresh_token", () =>
          $fetch<BaseResponse<TokenResponse>>(
            useRuntimeConfig().public.API_LMS + "/auth/refresh-token",
            {
              method: "POST",
              body: JSON.stringify({
                refresh_token: refreshTokenDecrypt,
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

        const tokenEncrypt = EncryptCookie({
          cookie: data.value.data.token,
          secret: ENCRYPT_SECRET_TOKEN,
        })
        const refreshtokenEncrypt = EncryptCookie({
          cookie: data.value.data.refresh_token,
          secret: ENCRYPT_SECRET_REFRESH_TOKEN,
        })

        const saveToken = {
          token: tokenEncrypt,
          refresh_token: refreshtokenEncrypt,
        }

        useFetch("/api/set-cookie", {
          method: "POST",
          body: saveToken,
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
            store.setToken(saveToken)
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
