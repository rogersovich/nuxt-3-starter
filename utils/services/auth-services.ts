export const fetchLogin = async ({ formData }: { formData: any }) => {
  const env = useRuntimeConfig();

  return await $fetch(env.public.API_PLATZI + "/auth/login", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((item: any) => {
      let data = {
        name: "Super Admin",
        email: formData?.email,
        token: {
          accessToken: item.access_token,
          refreshToken: item.refresh_token,
        },
      };
      return data;
    })
    .catch((err) => {
      // console.log(err.status)
      throw new Error(JSON.stringify(err.response));
    });
};

export const fetchMe = async () => {
  const env = useRuntimeConfig();

  const headers: any = useRequestHeaders(["cookie"]) as HeadersInit;

  const { data, pending } = await useFetch(
    env.public.API_PLATZI + "/auth/profile",
    {
      headers: headers
    }
  );

  //   return await $fetch(env.public.API_PLATZI + "/auth/profile", {
  //     method: "GET",
  //     headers:  {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //       Authorization: "Bearer {your access token}",
  //     },
  //   })
  //     .then((item) => {
  //       console.log({ item });
  //       return item;
  //     })
  //     .catch((err) => {
  //       console.log(err.status);
  //       throw new Error(JSON.stringify(err.response));
  //     });

  return {
    data,
    pending,
  };
};
