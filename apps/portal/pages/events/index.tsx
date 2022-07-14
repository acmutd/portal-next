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
import { gql, useMutation, useQuery } from 'urql';
import { ActiveEventResult, EventResult } from '../../lib/types/event';
import EventForm from 'components/events/EventForm';
import { Event, UpdateEventArgs } from '@generated/type-graphql';

const COMPONENT_QUERY = gql`
  query {
    me {
      attendedEvents {
        summary
        start
        location
      }
      isOfficer
    }
    upcomingEvents {
      id
      summary
      start
      location
      end
      description
      url
    }
  }
`;

const UPDATE_EVENT_MUTATION = gql`
  mutation UpdateEvent($data: EventUpdateInput!, $where: EventWhereUniqueInput!) {
    updateEvent(data: $data, where: $where) {
      summary
      description
      url
      location
      start
      end
      id
    }
  }
`;

interface QueryResultType {
  me: {
    attendedEvents: EventResult[];
    isOfficer: boolean;
  };
  upcomingEvents: ActiveEventResult[];
}

export default function EventPage() {
  const [result, _] = useQuery<QueryResultType>({
    query: COMPONENT_QUERY,
  });
  const [__, updateEvent] = useMutation<Event, UpdateEventArgs>(UPDATE_EVENT_MUTATION);

  const { data: queryResult, fetching, error } = result;

  const [isEditMode, setIsEditMode] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<ActiveEventResult | null>(null);

  if (fetching) return <p>Loading...</p>;
  if (error) {
    console.log(error);
    return <p>Whoops... {error.message}</p>;
  }

  const { me, upcomingEvents } = queryResult;

  if (currentEvent) {
    return isEditMode ? (
      <EventForm
        formAction="Edit"
        onGoBack={() => setCurrentEvent(null)}
        onFormSubmit={async (form) => {
          await updateEvent({
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
        onRsvp={() => {}}
        event={currentEvent}
      />
    );
  }

  return (
    <div className="w-full">
      <EventHeader />
      <div className="flex flex-col gap-y-5">
        <EventSection
          sectionName="featured events"
          events={upcomingEvents}
          onEventSelected={(eventIndex) => setCurrentEvent(upcomingEvents[eventIndex])}
          allowedActions={['rsvp']}
          allowCreateEventAction={me.isOfficer}
        />
        <EventSection
          sectionName="attended events"
          events={me.attendedEvents}
          allowedActions={[]}
          allowCreateEventAction={false}
        />
      </div>
    </div>
  );
}
