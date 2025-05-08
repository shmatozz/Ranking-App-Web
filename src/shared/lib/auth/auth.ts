import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials";
import { CredentialsSignin } from 'next-auth';
import axiosInstance from "@/shared/api/AxiosConfig";

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
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password", required: false }, // Необязательный пароль
        token: { label: "Token", type: "text", required: false }, // Токен для обновления
      },
      async authorize(credentials) {
        console.log("Received credentials:", credentials);

        if (credentials.token) {
          return { email: credentials.email as string, token: credentials.token };
        }

        if (!credentials.password) {
          throw new CredentialsSignin("Пароль обязателен при входе!");
        }

        const res = await axiosInstance.post(
          "/auth/login",
          {
            login: credentials.email,
            password: credentials.password,
          }
        )

        if (res.status == 200 && res.data.jwtToken) {
          return { email: credentials.email as string, token: res.data.jwtToken };
        } else {
          throw new CredentialsSignin( res.data.msg || "Ошибка авторизации");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.email = user.email;
        token.accessToken = user.token;
      }

      if (trigger === "update" && session) {
        token.accessToken = session.user.token;
      }

      return token;
    },
    async session({ session, token }) {
      session.user.token = token.accessToken as string;
      return session;
    },
  },
  session: {
    maxAge: 10000
  }
})
