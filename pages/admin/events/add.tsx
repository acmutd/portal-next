import EventForm from 'components/events/EventForm';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { gqlQueries } from 'src/api';
import { useQuery } from 'react-query';
import ErrorComponent from 'components/ErrorComponent';
import { GraphQLError } from 'graphql/error';
import Loading from 'components/Loading_Apply';
import { OfficerStatusContext } from 'components/context/OfficerStatus';
import { useContext } from 'react';
import AdminOnlyComponent from 'components/admin/AdminOnly';

export default function AddEventPage() {
  const router = useRouter();
  const { status } = useSession({ required: true });
  const officerStatusData = useContext(OfficerStatusContext);
  const { data, isLoading, error } = useQuery(
    ['eventAddData'],
    () => gqlQueries.getEventCategories(),
    { enabled: status === 'authenticated' && officerStatusData.isOfficer },
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

  if (!officerStatusData.isOfficer) {
    return <AdminOnlyComponent />;
  }

  return (
    <EventForm
      formAction="Create"
      onGoBack={() => router.push('/admin')}
      onFormSubmit={async (form) => {
        // Remove id from form object
        const { id, category, ...rest } = form;

        await gqlQueries.createNewEvent({
          data: {
            ...rest,
            start: new Date(form.start),
            end: new Date(form.end),
            category: {
              connect: {
                id: category!.id,
              },
            },
          },
        });
        alert('Event created');
      }}
      submitActionName="Create Event"
      eventCategories={data!.eventCategories}
    />
  );
}
