import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

import { useRouter } from 'next/router';
import { RelayProps, withRelay } from 'relay-nextjs';
import { graphql, usePreloadedQuery } from 'react-relay';
import { pages_UsersQuery } from 'queries/__generated__/pages_UsersQuery.graphql';
import { Suspense } from 'react';
import { getClientEnvironment } from '../lib/relay-nextjs/client_environment';

const PROFILE_CHECK = graphql`
  query pages_UsersQuery($filter: UserFilter) {
    users(filter: $filter) {
      hasProfile
    }
  }
`;

function HomePage({ preloadedQuery }: RelayProps<{}, pages_UsersQuery>) {
  const { data: session } = useSession();
  const router = useRouter();

  const query: any = usePreloadedQuery(PROFILE_CHECK, preloadedQuery);

  // if (!query.users) return null;

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
        <Suspense fallback={<div>test Loading</div>}>
          <div>{JSON.stringify(query)}</div>
        </Suspense>
      </div>
    </div>
  );
}

export default withRelay(HomePage, PROFILE_CHECK, {
  createClientEnvironment: () => getClientEnvironment()!,
  createServerEnvironment: async () => {
    const { createServerEnvironment } = await import('../lib/relay-nextjs/server_environment');
    return createServerEnvironment();
  },
});
