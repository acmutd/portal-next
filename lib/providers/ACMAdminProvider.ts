import { OAuthConfig, OAuthUserConfig } from "next-auth/providers";
import GoogleProvider from "next-auth/providers/google";

interface ACMAdminProfile {
  sub: string;
  name: string;
  email: string;
  picture: string;
}

export default function ACMAdminProvider<
  P extends Record<string, any> = ACMAdminProfile
>(options: OAuthUserConfig<P>): OAuthConfig<P> {
  return {
    ...GoogleProvider<P>(options),
    id: "google_admin",
    name: "ACM Account",
  };
}
