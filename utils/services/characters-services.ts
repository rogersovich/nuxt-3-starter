export const fetchCharacters = async ({
  page,
  server = false,
}: {
  page: number
  server?: boolean
}) => {
  const env = useRuntimeConfig()
  const pageProps = toRef(page)

  const { data, pending, status } = await useAsyncData<
    BaseResponse<CharacterResponse[]>
  >(
    "characters",
    () =>
      $fetch(env.public.API_SECRET + "/character", {
        params: {
          page: pageProps.value,
        },
      }),
    {
      watch: [pageProps],
      server: server,
    }
  )

  return {
    data,
    pending,
    status,
  }
}
