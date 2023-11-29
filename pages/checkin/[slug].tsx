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
import Loading from 'components/Loading';

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

  if (isLoading || status == 'loading') return <Loading />;
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
