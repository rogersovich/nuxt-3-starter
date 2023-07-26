export const fetchCharacters = async ({ page }: { page: number }) => {
  const env = useRuntimeConfig();
  const pageProps = toRef(page);
  console.log(page)
  return await useAsyncData(
    "characters",
    () =>
      $fetch(env.API_SECRET + "/character", {
        params: {
          page: pageProps,
        },
      }),
    {
      watch: [pageProps],
    }
  );
};
