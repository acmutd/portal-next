import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { gql, useQuery, useMutation } from 'urql';
import Link from 'next/link';
import { Event, EventReservation } from '@generated/type-graphql';

import ACMButton from '../components/PortalButton';
import { useEffect } from 'react';
import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { profileVisited } = ctx.req.cookies;
  return { props: { profileVisited: profileVisited ?? null } };
};

export default function HomePage({ profileVisited }: { profileVisited: boolean }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status == 'authenticated' && !profileVisited) {
      router.push('/profile');
    }
    if (status == 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status]);

  let pageTheme: any = 'dark';

  if (!session) {
    return <></>;
  }

  // Homepage query
  const HOMEPAGE_QUERY = gql`
    query Query($where: ProfileWhereUniqueInput!) {
      me {
        attendedEvents {
          description
          location
          summary
          start
        }
      }
      profile(where: $where) {
        firstName
        netid
        email
      }
    }
  `;

  // Migrate data mutation
  const MIGRATE_DATA_MUTATION = gql`
    mutation CheckInOldEvent($email: String!, $netId: String!) {
      checkInOldEvent(email: $email, netID: $netId) {
        eventId
        profileId
      }
    }
  `;

  const [profileResult, reexecuteQuery] = useQuery({
    query: HOMEPAGE_QUERY,
    variables: {
      where: {
        userId: session ? session.id : '',
      },
    },
  });

  const [_, migrateData] = useMutation<EventReservation, { email: string; netId: string }>(
    MIGRATE_DATA_MUTATION,
  );

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

  if (!profileVisited) {
    router.push('/profile'); // redirect user to set up profile if they haven't already
  }

  // Fetch data
  const { data, fetching, error } = profileResult;
  if (fetching) return <p className="text-gray-100">loading...</p>;
  if (error) return <p className="text-gray-100">whoops... {error.message}</p>;

  if (!data.profile) {
    router.push('/profile');
    return <div></div>;
  }

  return (
    <>
      {/* Header */}
      <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 w-full p-11">
        <div>
          <h1 className="text-white text-5xl font-medium"> Welcome to your acm portal, </h1>
          <h1 className="text-white text-6xl font-medium my-10"> {data.profile.firstName} </h1>
        </div>
        <div>
          <img src="assets/acm/mrpeechi.png" alt="acm mascot" />
        </div>
        <div>
          <div className="hidden lg:block">
            <h1 className="text-white text-5xl font-medium"> net ID </h1>
            <h1 className="text-white text-3xl font-medion ml-8"> {data.profile.netid} </h1>
          </div>
          <div className="my-5">
            <ACMButton
              onClick={() => {
                migrateData({
                  email: data.profile.email,
                  netId: data.profile.netid,
                }).then(() => alert('Success'));
              }}
              theme={pageTheme}
              gradientcolor={'#4cb2e9'}
            >
              Migrate data
            </ACMButton>
          </div>
        </div>
      </div>
      {/* Attended event boxes */}
      <h1 className="px-4 text-2xl text-left text-white font-semibold mb-4">attended events</h1>
      <div className="relative">
        <div className="flex flex-col items-center lg:grid lg:grid-cols-2 xl:grid-cols-3 gap-y-6">
          {data.me.attendedEvents.slice(0, 3).map((event: Event) => (
            <div className="flex flex-col items-end w-fit mx-4">
              <h3 className="font-bold text-white mr-5 mb-[5px] text-[20px]">development</h3>
              <div className="bg-gray-200/10 outline outline-gray-100/10 w-80 h-48 p-6 rounded-3xl space-y-2 flex flex-col justify-between">
                <div>
                  <div className="w-full flex justify-between items-center gap-[20px]">
                    <h4 className="text-[25px] text-white font-bold whitespace-nowrap overflow-hidden text-ellipsis">
                      {event.summary}
                    </h4>
                  </div>
                  <p className="text-white text-sm">{event.description}</p>
                </div>
                <div className="text-white font-semibold relative w-fit ml-auto">Attended</div>
              </div>
            </div>
          ))}
        </div>
        <div className="w-fit ml-auto">
          <ACMButton
            onClick={() => {
              router.push('/events');
            }}
            theme={pageTheme}
            gradientcolor={'#4cb2e9'}
          >
            See more
          </ACMButton>
        </div>
      </div>
    </>
  );
}
