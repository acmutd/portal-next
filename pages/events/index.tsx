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
import { gqlQueries } from 'src/api';
import { useQuery } from 'react-query';
import { GetEventPageUserInfoQuery } from 'lib/generated/graphql';
import ErrorComponent from 'components/ErrorComponent';
import { GraphQLError } from 'graphql/error';

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
              isPublic: {
                set: form.isPublic,
              },
            },
            where: {
              id: currentEvent.id,
            },
          });
          alert('event updated');
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
