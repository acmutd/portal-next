import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

import { useRouter } from 'next/router';
import { withRelay } from 'relay-nextjs';
import { graphql, useLazyLoadQuery } from 'react-relay';
import { getClientEnvironment } from '../lib/relay-nextjs/client_environment';

const PROFILE_CHECK = graphql`
  query pages_UsersQuery($filter: UserFilter) {
    users(filter: $filter) {
      hasProfile
    }
  }
`;

function HomePage() {
  const { data: session } = useSession();
  const router = useRouter();

  const query: any = useLazyLoadQuery(PROFILE_CHECK, {
    filter: {
      _id: session.id,
    },
  });

  if (!query.users) return null;

  // const { loading, error, data } = useQuery(PROFILE_CHECK, {
  //   variables: {
  //     filter: {
  //       _id: session.id,
  //     },
  //   },
  // });

  // if (loading) return 'Loading...';
  // if (error) return `Error! ${error.message}`;

  if (!session) return <div />;
  if (query.users === [] || !query.users[0].hasProfile) router.push('/profile/update');

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

function Loading() {
  return <div>Loading...</div>;
}

export default withRelay(HomePage, PROFILE_CHECK, {
  fallback: <Loading />,
  createClientEnvironment: () => getClientEnvironment()!,
  createServerEnvironment: async () => {
    const { createServerEnvironment } = await import('../lib/relay-nextjs/server_environment');
    return createServerEnvironment();
  },
});
