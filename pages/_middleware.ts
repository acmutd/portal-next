import { withAuth } from 'next-auth/middleware';

export default withAuth({
  callbacks: {
    authorized: async ({ token, req }) => {
      if (req.url.includes('/api/graphql')) return true;
      return !!token;
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
});
