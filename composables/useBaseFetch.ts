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
    onResponseError({ request, response, options }) {
      if (response.status == 401) {
        $fetch<BaseResponse<TokenResponse>>(
          useRuntimeConfig().public.API_LMS + "/auth/refresh-token",
          {
            method: "POST",
            body: JSON.stringify({
              refresh_token: token.value?.refresh_token,
            }),
          }
        )
          .then((res) => {
            const token = JSON.parse(res.data.token);
            console.log(token)
            authStore.setToken(token);
          })
          .catch((err) => {
            if (err.response.status == 401) {
              authStore.removeToken();
              authStore.removeUser();
              navigateTo("/auth");
            }
          });
      }
      // console.log("RESPON RERRER  ");
    },
  });

  return fetch;
};
