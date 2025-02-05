import ACMCard from 'components/PortalCard';
import { EventResult } from 'lib/types/event';

interface EventCardProps {
  event: EventResult;
  onClick: () => void;
  eventActions: string[];
}

export default function EventCard({ event, onClick, eventActions }: EventCardProps) {
  return (
    <div 
      onClick={() => onClick()}
      className="w-full max-w-[400px] p-6 bg-gray-200/5 outline outline-gray-100/10 rounded-xl cursor-pointer hover:bg-gray-200/10 transition-all"
    >
      <div className="space-y-4">
        <div>
          <h1 className="text-xl font-bold text-white mb-1">{event.summary}</h1>
          <p className="text-gray-400 text-sm line-clamp-2">{event.description}</p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-white">
              {new Date(event.start).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                weekday: 'short',
              })}
            </span>
          </div>

          {event.location && (
            <div className="flex items-center gap-2 text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-white">{event.location}</span>
            </div>
          )}
        </div>

        {eventActions.length > 0 && (
          <div className="flex justify-end gap-2">
            {eventActions.map((action, idx) => (
              <span 
                key={idx} 
                className="text-xs px-3 py-1 rounded-full bg-purple-600/20 text-purple-400"
              >
                {action}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
