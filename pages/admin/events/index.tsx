import ErrorComponent from 'components/ErrorComponent';
import Loading from 'components/Loading_Apply';
import { OfficerStatusContext } from 'components/context/OfficerStatus';
import { GraphQLError } from 'graphql';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import Button from 'components/Button';

export default function EventsManagementPage() {
  const { status } = useSession({ required: true });
  const router = useRouter();
  const officerData = useContext(OfficerStatusContext);

  return (
    <div className="p-5">
      <div className="flex gap-x-2 items-center mb-6">
        <div className="cursor-pointer" onClick={() => router.push('/admin')}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="white"
            className="size-8"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
        </div>
        <h1 className="text-3xl text-white p-3">ACM Events</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="p-6 rounded-xl bg-gray-200/5 outline outline-gray-100/10">
          <h2 className="text-xl text-white font-bold mb-4">Create Event</h2>
          <p className="text-white/80 mb-4">Create a new event for your division(s)</p>
          <Button onClick={() => router.push('/admin/events/add')} className="w-full">
            Create Event
          </Button>
        </div>

        <div className="p-6 rounded-xl bg-gray-200/5 outline outline-gray-100/10">
          <h2 className="text-xl text-white font-bold mb-4">Edit Events</h2>
          <p className="text-white/80 mb-4">Modify details of existing events</p>
          <Button onClick={() => router.push('/admin/events/edit')} className="w-full">
            Edit Events
          </Button>
        </div>

        {officerData.isDirector && (
          <div className="p-6 rounded-xl bg-gray-200/5 outline outline-gray-100/10">
            <h2 className="text-xl text-white font-bold mb-4">Event Statistics</h2>
            <p className="text-white/80 mb-4">View participation metrics and analytics</p>
            <Button onClick={() => router.push('/admin/events/stats')} className="w-full">
              View Statistics
            </Button>
          </div>
        )}
      </div>
    </div>
  );
} 