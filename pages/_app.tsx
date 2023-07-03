import '../styles/globals.css';
import '../styles/fonts.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import Skeleton from '../components/Skeleton';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { Hydrate, QueryClientProvider } from 'react-query';
import { queryClient } from 'src/api';

function MyApp({ Component, pageProps }: AppProps<any>) {
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <SessionProvider session={pageProps.session}>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <Skeleton>
              <Component {...pageProps} />
            </Skeleton>
          </LocalizationProvider>
        </SessionProvider>
      </Hydrate>
    </QueryClientProvider>
  );
}
export default MyApp;
