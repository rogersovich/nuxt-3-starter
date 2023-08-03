export const useBaseFetch = () => {
  const fetch = $fetch.create({
    baseURL: useRuntimeConfig().public.API_PLATZI,
  })

  return fetch
}