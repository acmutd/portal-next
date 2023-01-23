import { Event } from '@prisma/client';
import { ActiveEventResult } from 'lib/types/event';
import Link from 'next/link';

interface SingleEventViewProps {
  event: ActiveEventResult;
  isOfficer: boolean;
  onGoBack: () => void;
  onRsvp: () => void;
}

export default function SingleEventView({
  event,
  isOfficer,
  onGoBack,
  onRsvp,
}: SingleEventViewProps) {
  const checkInLink = `${window.location.origin}/checkin/${event.id}`;

  return (
    <div className="flex flex-col w-full h-full items-center text-white p-4">
      <div className="flex flex-col border-2 justify-between rounded-lg w-full lg:w-1/2 h-full my-auto p-4">
        <h1 className="text-xl font-bold">{event.summary}</h1>
        <p className="text-md my-6">{event.description}</p>
        <p className="text-md">{event.start}</p>
        {isOfficer && (
          <Link
            className="whitespace-nowrap"
            href={checkInLink}
          >{`check in link: ${checkInLink}`}</Link>
        )}

        <Link className="whitespace-nowrap" href={`/events/${event.id}/qrcode`}>
          {'Click to view QR Code'}
        </Link>
      </div>
      <div className="flex flex-col gap-y-3 w-full lg:w-1/2 h-full my-auto p-2">
        <button className="p-3 border-2 rounded-lg" onClick={() => onGoBack()}>
          go back
        </button>
      </div>
    </div>
  );
}
