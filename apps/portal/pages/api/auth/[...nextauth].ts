import NextAuth from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google';
import DiscordProvider from 'next-auth/providers/discord';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import ACMAdminProvider from '../../../lib/providers/ACMAdminProvider';
import { PrismaClient } from '@prisma/client';
import { grantRole } from 'lib/auth/grant-role';
import { getPrismaConnection } from 'lib/prisma/manager';

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
  adapter: PrismaAdapter(getPrismaConnection()),
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET!,
  pages: {
    signIn: '/auth/signin',
    signOut: '/',
    error: '/auth/error',
  },
  callbacks: {
    async signIn({ account, user }) {
      if (user.email!.indexOf('@acmutd.co') !== -1 && account.provider === 'google') {
        return '/auth/error/officer';
      }
      if (account.provider === 'google_admin') {
        try {
          await grantRole(user.id, 'officer');
        } catch (error) {
          console.error(error);
        }
      }
      return true;
    },
    async session({ session, token }) {
      return { ...session, id: token.sub };
    },
  },
});
