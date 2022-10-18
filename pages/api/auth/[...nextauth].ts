import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth, { Session } from "next-auth";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../../../lib/api/mongodb";
import GithubProvider from "next-auth/providers/github";
import { getToken } from "next-auth/jwt";
import { getSession } from "next-auth/react";

export default NextAuth({
  secret: process.env.AUTH_SECRET,
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: "Username", type: "text", placeholder: "jsmith" },
        passWord: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const adminUser = { email: "root", passWord: "root1234" };

        if (
          credentials?.email === adminUser.email &&
          credentials.passWord === adminUser.passWord
        ) {
          return { id: 1, name: "admin", email: "admin@admin.com" };
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
    signOut: "/login",
    error: "/login",
  },
  // callbacks: {
  //   jwt: async (token, user, account, profile, isNewUser) => {
  //     if (user) {
  //       token.uid = user.id;
  //     }
  //     return Promise.resolve(token);
  //   },
  //   session: async (session, user) => {
  //     session.user.uid = user.uid;
  //     return Promise.resolve(session);
  //   },
  // },
});
