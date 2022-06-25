import { OAuthConfig, OAuthUserConfig } from 'next-auth/providers';
import GoogleProvider, { GoogleProfile } from 'next-auth/providers/google';

interface ACMAdminProfile {
  aud: string;
  azp: string;
  email: string;
  email_verified: boolean;
  exp: number;
  family_name: string;
  given_name: string;
  hd: string;
  iat: number;
  iss: string;
  jti: string;
  name: string;
  nbf: number;
  picture: string;
  sub: string;
}

export default function ACMAdminProvider<P extends GoogleProfile = ACMAdminProfile>(
  options: OAuthUserConfig<P>,
): OAuthConfig<P> {
  return {
    ...GoogleProvider<P>(options),
    id: 'google_admin',
    name: 'ACM Account',
  };
}
