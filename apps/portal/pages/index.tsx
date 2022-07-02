import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { ACMButton } from '@acmutd/acm-ui';
// run this v when running npm run dev but commit with the above line ^ uncommented (this is temporary till we fix this lol)
// import { ACMButton } from '@acmutd/acm-ui/src';

export default function HomePage() {
  const { data: session } = useSession();
  const router = useRouter();

  if (!session)
    return (
      <>
        <Link href="/auth/signin" passHref>
          <ACMButton theme="light" gradientColor="8f45c9">
            Sign In
          </ACMButton>
        </Link>
      </>
    );

  return (
    <>
      <h1 className="text-lg">Signed in as {session.user?.name}</h1>
      <h1 className="text-lg">Email: {session.user?.email}</h1>
      <div className="flex gap-x-3">
        <ACMButton onClick={() => signOut()} theme="light">
          Sign out
        </ACMButton>
        <Link href="/auth/signin" passHref>
          <ACMButton theme="light">Add Another Account</ACMButton>
        </Link>
      </div>
    </>
  );
}
