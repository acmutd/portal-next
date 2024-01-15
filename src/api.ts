import { GraphQLClient } from 'graphql-request';
import { QueryClient } from 'react-query';
import { getSdk } from 'lib/generated/graphql';

const baseUrl = process.env.NODE_ENV === 'production' ? 'https://portal.acmutd.co' : 'http://localhost:4200';
const gqlClient = new GraphQLClient(baseUrl + '/api/graphql');
export const gqlQueries = getSdk(gqlClient);

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  },
});
