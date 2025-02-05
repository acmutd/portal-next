import ErrorComponent from 'components/ErrorComponent';
import Loading from 'components/Loading_Apply';
import AdminOnlyComponent from 'components/admin/AdminOnly';
import EventListView from 'components/admin/events/EventListView';
import EventParticipantListView from 'components/admin/events/EventParticipantListView';
import { OfficerStatusContext } from 'components/context/OfficerStatus';
import { GraphQLError } from 'graphql';
import { GetAttendanceInfoQuery } from 'lib/generated/graphql';
import { useSession } from 'next-auth/react';
import { useContext, useEffect, useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import { gqlQueries } from 'src/api';
import StatsPageTitle from 'components/admin/events/StatsPageTitle';
import { useRouter } from 'next/router';
import EventSummaryView from 'components/admin/events/EventSummaryView';
import debounce from 'lodash.debounce';
import Fuse from 'fuse.js';

export default function EventStatsPage() {
  const { status } = useSession({ required: true });
  const router = useRouter();
  const officerData = useContext(OfficerStatusContext);
  const { data, isLoading, error } = useQuery(
    ['attendanceData'],
    () => gqlQueries.getAttendanceInfo(),
    {
      enabled: status === 'authenticated' && officerData.isDirector,
    },
  );
  const [currentEvent, setCurrentEvent] = useState<GetAttendanceInfoQuery['events'][0] | null>(
    null,
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredEvents, setFilteredEvents] = useState<
    NonNullable<GetAttendanceInfoQuery['events']>
  >([]);

  const debounceSearchQuery = useMemo(() => {
    return debounce((e) => setSearchQuery(e.target.value), 300);
  }, []);

  useEffect(() => {
    if (searchQuery === '') {
      setFilteredEvents(data?.events || []);
    } else {
      const fuse = new Fuse(data!.events!, {
        keys: ['summary'],
      });
      const result = fuse.search(searchQuery);
      setFilteredEvents(result.map((data) => data.item));
    }
  }, [searchQuery]);

  useEffect(() => {
    if (isLoading) return;
    setFilteredEvents(data!.events);
  }, [data, isLoading]);

  useEffect(() => {
    return () => {
      debounceSearchQuery.cancel();
    };
  });

  if (!officerData.isDirector) return <AdminOnlyComponent />;
  if (isLoading || status === 'loading') return <Loading />;
  if (error) {
    console.error(error);
    return (
      <ErrorComponent
        errorCode={(error as GraphQLError).extensions.code as string}
        errorMessage={(error as GraphQLError).message}
      />
    );
  }

  return (
    <div className="p-5 flex flex-col gap-y-4">
      <StatsPageTitle handleGoBack={() => router.push('/admin')} />
      <div className="grid grid-cols-4 grid-rows-7 gap-4 h-[700px]">
        <div className="col-start-1 row-start-1 row-span-7 col-span-1">
          <EventListView
            onChangeSearchQuery={debounceSearchQuery}
            events={filteredEvents.sort(
              (a, b) => new Date(b.start).getTime() - new Date(a.start).getTime(),
            )}
            onEventClick={(e) => setCurrentEvent(e)}
          />
        </div>
        {currentEvent !== null && (
          <div className="col-start-2 row-start-1 row-span-1 col-span-3">
            <EventSummaryView currentEvent={currentEvent} />
          </div>
        )}
        <div
          className={`col-start-2 ${
            currentEvent === null ? 'row-start-1 row-span-7' : 'row-start-2 row-span-6'
          } col-span-3`}
        >
          <EventParticipantListView currentEvent={currentEvent} />
        </div>
      </div>
    </div>
  );
}
