import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import DiscordProvider from 'next-auth/providers/discord';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import ACMAdminProvider from '../../../lib/providers/ACMAdminProvider';
import clientPromise from '../../../lib/database/mongodb';

export default NextAuth({
  providers: [
    ACMAdminProvider({
      clientId: process.env.OAUTH_ADMIN_GOOGLE_CLIENTID!,
      clientSecret: process.env.OAUTH_ADMIN_GOOGLE_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.OAUTH_GOOGLE_CLIENTID!,
      clientSecret: process.env.OAUTH_GOOGLE_SECRET!,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
    DiscordProvider({
      clientId: process.env.OAUTH_DISCORD_CLIENTID!,
      clientSecret: process.env.OAUTH_DISCORD_SECRET!,
      authorization: process.env.OAUTH_DISCORD_AUTH_URL!,
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  secret: process.env.NEXTAUTH_SECRET!,
  pages: {
    signIn: '/auth/signin',
    signOut: '/',
  },
  callbacks: {
    async signIn({ account, user }) {
      if (user.email!.indexOf('@acmutd.co') !== -1 && account.provider === 'google') {
        return '/auth/error/officer';
      }
      return true;
    },
    async session({ session, user }) {
      return { ...session, id: user.id };
    },
  },
});
