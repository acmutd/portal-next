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
import Loading from 'components/Loading_Events';
import EventCard from 'components/events/EventCard';
import AddEventCard from 'components/events/AddEventCard';

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
    <div className="min-h-screen w-full p-8">
      <div className="max-w-7xl mx-auto">
        <EventHeader
          isInEditMode={false}
          isOfficer={data!.me.isOfficer}
        />
        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-bold text-white mb-6">Upcoming Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data!.upcomingEvents.map((event, index) => (
                <EventCard
                  key={event.id}
                  event={event}
                  onClick={() => setCurrentEvent(data!.upcomingEvents[index])}
                  eventActions={['click to view details']}
                />
              ))}
              {data!.me.isOfficer && (
                <AddEventCard />
              )}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-6">Attended Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data!.me.attendedEvents.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  onClick={() => {}}
                  eventActions={[]}
                />
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
