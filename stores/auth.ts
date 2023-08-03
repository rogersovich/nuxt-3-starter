const now = new Date()
const expiresDate = new Date(now.getTime() + 1 * 60 * 1000) // 2 minutes

export const useAuthStore = defineStore("auth", {
  state: () => {
    return {
      user: {
        name: "",
        email: "",
      } as TUserState,
      access_token: null as string,
      refresh_token: null as string,
    }
  },
  persist: [
    {
      key: "auth-zcief123",
      paths: ["user", "access_token"],
      debug: true,
      storage: persistedState.cookiesWithOptions({
        expires: expiresDate,
      }),
    },
    {
      key: "refresh_token",
      paths: ["refresh_token"],
      debug: true,
      storage: persistedState.cookies,
    },
  ],
  // getters: {
  //   access_token: (state) => state.access_token,
  //   refresh_token: (state) => state.refresh_token,
  // },
  actions: {
    setToken(token: TTokenState) {
      this.access_token = token.access_token
      this.refresh_token = token.refresh_token
    },
    setUser(user: TUserState) {
      this.user.name = user.name
      this.user.email = user.email
    },
    removeToken() {
      this.access_token = null
      this.refresh_token = null 
    },
    removeUser() {
      this.user.name = ""
      this.user.email = ""
    },
  },
})
