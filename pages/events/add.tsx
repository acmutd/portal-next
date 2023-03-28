import EventForm from 'components/events/EventForm';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { GetServerSideProps } from 'next';
import { gqlQueries, queryClient } from 'src/api';
import { dehydrate, useQuery } from 'react-query';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  await queryClient.prefetchQuery(['eventAddData'], () => gqlQueries.getUserOfficerStatusData());
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default function AddEventPage() {
  const router = useRouter();
  const { status } = useSession({ required: true });
  const { data, isLoading, error } = useQuery(
    ['eventAddData'],
    () => gqlQueries.getUserOfficerStatusData(),
    { enabled: status === 'authenticated' },
  );

  if (isLoading || status == 'loading') return <p>Loading...</p>;
  if (error) {
    console.log(error);
    return <p>Whoops... {error}</p>;
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
      onGoBack={() => router.push('/events')}
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
      }}
      submitActionName="Create Event"
    />
  );
}
