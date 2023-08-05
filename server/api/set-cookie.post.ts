import { setCookie, H3Event, parseCookies } from "h3"

export default defineEventHandler(async (event: H3Event) => {
  const body: {
    token: string
    refresh_token: string
  } = await readBody(event)

  setCookie(event, "secret-token", body.token, {
    path: "/",
    sameSite: true,
    httpOnly: true,
  })

  setCookie(event, "secret-refresh-token", body.refresh_token, {
    path: "/",
    sameSite: true,
    httpOnly: true,
  })

  return "Cookie has been Set"
})
