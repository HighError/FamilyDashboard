import NextAuth, { AuthOptions } from "next-auth";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import clientPromise from "@/lib/mongodb";
import dbConnect from "@/lib/dbconnect";
import { User as UserType } from "types/User";
import User from "model/User";
import bcrypt from "bcrypt";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
        },
        password: {
          label: "Password",
          type: "text",
        },
      },
      async authorize(credentials) {
        await dbConnect();

        if (!credentials) {
          throw new Error("Need credentials");
        }

        const user = await User.findOne({
          username: credentials.username,
        }).select("+password");

        if (!user) {
          throw new Error("Email not found");
        }

        const matchPassword = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!matchPassword) {
          throw new Error("Passwword incorrect");
        }

        return await User.findOne(user);
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      user && (token.user = user);
      return token;
    },
    session: async ({ session, token }) => {
      session.user = token.user as UserType;
      return session;
    },
  },
  debug: process.env.NODE_ENV === "development",
  adapter: MongoDBAdapter(clientPromise),
  session: { strategy: "jwt" },
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET,
    maxAge: 60 * 60 * 24 * 7,
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
