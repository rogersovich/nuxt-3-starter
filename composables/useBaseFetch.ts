import { CookieRef } from "nuxt/app"

export const useBaseFetch = () => {
  const secret = useRuntimeConfig().public.AUTH_COOKIE
  const cookie: CookieRef<{ user: TUserState, access_token: string }> = useCookie(secret)
  const token = cookie.value ? cookie.value.access_token : null

  const fetch = $fetch.create({
    baseURL: useRuntimeConfig().public.API_PLATZI,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    onRequestError(context) {
      console.warn(context)
      console.log("HEHEHEHEH")
    },
    onResponseError(context) {
      console.warn(context)
      console.log("RESPON RERRER  ")
    },
  })

  return fetch
}
