import EventForm from 'components/events/EventForm';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { gqlQueries } from 'src/api';
import { useQuery } from 'react-query';
import ErrorComponent from 'components/ErrorComponent';
import { GraphQLError } from 'graphql/error';
import Loading from 'components/Loading';

export default function AddEventPage() {
  const router = useRouter();
  const { status } = useSession({ required: true });
  const { data, isLoading, error } = useQuery(
    ['eventAddData'],
    () => gqlQueries.getUserOfficerStatusData(),
    { enabled: status === 'authenticated' },
  );

  if (isLoading || status == 'loading') return <Loading />;
  if (error) {
    console.log(error);
    return (
      <ErrorComponent
        errorCode={(error as GraphQLError).extensions.code as string}
        errorMessage={(error as GraphQLError).message}
      />
    );
  }

  if (!data?.me.isOfficer) {
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
      onGoBack={() => router.push('/admin')}
      onFormSubmit={async (form) => {
        // Remove id from form object
        const { id, ...rest } = form;

        await gqlQueries.createNewEvent({
          data: {
            ...rest,
            start: new Date(form.start),
            end: new Date(form.end),
          },
        });
        alert('Event created');
      }}
      submitActionName="Create Event"
    />
  );
}
