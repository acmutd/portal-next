import '../styles/globals.css';
import '../styles/fonts.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import Skeleton from '../components/Skeleton';
import { createClient, Provider } from 'urql';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

const client = createClient({
  url: '/api/graphql',
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider value={client}>
      <SessionProvider session={pageProps.session}>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <Skeleton>
            <Component {...pageProps} />
          </Skeleton>
        </LocalizationProvider>
      </SessionProvider>
    </Provider>
  );
}
export default MyApp;
