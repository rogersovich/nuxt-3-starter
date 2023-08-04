export const fetchCharacters = async ({
  pages,
  server = false,
}: {
  pages: number;
  server?: boolean;
}) => {
  const env = useRuntimeConfig();
  const page = toRef(pages);

  const onChangePaginate = (currentPage: number) => {
    page.value = currentPage
  }

  const {  data, pending, error, refresh } = await useAsyncData<BaseResponseRickMorty<CharacterResponse[]>>(
    'characters',
    () =>
      $fetch(`${env.public.API_RICK_MORTY}/character`, {
        params: {
          page: page.value,
        },
      }),
    {
      watch: [page],
      server: server
    }
  );

  return {
    data,
    pending,
    error,
    refresh,
    onChangePaginate
  };
};
