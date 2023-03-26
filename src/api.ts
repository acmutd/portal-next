import { GraphQLClient } from 'graphql-request';
import { QueryClient } from 'react-query';
import { getSdk } from 'lib/generated/graphql';

const gqlClient = new GraphQLClient('http://localhost:4200/api/graphql');
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
