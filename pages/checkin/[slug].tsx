import { NextRouter, useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { CombinedError } from 'urql';
import LoadingComponent from 'components/LoadingComponent';
import ErrorComponent from 'components/ErrorComponent';
import { default as ACMButton } from '../../components/PortalButton';
import SuccessfulComponent from 'components/SuccessfulComponent';
import { useSession } from 'next-auth/react';
import { GetServerSideProps } from 'next';
import { gqlQueries, queryClient } from 'src/api';
import { dehydrate, useQuery } from 'react-query';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  await queryClient.prefetchQuery(['checkInData'], () => gqlQueries.getCheckInPageUserInfo());
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

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

  const [queryError, setQueryError] = useState<CombinedError | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (isLoading) return;
    setLoading(false);
    if (error) {
      setQueryError(error as CombinedError);
      return;
    }
    if (!data!.me.profile) {
      setQueryError(
        new CombinedError({
          graphQLErrors: ['Profile does not exist'],
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

  if (status == 'loading') return <p className="text-gray-100">loading...</p>;
  if (loading) {
    return <LoadingComponent />;
  }
  if (queryError) {
    return (
      <ViewWrapper router={router}>
        <ErrorComponent errorMessage={queryError.message} />
      </ViewWrapper>
    );
  }

  return (
    <ViewWrapper router={router}>
      <SuccessfulComponent message="Check-in successful" />
    </ViewWrapper>
  );
}
