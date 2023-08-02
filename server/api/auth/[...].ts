import { fetchLogin } from "./../../../utils/services/auth-services";
import { NuxtAuthHandler } from "#auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NuxtAuthHandler({
  secret: useRuntimeConfig().AUTH_SECRET,
  debug: true,
  pages: {
    signIn: "/auth",
  },
  jwt: {
    // 1 Hour
    maxAge: 36000,
  },
  session: {
    // 1 Hour
    maxAge: 36000,
  },
  callbacks: {
    signIn() {
      return true;
    },
    async session({ session, token }) {
      if (token) {
        session.user = token as any;
      }
      return session;
    },
    async jwt({ token, user, account }) {
      if (account && user) {
        return {
          accessToken: "123",
          ...user,
        };
      }

      // console.log({ token });
      // Return previous token if the access token has not expired yet
      //  if (Date.now() < token.accessTokenExpires) {
      //   return token
      // }

      return {
        ...token,
        ...user,
      };
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
        };

        return await fetchLogin({
          formData: credentialDetails,
        });
      },
    }),
  ],
});
