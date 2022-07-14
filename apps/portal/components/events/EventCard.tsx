import { EventResult } from 'lib/types/event';

interface EventCardProps {
  event: EventResult;
  onClick: () => void;
  eventActions: string[];
}

export default function EventCard({ event, onClick, eventActions }: EventCardProps) {
  return (
    <div className="flex flex-col p-2 border-2 rounded-lg cursor-pointer" onClick={() => onClick()}>
      <div className="rounded-lg w-20 h-20 border-2 p-3 my-3">
        <h1 className="text-center text-xl">IMAGE HERE</h1>
      </div>
      <div className="my-4">
        <h1 className="text-md">{event.summary}</h1>
        <h1 className="text-md">{event.start}</h1>
        <h1 className="text-md">{event.location}</h1>
      </div>
      <div className="flex justify-end">
        {eventActions.map((action, idx) => (
          <button key={idx} className="rounded-lg border-2 p-3">
            {action}
          </button>
        ))}
      </div>
    </div>
  );
}
