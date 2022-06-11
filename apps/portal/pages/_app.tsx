import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import Navbar from '../components/Navbar';
import { createClient, Provider } from 'urql';

const client = createClient({
  url: '/api/graphql',
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider value={client}>
      <SessionProvider session={pageProps.session}>
        <Navbar>
          <Component {...pageProps} />
        </Navbar>
      </SessionProvider>
    </Provider>
  );
}
export default MyApp;
