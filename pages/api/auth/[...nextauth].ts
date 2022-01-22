import NextAuth from 'next-auth';
import { Client as FaunaClient } from 'faunadb';
import { FaunaAdapter } from '@next-auth/fauna-adapter';
import GoogleProvider from 'next-auth/providers/google';
import DiscordProvider from 'next-auth/providers/discord';
import ACMAdminProvider from '../../../lib/providers/ACMAdminProvider';

const client = new FaunaClient({
  secret: process.env.FAUNADB_SECRET_KEY!,
  scheme: 'https',
  domain: 'db.us.fauna.com',
  port: 443,
});

export default NextAuth({
  providers: [
    ACMAdminProvider({
      clientId: process.env.OAUTH_ADMIN_GOOGLE_CLIENTID!,
      clientSecret: process.env.OAUTH_ADMIN_GOOGLE_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.OAUTH_GOOGLE_CLIENTID!,
      clientSecret: process.env.OAUTH_GOOGLE_SECRET!,
    }),
    DiscordProvider({
      clientId: process.env.OAUTH_DISCORD_CLIENTID!,
      clientSecret: process.env.OAUTH_DISCORD_SECRET!,
      authorization: process.env.OAUTH_DISCORD_AUTH_URL!,
    }),
  ],
  adapter: FaunaAdapter(client),
  secret: process.env.NEXTAUTH_SECRET!,
  pages: {
    signIn: '/auth/signin',
  },
  callbacks: {
    async signIn({ account, user }) {
      if (user.email!.indexOf('@acmutd.co') !== -1 && account.provider === 'google') {
        return '/auth/error/officer';
      }
      return true;
    },
  },
});
