import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Link from 'next/link';

// import { ACMButton } from '@acmutd/acm-ui';
// if youre testing components on this page and youre too lazy to build every single time just change the import to this
import { ACMButton } from '@acmutd/acm-ui';

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
    <div>
      <ACMButton />
      <h1 className="text-lg">Signed in as {session.user?.name}</h1>
      <h1 className="text-lg">Email: {session.user?.email}</h1>
      <div className="flex gap-x-3">
        <button type="button" className="p-3 rounded-lg bg-green-400" onClick={() => signOut()}>
          Sign out
        </button>
        <Link href="/auth/signin" passHref>
          <ACMButton theme="light">Add Another Account</ACMButton>
        </Link>
      </div>
    </div>
  );
}
