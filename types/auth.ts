type TLoginScheme = {
  email: string
  password: string | number
}

type TokenResponse = {
  access_token: string
  refresh_token: string
}

type TTokenState = {
  access_token: string
  refresh_token: string
}

type TUserState = {
  name: string
  email: string
}

type ProfileResponse = {
  id: number
  email: string
  password: string
  name: string
  role: string
  avatar: string
}
