import { ActiveEventResult } from 'lib/types/event';
import Link from 'next/link';

interface SingleEventViewProps {
  event: ActiveEventResult;
  isOfficer: boolean;
  onGoBack: () => void;
}

export default function SingleEventView({ event, isOfficer, onGoBack }: SingleEventViewProps) {
  const checkInLink = `${window.location.origin}/checkin/${event.id}`;

  return (
    <div className="min-h-screen w-full p-8">
      <div className="max-w-3xl mx-auto">
        {/* Back Button */}
        <button 
          onClick={onGoBack}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6 group"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5 transform group-hover:-translate-x-1 transition-transform" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span>Back to Events</span>
        </button>

        {/* Event Details Card */}
        <div className="bg-gray-200/5 outline outline-gray-100/10 rounded-xl p-8">
          <div className="space-y-6">
            {/* Event Title */}
            <h1 className="text-3xl font-bold text-white">{event.summary}</h1>

            {/* Date and Location */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>
                  {new Date(event.start).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              </div>
              {event.location && (
                <div className="flex items-center gap-3 text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>{event.location}</span>
                </div>
              )}
            </div>

            {/* Description */}
            <div className="py-4 border-t border-gray-100/10">
              <p className="text-gray-300 whitespace-pre-wrap">{event.description}</p>
            </div>

            {/* Officer Actions */}
            {isOfficer && (
              <div className="space-y-4 pt-4 border-t border-gray-100/10">
                <h3 className="text-lg font-semibold text-white">Officer Actions</h3>
                <div className="flex flex-col gap-3">
                  <Link href={checkInLink}>
                    <div className="text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                      Check-in Link
                    </div>
                  </Link>
                  <Link href={`/admin/events/${event.id}/qrcode`}>
                    <div className="text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2m0 0H8m4 0h4m-4-8a3 3 0 100 6 3 3 0 000-6z" />
                      </svg>
                      View QR Code
                    </div>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
