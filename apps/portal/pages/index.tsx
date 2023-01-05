import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import ACMButton from '../components/PortalButton';

export const getServerSideProps = async (ctx) => {
  const { profileVisited } = ctx.req.cookies;
  return { props: { profileVisited: profileVisited ?? null } };
};

export default function HomePage({ profileVisited }) {
  const { data: session } = useSession();

  let pageTheme: any = 'dark';

  if (session && !profileVisited) {
    // redirect user to set up profile if they haven't already
    console.log('redirecting to profile');
    return {
      redirect: {
        permanent: false,
        destination: '/profile',
      },
    };
  }
  if (!session)
    return (
      <>
        <Link href="/auth/signin" passHref>
          <ACMButton theme={pageTheme} gradientcolor="#4cb2e9">
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
