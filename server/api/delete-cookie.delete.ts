import { H3Event, deleteCookie } from "h3"

export default defineEventHandler((event: H3Event) => {
  deleteCookie(event, "secret-token", {
    path: "/",
    sameSite: true,
    httpOnly: true,
  })

  deleteCookie(event, "secret-refresh-token", {
    path: "/",
    sameSite: true,
    httpOnly: true,
  })

  return "Token Cookie Has been Deleted"
})
