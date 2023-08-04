export const useBaseFetch = () => {
  const ls: { user: TUserState; token: TTokenState } = JSON.parse(
    localStorage.getItem("auth-zcief123")
  );
  const { token } = storeToRefs(useAuthStore());
  const authStore = useAuthStore();

  const access_token = token.value ? token.value?.token : ls.token.token;

  const fetch = $fetch.create({
    baseURL: useRuntimeConfig().public.API_LMS,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
    async onResponseError({ response, options, request }) {
      // console.log(options.baseURL);
      if (response.status == 401) {
        // console.log("KUCING", authStore.token.refresh_token);

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
        );

        if (error.value) {
          console.log("HEHEH", error);
          authStore.removeToken();
          authStore.removeUser();
          navigateTo("/auth");
        }

        const token = JSON.parse(data.value.data.token);
        console.log("HEHEH", token);
        authStore.setToken(token);
      }
    },
  });

  return fetch;
};
