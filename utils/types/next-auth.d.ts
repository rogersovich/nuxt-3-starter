import nextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      name: string;
      email: string
      token: {
        accessToken: string
        refreshToken: string
      }
    }
  }
}