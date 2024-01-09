import { TLogin } from "@/types/auth";
import { ROUTE } from "@/utils/routes";
import axios, { AxiosResponse } from "axios";
import NextAuth, { type AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 3 * 24 * 60 * 60,
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {
        email: { label: "Email", type: "email", required: true },
        password: { label: "Password", type: "password", required: true },
      },
      async authorize(credentials) {
        const { email, password } = credentials || {};
        if (!email || !password) {
          return null;
        }

        const loginData = await axios
          .post(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/login`, credentials)
          .then((resp: AxiosResponse<TLogin>) => resp.data);

        return {
          id: String(loginData.id),
          email: loginData.email,
          imgPath: loginData.imgPath,
          userName: loginData.userName,
          token: loginData.token,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ account, token, user }) {
      if (account) {
        token.name = user.userName;
      }
      if (user) {
        token.token = user.token;
        token.id = Number(user.id);
        token.imgPath = user.imgPath;
        token.userName = user.userName;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.token = token.token;
        session.user.imgPath = token.imgPath;
        session.user.userName = token.userName;
        session.user.id = token.id;
      }
      return session;
    },
  },
  pages: {
    signIn: ROUTE.HOME,
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
