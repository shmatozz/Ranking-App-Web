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
          return { email: credentials.email as string, token: data.jwtToken };
        } else {
          throw new CredentialsSignin(data.msg || "Ошибка авторизации");
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
