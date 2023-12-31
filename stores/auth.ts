// const now = new Date()
// const expiresDate = new Date(now.getTime() + 1 * 60 * 1000) // 2 minutes

export const useAuthStore = defineStore("auth", {
  state: () => {
    return {
      user: {
        name: "",
        username: "",
        email: "",
      } as TUserState,
      token: {
        token: null,
        refresh_token: null,
      } as TokenResponse,
    }
  },
  persist: [
    {
      key: "auth-zcief123",
      paths: ["user", "token"],
      debug: true,
      storage: persistedState.localStorage,
    },
  ],
  hydrate(state, initialState) {
    // in this case we can completely ignore the initial state since we
    // want to read the value from the browser
    state.token = initialState.token
  },
  getters: {
    access_token: (state) => state.token.token,
    refresh_token: (state) => state.token.refresh_token,
  },
  actions: {
    setToken(token: TTokenState) {
      this.token.token = token.token
      this.token.refresh_token = token.refresh_token
    },
    setUser(user: TUserState) {
      this.user.name = user.name
      this.user.email = user.email
      this.user.username = user.username
    },
    removeToken() {
      this.token.token = null
      this.token.refresh_token = null
    },
    removeUser() {
      this.user.name = ""
      this.user.email = ""
      this.user.username = ""
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
}
