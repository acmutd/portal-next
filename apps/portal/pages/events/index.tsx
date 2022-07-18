/**
 * Event page
 *
 * Route: /events
 *
 */

import Link from 'next/link';
import { ACMCard } from 'packages/acm-ui';
import { useQuery } from 'urql';
export default function EventPage() {
  const GET_EVENTS = `
  query Query {
  events {
    id
    summary
    description
    url
    location
    start
    end
  }
}
  `;

  const [result, reexecuteQuery] = useQuery({
    query: GET_EVENTS,
  });

  const { data, fetching, error } = result;

  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Whoops... {error.message}</p>;

  return (
    <>
      <div>Event Page</div>
      {data.events.map((event) => (
        <Link key={event.id} href={`events/${event.id}`}>
          <p>{JSON.stringify(event)}</p>
        </Link>
      ))}
      <ACMCard height={200} width={300}>
        child
      </ACMCard>
    </>
  );
}
