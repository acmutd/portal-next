import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import AuthWrapper from '../components/AuthWrapper';

const client = new ApolloClient({
  uri: 'http://localhost:3000/api/graphql',
  cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <SessionProvider session={pageProps.session}>
        <AuthWrapper>
          <Component {...pageProps} />
        </AuthWrapper>
      </SessionProvider>
    </ApolloProvider>
  );
}
export default MyApp;
