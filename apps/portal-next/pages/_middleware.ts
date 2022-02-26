/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { withAuth } from 'next-auth/middleware';

export default withAuth({
  callbacks: {
    authorized: async ({ token, req }) => {
      if (req.url.includes('/api/graphql') || req.url === `${process.env.NEXTAUTH_URL as string}/`)
        return true;
      return !!token;
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
});
