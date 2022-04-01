/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { withAuth } from 'next-auth/middleware';

export default withAuth({
  callbacks: {
    authorized: async ({ token, req }) => {
      console.log(req.url);
      const regex = new RegExp(`^${process.env.NEXTAUTH_URL as string}\/api\/.*`);
      console.log(regex);
      if (req.url.match(regex) || req.url === `${process.env.NEXTAUTH_URL as string}/`) return true;
      return !!token;
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
});
