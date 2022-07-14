import { useRouter } from 'next/router';

export default function AddEventCard() {
  const router = useRouter();
  return (
    <div
      className="p-5 border-2 rounded-lg cursor-pointer"
      onClick={() => router.push('/events/add')}
    >
      <h1 className="text-2xl text-center my-auto">Add Event</h1>
    </div>
  );
}
