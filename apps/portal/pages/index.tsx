import { signOut, useSession } from 'next-auth/react';
import { Router, useRouter } from 'next/router';
import Link from 'next/link';

import ACMButton from '../components/PortalButton';
import { useEffect } from 'react';

export const getServerSideProps = async (ctx) => {
  const { profileVisited } = ctx.req.cookies;
  return { props: { profileVisited: profileVisited ?? null } };
};

export default function HomePage({ profileVisited }) {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session && !profileVisited) {
      // redirect user to set up profile if they haven't already
      console.log('redirecting to profile');
      router.push('/profile');
    }
    if (!session) {
      // redirect user to sign in if they aren't signed in
      console.log('redirecting to sign in');
      router.push('/auth/signin');
    }
  }, [session]);

  let pageTheme: any = 'dark';

  if (!session) {
    return <></>;
  }

  return (
    <>
      <h1 className="text-lg text-white">Signed in as {session.user?.name}</h1>
      <h1 className="text-lg text-white">Email: {session.user?.email}</h1>
      <div className="flex gap-x-3">
        <ACMButton onClick={() => signOut()} theme={pageTheme} gradientcolor={'#4cb2e9'}>
          Sign out
        </ACMButton>
        <Link href="/auth/signin" passHref>
          <ACMButton theme={pageTheme} gradientcolor={'#4cb2e9'}>
            Add Another Account
          </ACMButton>
        </Link>
      </div>
    </>
  );
}
