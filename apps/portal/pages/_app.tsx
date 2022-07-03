import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import Navbar from '../components/Navbar';
import { createClient, Provider } from 'urql';
import Background from 'components/Background';

const client = createClient({
  url: '/api/graphql',
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider value={client}>
      <SessionProvider session={pageProps.session}>
        <Background splotches={3} />
        <Navbar>
          <Component {...pageProps} />
        </Navbar>
      </SessionProvider>
    </Provider>
  );
}
export default MyApp;
