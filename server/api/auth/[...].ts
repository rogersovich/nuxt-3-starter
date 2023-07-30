import { fetchLogin } from "./../../../utils/services/auth-services"
import { NuxtAuthHandler } from "#auth"
import CredentialsProvider from "next-auth/providers/credentials"

export default NuxtAuthHandler({
  secret: useRuntimeConfig().AUTH_SECRET,
  debug: true,
  pages: {
    signIn: "/auth",
  },
  callbacks: {
    signIn() {
      return true
    },
    async session({ session, token }) {
      session.user = token
      return session
    },
    async jwt({ token, user }) {
      return {
        ...token,
        ...user,
      }
    },
  },
  providers: [
    // @ts-expect-error
    CredentialsProvider.default({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any) {
        const credentialDetails = {
          email: credentials.email,
          password: credentials.password,
        }

        return await fetchLogin({
          formData: credentialDetails,
        })
      },
    }),
  ],
})
