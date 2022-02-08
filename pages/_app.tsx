import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import AuthWrapper from '../components/AuthWrapper';
import Navbar from '../components/Navbar';

const client = new ApolloClient({
  uri: '/api/graphql',
  cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <SessionProvider session={pageProps.session}>
        <AuthWrapper>
          <Navbar>
            <Component {...pageProps} />
          </Navbar>
        </AuthWrapper>
      </SessionProvider>
    </ApolloProvider>
  );
}
export default MyApp;
