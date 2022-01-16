import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import DiscordProvider from "next-auth/providers/discord";
import ACMAdminProvider from "../../../lib/admin/ACMAdminProvider";

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
    }),
  ],
});
