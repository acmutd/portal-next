import NextAuth from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google';
import DiscordProvider from 'next-auth/providers/discord';
import CognitoProvider from 'next-auth/providers/cognito';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import ACMAdminProvider from '../../../lib/providers/ACMAdminProvider';
import { PrismaClient } from '@prisma/client';

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
    CognitoProvider({
      clientId: process.env.COGNITO_CLIENT_ID!,
      clientSecret: process.env.COGNITO_CLIENT_SECRET!,
      issuer: 'https://cognito-idp.us-east-1.amazonaws.com/us-east-1_wXVzOvrZ8',
    }),
  ],
  adapter: PrismaAdapter(new PrismaClient()),
  session: {
    strategy: 'jwt',
  },
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
    async session({ session, token }) {
      return { ...session, id: token.sub };
    },
  },
});
