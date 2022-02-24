import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

import { useRouter } from 'next/router';
import { RelayProps, withRelay } from 'relay-nextjs';
import { graphql, usePreloadedQuery } from 'react-relay';
import { pages_MeQuery } from 'queries/__generated__/pages_MeQuery.graphql';
import { Suspense } from 'react';
import { getClientEnvironment } from '../lib/relay-nextjs/client_environment';

const PROFILE_CHECK = graphql`
  query pages_MeQuery {
    me {
      hasProfile
    }
  }
`;

function HomePage({ preloadedQuery }: RelayProps<{}, pages_MeQuery>) {
  const { data: session } = useSession();
  const router = useRouter();

  const query = usePreloadedQuery(PROFILE_CHECK, preloadedQuery);

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
  if (!query.me.hasProfile) router.push('/profile/update');

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
  createServerEnvironment: async (ctx, { cookieData }) => {
    const { createServerEnvironment } = await import('../lib/relay-nextjs/server_environment');
    return createServerEnvironment(cookieData);
  },
  serverSideProps: async (ctx) => ({ cookieData: ctx.req.headers.cookie }),
});
