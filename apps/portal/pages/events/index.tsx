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
import { Event, UpdateOneEventArgs, DeleteOneEventArgs } from '@generated/type-graphql';
import { useSession } from 'next-auth/react';

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
      isPublic
    }
  }
`;

const UPDATE_EVENT_MUTATION = gql`
  mutation UpdateOneEvent($data: EventUpdateInput!, $where: EventWhereUniqueInput!) {
    updateOneEvent(data: $data, where: $where) {
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

const DELETE_EVENT_MUTATION = gql`
  mutation DeleteOneEvent($where: EventWhereUniqueInput!) {
    deleteOneEvent(where: $where) {
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
  const { data: session, status } = useSession({ required: true });
  const [{ data: queryResult, fetching, error }, _] = useQuery<QueryResultType>({
    query: COMPONENT_QUERY,
  });
  const [__, updateEvent] = useMutation<
    {
      updateOneEvent: Event;
    },
    UpdateOneEventArgs
  >(UPDATE_EVENT_MUTATION);
  const [__2, deleteEvent] = useMutation<
    {
      deleteOneEvent: Event;
    },
    DeleteOneEventArgs
  >(DELETE_EVENT_MUTATION);

  const [isEditMode, setIsEditMode] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<ActiveEventResult | null>(null);

  if (fetching || status == 'loading') return <p className="text-gray-100">loading...</p>;
  if (error) {
    console.log(error);
    return <p className="text-white">Whoops... {error.message}</p>;
  }

  const { me, upcomingEvents } = queryResult!;

  if (currentEvent) {
    return isEditMode ? (
      <EventForm
        formAction="Edit"
        onGoBack={() => setCurrentEvent(null)}
        onDeleteEvent={() => {
          deleteEvent({ where: { id: currentEvent.id } });
          setCurrentEvent(null);
        }}
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
        isOfficer={me.isOfficer}
      />
    );
  }

  return (
    <div className="w-full text-white p-4">
      <EventHeader
        isInEditMode={isEditMode}
        isOfficer={me.isOfficer}
        toggleEdit={() => {
          setIsEditMode(!isEditMode);
        }}
      />
      <div className="flex flex-col gap-y-5">
        <EventSection
          sectionName="upcoming events"
          events={upcomingEvents}
          onEventSelected={(eventIndex) => setCurrentEvent(upcomingEvents[eventIndex])}
          allowedActions={isEditMode ? ['click to edit'] : ['click to view details']}
          allowCreateEventAction={me.isOfficer}
          isEditMode={isEditMode}
        />
        <EventSection
          sectionName="attended events"
          events={me.attendedEvents}
          allowedActions={[]}
          allowCreateEventAction={false}
          isEditMode={false}
        />
      </div>
    </div>
  );
}
