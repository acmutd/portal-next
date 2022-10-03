import { NextRouter, useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { gql, useQuery, useMutation, CombinedError } from 'urql';
import LoadingComponent from 'components/LoadingComponent';
import ErrorComponent from 'components/ErrorComponent';
import { ACMButton } from 'packages/acm-ui/lib';
import SuccessfulComponent from 'components/SuccessfulComponent';
import { useSession } from 'next-auth/react';

const PAGE_QUERY = gql`
  query {
    me {
      profile {
        id
      }
    }
  }
`;

const CHECK_IN_MUTATION = gql`
  mutation CheckInMutation($checkInData: EventCheckinInput!) {
    checkinToEvent(options: $checkInData) {
      profileId
      eventId
    }
  }
`;

interface QueryResultType {
  me: {
    profile: {
      id: string;
    };
  };
}

interface CheckInMutationArgType {
  checkInData: {
    eventId: string;
    profileId: string;
  };
}

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
  useSession({
    required: true,
  });

  const [_, checkInToEvent] = useMutation<any, CheckInMutationArgType>(CHECK_IN_MUTATION);
  const [queryError, setQueryError] = useState<CombinedError | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const [{ fetching, error, data }, reexecuteQuery] = useQuery<QueryResultType>({
    query: PAGE_QUERY,
  });

  useEffect(() => {
    if (fetching) return;
    setLoading(false);
    if (error) {
      setQueryError(error);
      return;
    }
    checkInToEvent({
      checkInData: {
        eventId: slug as string,
        profileId: data.me.profile.id,
      },
    }).then((result) => {
      if (result.error) {
        setQueryError(result.error);
      }
    });
  }, [fetching, error, data]);

  if (loading) {
    return <LoadingComponent />;
  }
  if (queryError) {
    console.error(queryError);
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
