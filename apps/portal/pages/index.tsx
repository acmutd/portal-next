import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

import { useRouter } from 'next/router';

// eslint-disable-next-line @typescript-eslint/ban-types
export default function HomePage() {
  const { data: session } = useSession();
  const router = useRouter();

  if (!session)
    return (
      <>
        <Link href="/auth/signin" passHref>
          <button type="button" className="p-3 rounded-lg bg-green-400">
            Sign In
          </button>
        </Link>
      </>
    );

  return (
    <div>
      <h1 className="text-lg">Signed in as {session.user?.name}</h1>
      <h1 className="text-lg">Email: {session.user?.email}</h1>
      <div className="flex gap-x-3">
        <button type="button" className="p-3 rounded-lg bg-green-400" onClick={() => signOut()}>
          Sign out
        </button>
        <Link href="/auth/signin" passHref>
          <button type="button" className="p-3 rounded-lg bg-green-400">
            Add another account
          </button>
        </Link>
      </div>
    </div>
  );
}
