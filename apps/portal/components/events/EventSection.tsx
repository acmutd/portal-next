import { Event } from '@prisma/client';
import { EventResult } from 'lib/types/event';
import { useSession } from 'next-auth/react';
import AddEventCard from './AddEventCard';
import EventCard from './EventCard';

interface EventSectionProps {
  sectionName: string;
  events: EventResult[];
  onEventSelected?: (eventIndex: number) => void;
  allowedActions: string[];
  allowCreateEventAction: boolean;
  isEditMode: boolean;
}

export default function EventSection({
  sectionName,
  events,
  onEventSelected,
  allowedActions,
  allowCreateEventAction,
  isEditMode,
}: EventSectionProps) {
  const eventCards =
    allowCreateEventAction && isEditMode
      ? [
          <AddEventCard />,
          ...events.map((event, eventIndex) => (
            <EventCard
              key={eventIndex}
              event={event}
              onClick={() => {
                if (onEventSelected) onEventSelected(eventIndex);
              }}
              eventActions={allowedActions}
            />
          )),
        ]
      : events.map((event, eventIndex) => (
          <EventCard
            key={eventIndex}
            event={event}
            onClick={() => {
              if (onEventSelected) onEventSelected(eventIndex);
            }}
            eventActions={allowedActions}
          />
        ));
  return (
    <div>
      <h1 className="text-lg font-bold">{sectionName}</h1>
      <div className="flex flex-col md:flex-row gap-x-3 gap-y-2 items-center">
        {eventCards.length === 0 ? (
          <div className="py-3">
            <h1>No events found! </h1>
          </div>
        ) : (
          eventCards
        )}
      </div>
    </div>
  );
}
