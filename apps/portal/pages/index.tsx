import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { ACMButton } from '@acmutd/acm-ui';
// commit with above line active and below line uncommented, use below line for testing if you want
// import { ACMButton } from '@acmutd/acm-ui/src';

export default function HomePage() {
  const { data: session } = useSession();
  const router = useRouter();

  let pageTheme: any = 'dark';

  if (!session)
    return (
      <>
        <Link href="/auth/signin" passHref>
          <ACMButton theme={pageTheme} gradientColor="#4cb2e9">
            Sign In
          </ACMButton>
        </Link>
      </>
    );

  return (
    <>
      <h1 className="text-lg text-white">Signed in as {session.user?.name}</h1>
      <h1 className="text-lg text-white">Email: {session.user?.email}</h1>
      <div className="flex gap-x-3">
        <ACMButton onClick={() => signOut()} theme={pageTheme} gradientColor={'#4cb2e9'}>
          Sign out
        </ACMButton>
        <Link href="/auth/signin" passHref>
          <ACMButton theme={pageTheme} gradientColor={'#4cb2e9'}>
            Add Another Account
          </ACMButton>
        </Link>
      </div>
    </>
  );
}
