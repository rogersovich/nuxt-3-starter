export const login = (formData: TLoginScheme) => {
  return useBaseFetch()<TokenResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify(formData),
  })
}

export const fetchMe = async () => {
  const { data, pending } = await useAsyncData("profile", () =>
    useBaseFetch()<ProfileResponse>("/auth/profile"),
    {
      server: true
    }
  )
  return {
    data,
    pending
  }
}

export const refreshToken = (token: string) => {
  return useBaseFetch()<TokenResponse>("/auth/refresh-token", {
    method: "POST",
    body: JSON.stringify({
      refreshToken: token
    }),
  })
}
