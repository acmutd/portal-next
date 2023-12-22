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
import Loading from 'components/Loading';

export default function EventPage() {
  const { status } = useSession({ required: true });
  const { data, isLoading, error } = useQuery(
    ['eventsData'],
    () => gqlQueries.getEventPageUserInfo(),
    { enabled: status === 'authenticated' },
  );

  const [currentEvent, setCurrentEvent] = useState<
    GetEventPageUserInfoQuery['upcomingEvents'][0] | null
  >(null);

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

  if (currentEvent) {
    return <SingleEventView
        onGoBack={() => setCurrentEvent(null)}
        event={currentEvent}
        isOfficer={data!.me.isOfficer}
    />;
  }

  return (
    <div className="w-full text-white p-4">
      <EventHeader
        isInEditMode={false}
        isOfficer={data!.me.isOfficer}
      />
      <div className="flex flex-col gap-y-5">
        <EventSection
          sectionName="upcoming events"
          events={data!.upcomingEvents}
          onEventSelected={(eventIndex) => setCurrentEvent(data!.upcomingEvents[eventIndex])}
          allowedActions={['click to view details']}
          allowCreateEventAction={data!.me.isOfficer}
          isEditMode={false}
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
