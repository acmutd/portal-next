import { Event } from '@prisma/client';
import { ActiveEventResult } from 'lib/types/event';

interface SingleEventViewProps {
  event: ActiveEventResult;
  onGoBack: () => void;
  onRsvp: () => void;
}

export default function SingleEventView({ event, onGoBack, onRsvp }: SingleEventViewProps) {
  return (
    <div className="flex w-screen h-full items-center text-white">
      <div className="flex flex-col gap-y-3 w-1/2 h-full my-auto p-2">
        <div className="border-2 w-30 h-30 rounded-lg p-6">
          <h1 className="text-2xl">IMAGE HERE</h1>
        </div>
        <button className="p-3 border-2 rounded-lg" onClick={() => onRsvp()}>
          rsvp
        </button>
        <button className="p-3 border-2 rounded-lg" onClick={() => onGoBack()}>
          go back
        </button>
      </div>
      <div className="flex flex-col border-2 justify-between rounded-lg w-1/2 h-full my-auto p-4">
        <h1 className="text-xl font-bold">{event.summary}</h1>
        <p className="text-md">{event.description}</p>
        <p className="text-md">{event.start}</p>
      </div>
    </div>
  );
}
