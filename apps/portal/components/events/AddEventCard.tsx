import ACMCard from 'components/PortalCard';
import { useRouter } from 'next/router';

export default function AddEventCard() {
  const router = useRouter();
  return (
    <ACMCard height={150} width={300} onClick={() => router.push('/events/add')}>
      <h1 className="text-2xl my-auto mx-auto">add new</h1>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-12 h-12 my-4 mx-auto"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
      </svg>
    </ACMCard>
  );
}
