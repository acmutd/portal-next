import EventForm from 'components/events/EventForm';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { gqlQueries } from 'src/api';
import { useQuery } from 'react-query';
import ErrorComponent from 'components/ErrorComponent';
import { GraphQLError } from 'graphql/error';

export default function AddEventPage() {
  const router = useRouter();
  const { status } = useSession({ required: true });
  const { data, isLoading, error } = useQuery(
    ['eventAddData'],
    () => gqlQueries.getUserOfficerStatusData(),
    { enabled: status === 'authenticated' },
  );

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
        alert('Event created');
      }}
      submitActionName="Create Event"
    />
  );
}
