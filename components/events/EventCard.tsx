import ACMCard from 'components/PortalCard';
import { EventResult } from 'lib/types/event';

interface EventCardProps {
  event: EventResult;
  onClick: () => void;
  eventActions: string[];
}

export default function EventCard({ event, onClick, eventActions }: EventCardProps) {
  return (
    <ACMCard height={150} width={300} onClick={() => onClick()}>
      {/* <div className="rounded-lg w-20 h-20 border-2 p-3 my-3">
        <h1 className="text-center text-xl">IMAGE HERE</h1>
      </div> */}
      <div>
        <h1 className="text-l font-bold ">{event.summary}</h1>
        <h1 className="text-md">
          {new Date(event.start).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            weekday: 'short',
          })}
        </h1>
        <h1 className="text-md">{event.location}</h1>
      </div>
      <div className="flex justify-end">
        {eventActions.map((action, idx) => (
          <button key={idx} className="rounded-lg  border-zinc-500 p-3">
            {action}
          </button>
        ))}
      </div>
    </ACMCard>
  );
}
