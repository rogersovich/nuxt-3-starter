export const useBaseFetchServer = ({
  url,
  header,
  server = true,
}: {
  url: string
  header?: HeadersInit
  server?: boolean
}) => {
  const headers = useRequestHeaders(["cookie"])
  const access_token = useCookie("secret-token")
  const refresh_token = useCookie("secret-refresh-token")

  const authCookieStore = useAuthCookieStore()

  var bearerToken = !access_token.value
    ? headers.cookie
    : `Bearer ${access_token.value}`

  return useFetch(url, {
    baseURL: useRuntimeConfig().public.API_LMS,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: bearerToken,
    },
    server: server,
    lazy: true,
    async onResponseError({ response, options, request }) {
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
          // useFetch("/api/delete-cookie", {
          //   method: "DELETE",
          //   server: false,
          // })
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
}
