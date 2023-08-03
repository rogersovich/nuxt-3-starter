type TTokenState = {
  accessToken: string;
  refreshToken: string;
};

type TUserState = {
  name: string;
  email: string;
  token: TTokenState;
};

export const useAuthStore = defineStore("auth", {
  state: () => {
    return {
      user: {
        name: "",
        email: "",
        token: null,
      } as TUserState,
    };
  },
  persist: {
    key: "auth-zcief123",
    paths: ["user"],
    debug: true,
    storage: persistedState.localStorage,
  },
  getters: {
    accessToken: (state) => state.user.token.accessToken,
    refreshToken: (state) => state.user.token.refreshToken,
  },
  actions: {
    setToken(token: TTokenState) {
      this.user.token = token;
    },
    setUser(user: TUserState) {
      this.user.name = user.name;
      this.user.email = user.email;
    },
    removeToken() {
      this.user.token = null;
    },
    removeUser() {
      this.user.name = "";
      this.user.email = "";
    },
  },
});
