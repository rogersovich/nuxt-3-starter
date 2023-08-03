type TTokenState = {
  accessToken: string;
  refreshToken: string;
};

type TUserState = {
  name: string;
  email: string;
  token?: TTokenState;
};

const now = new Date();
const expiresDate = new Date(now.getTime() + 2 * 60 * 1000); // 2 minutes

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
    storage: persistedState.cookiesWithOptions({
      expires: expiresDate,
    }),
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
