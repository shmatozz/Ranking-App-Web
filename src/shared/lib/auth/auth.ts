import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials";

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [Credentials({
    credentials: {
      email: {},
      password: {},
    },
    authorize: async (credentials) => {
      // TODO: CONNECT SERVER

      if (credentials.email === "baryshev.matvey@yandex.ru" && credentials.password === "123") {
        return { email: credentials.email, password: credentials.password }
      } else {
        throw new Error("Invalid Credentials");
      }
    }
  })]
})
