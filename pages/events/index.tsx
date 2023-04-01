/**
 * Event page
 *
 * Route: /events
 *
 */

import EventHeader from 'components/events/EventHeader';
import EventSection from 'components/events/EventSection';
import { useState } from 'react';
import SingleEventView from 'components/events/SingleEventView';
import EventForm from 'components/events/EventForm';
import { useSession } from 'next-auth/react';
import { GetServerSideProps } from 'next';
import { gqlQueries, queryClient } from 'src/api';
import { dehydrate, useQuery } from 'react-query';
import { GetEventPageUserInfoQuery } from 'lib/generated/graphql';
import ErrorComponent from 'components/ErrorComponent';
import { GraphQLError } from 'graphql/error';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  await queryClient.prefetchQuery(['eventsData'], () => gqlQueries.getEventPageUserInfo());
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default function EventPage() {
  const { status } = useSession({ required: true });
  const { data, isLoading, error } = useQuery(
    ['eventsData'],
    () => gqlQueries.getEventPageUserInfo(),
    { enabled: status === 'authenticated' },
  );

  const [isEditMode, setIsEditMode] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<
    GetEventPageUserInfoQuery['upcomingEvents'][0] | null
  >(null);

  if (isLoading || status == 'loading') return <p className="text-gray-100">loading...</p>;
  if (error) {
    console.log(error);
    return <ErrorComponent errorCode={(error as GraphQLError).extensions.code as string} errorMessage={(error as GraphQLError).message}/>;
  }

  if (currentEvent) {
    return isEditMode ? (
      <EventForm
        formAction="Edit"
        onGoBack={() => setCurrentEvent(null)}
        onDeleteEvent={async () => {
          await gqlQueries.deleteEvent({ where: { id: currentEvent.id } });
          setCurrentEvent(null);
        }}
        onFormSubmit={async (form) => {
          await gqlQueries.updateEventData({
            data: {
              description: {
                set: form.description,
              },
              summary: {
                set: form.summary,
              },
              end: {
                set: new Date(form.end),
              },
              location: {
                set: form.location,
              },
              start: {
                set: new Date(form.start),
              },
              url: {
                set: form.url,
              },
            },
            where: {
              id: currentEvent.id,
            },
          });
        }}
        submitActionName="Save changes"
        event={currentEvent}
      />
    ) : (
      <SingleEventView
        onGoBack={() => setCurrentEvent(null)}
        event={currentEvent}
        isOfficer={data!.me.isOfficer}
      />
    );
  }

  return (
    <div className="w-full text-white p-4">
      <EventHeader
        isInEditMode={isEditMode}
        isOfficer={data!.me.isOfficer}
        toggleEdit={() => {
          setIsEditMode(!isEditMode);
        }}
      />
      <div className="flex flex-col gap-y-5">
        <EventSection
          sectionName="upcoming events"
          events={data!.upcomingEvents}
          onEventSelected={(eventIndex) => setCurrentEvent(data!.upcomingEvents[eventIndex])}
          allowedActions={isEditMode ? ['click to edit'] : ['click to view details']}
          allowCreateEventAction={data!.me.isOfficer}
          isEditMode={isEditMode}
        />
        <EventSection
          sectionName="attended events"
          events={data!.me.attendedEvents}
          allowedActions={[]}
          allowCreateEventAction={false}
          isEditMode={false}
        />
      </div>
    </div>
  );
}
