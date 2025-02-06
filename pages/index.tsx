import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useQuery } from 'react-query';
import { gqlQueries } from 'src/api';

import ACMButton from '../components/PortalButton';
import { useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { GraphQLError } from 'graphql';
import ErrorComponent from 'components/ErrorComponent';
import Loading from 'components/Loading_Home';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { profileVisited } = ctx.req.cookies;
  return {
    props: {
      profileVisited: profileVisited ?? null,
    },
  };
};

export default function HomePage({ profileVisited }: { profileVisited: boolean }) {
  const { data: session, status } = useSession({ required: true });
  const router = useRouter();

  const { data, error, isLoading } = useQuery(
    ['homepageData'],
    () =>
      gqlQueries.getHomePageUserInfo({
        where: {
          userId: session?.id || '',
        },
      }),
    { enabled: status === 'authenticated' },
  );

  const getHighestPosition = () => {
    if (data?.me.isDirector) return "Director";
    if (data?.me.isOfficer) return "Officer";
    if (data?.me.isMember) return "Member";
    return "Non-Member";
  };

  useEffect(() => {
    if (status === 'authenticated' && profileVisited === null) {
      router.push('/profile');
    }
  }, [status, profileVisited]);

  if (status !== 'authenticated') return <Loading />;
  if (!session) return (
    <div className="min-h-screen w-full p-8 flex items-center justify-center">
      <Link href="/auth/signin">
        <ACMButton theme="dark" gradientcolor="#4cb2e9">
          Sign In
        </ACMButton>
      </Link>
    </div>
  );

  if (isLoading || !data?.profile) {
    return <Loading />;
  }

  if (error) return (
    <ErrorComponent
      errorCode={(error as GraphQLError).extensions.code as string}
      errorMessage={(error as GraphQLError).message}
    />
  );

  return (
    <div className="min-h-screen w-full p-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header Section */}
        <div className="bg-gray-200/5 outline outline-gray-100/10 rounded-xl p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            {/* Welcome Text */}
            <div className="space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl md:text-4xl font-medium text-white leading-tight">
                  Welcome to your ACM portal
                </h1>
                <h2 className="text-4xl md:text-5xl font-medium text-white">
                  {data.profile.firstName}
                </h2>
              </div>
              <div className="flex flex-wrap gap-2 pt-2">
                <span className="px-3 py-1 rounded-full bg-purple-600/20 text-purple-400 text-sm font-medium">
                  {getHighestPosition()}
                </span>
                {data.me.isOfficer && data.profile.officer && (
                  <span className="px-3 py-1 rounded-full bg-blue-600/20 text-blue-400 text-sm font-medium">
                    {data.profile.officer.divisions.map(d => d.deptName).join(", ")}
                  </span>
                )}
              </div>
            </div>

            {/* Mascot Image */}
            <div className="flex justify-center">
              <img
                src="assets/acm/mrpeechi.png"
                alt="acm mascot"
                className="w-48 md:w-64"
              />
            </div>

            {/* User Info */}
            <div className="space-y-4">
              <div className="bg-gray-200/5 rounded-lg p-4 space-y-1">
                <h3 className="text-sm font-medium text-gray-400">NetID</h3>
                <p className="text-lg text-white">{data.profile.netid}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Events Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-white">Attended Events</h2>
            <ACMButton
              onClick={() => router.push('/events')}
              theme="dark"
              gradientcolor="#4cb2e9"
            >
              See more
            </ACMButton>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.me.attendedEvents[0] ? (
              data.me.attendedEvents.slice(0, 3).map((event) => (
                <div
                  key={event.summary}
                  className="bg-gray-200/5 outline outline-gray-100/10 rounded-xl p-6 space-y-4"
                >
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-purple-400">
                      development
                    </h3>
                    <h4 className="text-xl font-bold text-white truncate">
                      {event.summary}
                    </h4>
                    <p className="text-gray-300 text-sm line-clamp-2">
                      {event.description}
                    </p>
                  </div>
                  <div className="flex justify-end">
                    <span className="text-sm font-medium text-green-400">
                      Attended
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full">
                <p className="text-xl text-gray-300">No attended events found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
