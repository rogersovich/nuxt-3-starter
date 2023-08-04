type TLoginScheme = {
  username: string
  password: string | number
}

type TokenResponse = {
  token: string
  refresh_token: string
}

type TTokenState = {
  token: string
  refresh_token: string
}

type TUserState = {
  name: string
  email?: string
  username: string
}

type ProfileResponse = {
  id: number;
  full_name: string;
  username: string;
  profile_pict?: string;
  email: string;
  roleId: number;
}
