import { NextRouter, useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import LoadingComponent from 'components/LoadingComponent';
import ErrorComponent from 'components/ErrorComponent';
import { default as ACMButton } from '../../components/PortalButton';
import SuccessfulComponent from 'components/SuccessfulComponent';
import { useSession } from 'next-auth/react';
import { gqlQueries } from 'src/api';
import { useQuery } from 'react-query';
import { GraphQLError } from 'graphql';

function ViewWrapper({ children, router }: React.PropsWithChildren<{ router: NextRouter }>) {
  return (
    <div className="flex flex-col gap-y-3">
      {children}
      <ACMButton onClick={() => router.push('/events')}>click here to return to events</ACMButton>
    </div>
  );
}

export default function CheckinPage() {
  const router = useRouter();
  const { slug } = router.query;
  const { status } = useSession({
    required: true,
  });
  const { data, error, isLoading } = useQuery(
    ['checkInData'],
    () => gqlQueries.getCheckInPageUserInfo(),
    { enabled: status === 'authenticated' },
  );

  const [queryError, setQueryError] = useState<GraphQLError | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (isLoading) return;
    setLoading(false);
    if (error) {
      setQueryError(error as GraphQLError);
      return;
    }
    if (!data!.me.profile) {
      setQueryError(
        new GraphQLError('Profile does not exist', {
          extensions: {
            code: 'PROFILE_DOES_NOT_EXIST',
          },
        }),
      );
      return;
    }

    gqlQueries.checkInToEvent({
      checkInData: {
        eventId: slug as string,
        profileId: data!.me.profile.id,
      },
    });
  }, [isLoading, error, data]);

  const array = [];
  for (let i = 0; i < 20; i++) {
    array.push(
      <div className="flex items-center justify-between pt-4">
        <div>
          <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
          <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
        </div>
        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
      </div>,
    );
  }

  if (isLoading || status == 'loading')
    return (
      <>
        <div
          role="status"
          className="w-full h-full p-4 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700"
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
              <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
            </div>
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
          </div>
          {array}
          <span className="sr-only">Loading...</span>
        </div>
      </>
    );
  if (loading) {
    return <LoadingComponent />;
  }
  if (queryError) {
    return (
      <ViewWrapper router={router}>
        <ErrorComponent
          errorCode={queryError.extensions.code as string}
          errorMessage={queryError.message}
        />
      </ViewWrapper>
    );
  }

  return (
    <ViewWrapper router={router}>
      <SuccessfulComponent message="Check-in successful" />
    </ViewWrapper>
  );
}
