import '../styles/globals.css';
import '../styles/fonts.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import Skeleton from '../components/Skeleton';
import { createClient, Provider } from 'urql';

const client = createClient({
  url: '/api/graphql',
});

function MyApp({ Component, pageProps }: AppProps<any>) {
  return (
    <Provider value={client}>
      <SessionProvider session={pageProps.session}>
        <Skeleton>
          <Component {...pageProps} />
        </Skeleton>
      </SessionProvider>
    </Provider>
  );
}
export default MyApp;
