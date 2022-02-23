import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { getInitialPreloadedQuery, getRelayProps } from 'relay-nextjs/app';
import { RelayEnvironmentProvider } from 'react-relay';
import AuthWrapper from '../components/AuthWrapper';
import Navbar from '../components/Navbar';
import { getClientEnvironment } from '../lib/relay-nextjs/client_environment';

const clientEnv = getClientEnvironment();
const initialPreloadedQuery = getInitialPreloadedQuery({
  createClientEnvironment: () => getClientEnvironment()!,
});

function MyApp({ Component, pageProps }: AppProps) {
  const relayProps = getRelayProps(pageProps, initialPreloadedQuery);
  const env = relayProps.preloadedQuery?.environment ?? clientEnv!;

  return (
    <RelayEnvironmentProvider environment={env}>
      <SessionProvider session={pageProps.session}>
        <AuthWrapper>
          <Navbar>
            <Component {...pageProps} {...relayProps} />
          </Navbar>
        </AuthWrapper>
      </SessionProvider>
    </RelayEnvironmentProvider>
  );
}
export default MyApp;
