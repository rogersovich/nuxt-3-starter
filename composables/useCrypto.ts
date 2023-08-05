import { AES, enc } from "crypto-js"

export const EncryptCookie = ({
  cookie,
  secret,
}: {
  cookie: string | object
  secret: string
}) => {
  let filteredCookie = null
  if (typeof cookie == "object") filteredCookie = JSON.stringify(cookie)
  else filteredCookie = cookie
  const token = AES.encrypt(filteredCookie, "secret-key-123").toString()

  return token
}
export const DecryptCookie = ({
  cookie,
  secret,
}: {
  cookie: string
  secret: string
}) => {
  const token = AES.decrypt(cookie, "secret-key-123").toString(enc.Utf8)
  try {
    const decryptToken = JSON.parse(token)
    return decryptToken
  } catch (error) {
    return token
  }
}
