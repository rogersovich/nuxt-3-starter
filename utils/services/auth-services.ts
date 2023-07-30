export const fetchLogin = async ({
  formData,
  server = true,
}: {
  formData: any
  server?: boolean
}) => {
  const env = useRuntimeConfig()

  return await useFetch(`${env.public.API_PLATZI}/auth/login`, {
    method: "post",
    body: formData,
  })
}
