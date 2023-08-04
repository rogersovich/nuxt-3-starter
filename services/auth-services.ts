export const login = (formData: TLoginScheme) => {
  return useBaseFetch()<BaseResponse<TokenResponse>>("/auth/login", {
    method: "POST",
    body: JSON.stringify(formData),
  })
}

export const fetchSession = async () => {
  const { data, pending, error, refresh } = await useAsyncData(
    "session",
    () => useBaseFetch()<BaseResponse<ProfileResponse>>("/session"),
    {
      server: false,
    }
  )
  return {
    data,
    pending,
    error,
    refresh,
  }
}

export const fetchSessionServer = async () => {
  const { data, pending, error, refresh } = await useBaseFetchServer({
    url: "/session",
  })
  return {
    data,
    pending,
    error,
    refresh,
  }
}

export const fetchRefreshToken = (token: string) => {
  return useBaseFetch()<TokenResponse>("/auth/refresh-token", {
    method: "POST",
    body: JSON.stringify({
      refreshToken: token,
    }),
  })
}
