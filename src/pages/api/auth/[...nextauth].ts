import CredentialsProvider from 'next-auth/providers/credentials';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import NextAuth, { AuthOptions } from 'next-auth';
import unidque from 'unidque';
import bcrypt from 'bcrypt';

import User from '@/model/User';
import dbConnect from '@/lib/dbconnect';
import clientPromise from '@/lib/mongodb';
import { UserAuthData } from '@/types/UserAuthData';

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'credentials',
      credentials: {
        username: {
          label: 'Username',
          type: 'text',
        },
        password: {
          label: 'Password',
          type: 'text',
        },
      },
      async authorize(credentials) {
        await dbConnect();

        if (!credentials) {
          throw new Error('Need credentials');
        }

        const user = await User.findOne({
          username: credentials.username,
        }).select('+password');

        if (!user) {
          throw new Error('ERR_INVALID_LOGIN_OR_PASSWORD');
        }

        const matchPassword = await bcrypt.compare(
          credentials.password,
          user.password ?? ''
        );

        if (!matchPassword) {
          throw new Error('ERR_INVALID_LOGIN_OR_PASSWORD');
        }

        const token: string = unidque().toString();

        user.tokens.push(token);

        await user.save();

        return {
          id: user._id,
          email: user.email,
          token: token,
        };
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      user && (token.user = user);
      return token;
    },
    session: async ({ session, token }) => {
      session.user = token.user as UserAuthData;
      return session;
    },
  },
  debug: process.env.NODE_ENV === 'development',
  adapter: MongoDBAdapter(clientPromise),
  session: { strategy: 'jwt' },
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET,
    maxAge: 60 * 60 * 24 * 7,
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
