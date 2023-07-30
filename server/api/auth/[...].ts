import { NuxtAuthHandler } from "#auth"
import CredentialsProvider from "next-auth/providers/credentials"

export default NuxtAuthHandler({
  secret: useRuntimeConfig().AUTH_SECRET,
  pages: {
    signIn: "/auth",
  },
  callbacks: {
    signIn(params) {
      console.log({ params })
      console.log(params.credentials)
      return true
    },
  },
  providers: [
    // @ts-expect-error
    CredentialsProvider.default({
      name: "Credentials",
      authorize(credentials: any) {
        const user = {
          email: "dimas@gmail.com",
          password: "123456",
        }

        if (
          credentials?.email === user.email &&
          credentials?.password === user.password
        ) {
          return user
        } else {
          return false
        }
      },
    }),
  ],
})
