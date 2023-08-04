export const useBaseFetch = () => {
  const ls: { user: TUserState; token: TTokenState } = JSON.parse(
    localStorage.getItem("auth-zcief123")
  )
  const { token } = storeToRefs(useAuthStore())
  const authStore = useAuthStore()

  const access_token = token.value ? token.value?.token : ls.token.token

  const fetch = $fetch.create({
    baseURL: useRuntimeConfig().public.API_LMS,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
    async onRequest({ request, options }) {
      console.log(request, options)
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
                refresh_token: authStore.token.refresh_token,
              }),
            }
          )
        )

        if (error.value) {
          authStore.removeToken()
          authStore.removeUser()
          navigateTo("/auth")
        }

        authStore.setToken(data.value.data)

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
            authStore.removeToken()
            authStore.removeUser()
            navigateTo("/auth")
          })
      }
    },
  })

  return fetch
}
