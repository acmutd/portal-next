/**
 * Event page
 *
 * Route: /events
 *
 */

import EventHeader from 'components/events/EventHeader';
import EventSection from 'components/events/EventSection';
import { useContext, useState } from 'react';
import EventForm from 'components/events/EventForm';
import { useSession } from 'next-auth/react';
import { gqlQueries } from 'src/api';
import { useQuery } from 'react-query';
import { GetAdminEventDataQuery, SortOrder } from 'lib/generated/graphql';
import ErrorComponent from 'components/ErrorComponent';
import { GraphQLError } from 'graphql/error';
import Loading from 'components/Loading';
import { OfficerStatusContext } from 'components/context/OfficerStatus';
import AdminOnlyComponent from 'components/admin/AdminOnly';

export default function EventPage() {
  const { status } = useSession({ required: true });
  const isOfficer = useContext(OfficerStatusContext);
  const { data, isLoading, error } = useQuery(
    ['adminEventsData'],
    () => gqlQueries.getAdminEventData({
      orderBy: [
        {
          end: SortOrder.Desc
        }
      ],
      take: 10
    }),
    { enabled: status === 'authenticated' },
  );

  const [currentEvent, setCurrentEvent] = useState<
    GetAdminEventDataQuery['events'][0] | null
  >(null);

  if (!isOfficer) return <AdminOnlyComponent />;

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
    return <EventForm
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
    />;
  }

  return (
    <div className="w-full text-white p-4">
      <EventHeader
        isInEditMode={true}
        isOfficer={isOfficer}
      />
      <div className="flex flex-col gap-y-5">
        <EventSection
          sectionName="recent events"
          events={data!.events}
          onEventSelected={(eventIndex) => setCurrentEvent(data!.events[eventIndex])}
          allowedActions={['click to edit']}
          allowCreateEventAction={true}
          isEditMode={true}
        />
      </div>
    </div>
  );
}
