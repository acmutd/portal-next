import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

import { useQuery, gql } from '@apollo/client';

const TEST = gql`
  query Users {
    users {
      email
    }
  }
`;

export default function HomePage() {
  const { data: session } = useSession();

  const { loading, error, data } = useQuery(TEST);

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  if (!session) return <div />;
  return (
    <div>
      <h1 className="text-lg">Signed in as {session.user?.name}</h1>
      <h1 className="text-lg">Email: {session.user?.email}</h1>
      <div className="flex gap-x-3">
        <button type="button" className="p-3 rounded-lg bg-green-400" onClick={() => signOut()}>
          Sign out
        </button>
        <Link href="/auth/signin">
          <button type="button" className="p-3 rounded-lg bg-green-400">
            Add another account
          </button>
        </Link>
      </div>
      <div>{JSON.stringify(data)}</div>
    </div>
  );
}
