import { connectMongoDB } from '@/lib/mongodb';
import UserModel from '@/models/user';
import GoogleProvider from 'next-auth/providers/google';
import { NextAuthOptions } from 'next-auth';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,

      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === 'google') {
        const { name, email } = user;
        try {
          await connectMongoDB();
          const userExists = await UserModel.findOne({ email });

          if (!userExists) {
            const bookmarks: [] = [];
            const res = await fetch(`${process.env.NEXTAUTH_URL}/api/user`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                name,
                email,
                bookmarks,
              }),
            });

            if (res.ok) {
              // return user;
              return true;
            }
          }
        } catch (error) {
          // console.log(error);
        }
      }

      // return user;
      return true;
    },
    async redirect({ baseUrl }) {
      return baseUrl;
    },
  },
  pages: {
    signIn: '/connexion',
  },
};
