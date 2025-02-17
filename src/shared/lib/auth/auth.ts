import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials";
import { CredentialsSignin } from 'next-auth';

declare module "next-auth" {
  interface Session {
    user: {
      email: string,
      token: string
    }
  }
  interface User {
    token: string
  }
}

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [Credentials({
    credentials: {
      email: {},
      password: {},
    },
    authorize: async (credentials) => {
      console.log(credentials);

      const res = await fetch("http://localhost:9000/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          login: credentials.email,
          password: credentials.password,
        }),
      });

      const data = await res.json();

      if (res.ok && data.jwtToken) {
        return { email: credentials.email as string, token: data.jwtToken }
      } else {
        throw new CredentialsSignin(data.msg || "Ошибка авторизации");
      }
    }
  })],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.token;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.token = token.accessToken as string;
      return session;
    },
  },
  session: {
    maxAge: 12960
  }
})
