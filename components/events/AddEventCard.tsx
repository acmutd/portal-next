import { useRouter } from 'next/router';

export default function AddEventCard() {
  const router = useRouter();
  return (
    <div 
      onClick={() => router.push('/admin/events/add')}
      className="w-full max-w-[400px] p-6 bg-gray-200/5 outline outline-gray-100/10 rounded-xl cursor-pointer hover:bg-gray-200/10 transition-all flex flex-col justify-center items-center"
    >
      <div className="space-y-4 text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-12 h-12 text-purple-400 mx-auto"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
        <div>
          <h1 className="text-xl font-bold text-white">Create New Event</h1>
          <p className="text-gray-400 text-sm mt-1">Click to add a new event</p>
        </div>
      </div>
    </div>
  );
}
