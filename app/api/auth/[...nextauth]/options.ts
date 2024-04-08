import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { compare } from "bcrypt";
import mongoose from "mongoose";
import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";


export const options: NextAuthOptions = {
  pages: {
    signIn: '/sign-in'
  },
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email address', type: 'text', placeholder: 'user@example.com' },
        password: { label: 'Password', type: 'password' },
      },

      async authorize(credentials, request) {
        await connectDB();

        const user = await User.findOne({
          email: credentials?.email
        }).select("+password");

        if(!user) return null;

        const passwordMismatch = await compare(credentials!.password, user.password);

        if(!passwordMismatch) return null;

        delete user.password;

        return user;
      },
    })
  ],
  session: {
    strategy: 'jwt',
  },
  debug: process.env.NODE_ENV === 'development',
  callbacks: {
    async jwt({ token, user, session, trigger }) {
      if(trigger === 'update' && session?.name) {
        token.name = session.name;
      }

      if(trigger === 'update' && session?.email) {
        token.email = session.email;
      }

      if(user) {
        const u = user as unknown as any;
        return {
          ...token,
          id: u.id,
        }
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          _id: token.id,
          name: token.name,
        }
      }
    },
  }
};
