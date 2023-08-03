type TLoginScheme = {
  email: string;
  password: string | number;
};

type TokenResponse = {
  accessToken: string
  refreshToken: string
}