import EventForm from 'components/events/EventForm';
import { useRouter } from 'next/router';
import { gql, useMutation, useQuery } from 'urql';
import { Event, CreateOneEventArgs } from '@generated/type-graphql';
import { useSession } from 'next-auth/react';

interface QueryResultType {
  me: {
    isOfficer: boolean;
  };
}

const COMPONENT_QUERY = gql`
  query {
    me {
      isOfficer
    }
  }
`;

const CREATE_EVENT_MUTATION = gql`
  mutation CreateOneEvent($data: EventCreateInput!) {
    createOneEvent(data: $data) {
      id
    }
  }
`;

export default function AddEventPage() {
  const router = useRouter();
  const { status } = useSession({ required: true });

  const [{ data: queryResult, fetching, error }, _] = useQuery<QueryResultType>({
    query: COMPONENT_QUERY,
  });
  const [__, createEvent] = useMutation<
    {
      createOneEvent: Event;
    },
    CreateOneEventArgs
  >(CREATE_EVENT_MUTATION);

  if (fetching || status == 'loading') return <p>Loading...</p>;
  if (error) {
    console.log(error);
    return <p>Whoops... {error.message}</p>;
  }

  const { me } = queryResult!;
  if (!me.isOfficer) {
    return (
      <div>
        <h1 className="text-xl">
          You do not have officer permission. If you are an officer, please connect your account
          with your ACM account
        </h1>
      </div>
    );
  }

  return (
    <EventForm
      formAction="Create"
      onGoBack={() => router.push('/events')}
      onFormSubmit={async (form) => {
        // Remove id from form object
        const { id, ...rest } = form;

        const { data, error } = await createEvent({
          data: {
            ...rest,
            start: new Date(form.start),
            end: new Date(form.end),
          },
        });
        if (error) {
          throw error;
        }
      }}
      submitActionName="Create Event"
    />
  );
}
