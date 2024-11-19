import Loading from 'components/Loading';
import AdminOnlyComponent from 'components/admin/AdminOnly';
import MakeUserParticipantCard from 'components/admin/participants/add/MakeUserParticipantCard';
import { OfficerStatusContext } from 'components/context/OfficerStatus';
import { GetAddParticipantPageDataQuery } from 'lib/generated/graphql';
import debounce from 'lodash.debounce';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useContext, useEffect, useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import { gqlQueries } from 'src/api';

export default function AddParticipant() {
  const { status } = useSession({ required: true });
  const officerStatusData = useContext(OfficerStatusContext);
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const { data, error, isLoading } = useQuery(['addParticipantPage'], () =>
    gqlQueries.getAddParticipantPageData(),
  );
  const [filteredProfiles, setFilteredProfiles] = useState<
    GetAddParticipantPageDataQuery['profiles']
  >([]);

  const debouncedResults = useMemo(() => {
    return debounce((e) => setSearchQuery(e.target.value), 300);
  }, []);

  useEffect(() => {
    return () => {
      debouncedResults.cancel();
    };
  });

  useEffect(() => {
    if (searchQuery !== '') {
      setFilteredProfiles(
        (data?.profiles || []).filter(
          (profile) =>
            profile.netid.toLowerCase() === searchQuery.toLowerCase() ||
            `${profile.firstName} ${profile.lastName}`.toLowerCase() ===
              searchQuery.toLowerCase() ||
            profile.firstName.toLowerCase() === searchQuery.toLowerCase() ||
            profile.lastName.toLowerCase() === searchQuery.toLowerCase(),
        ),
      );
    } else {
      setFilteredProfiles([]);
    }
  }, [searchQuery]);

  if (isLoading || status === 'loading') return <Loading />;
  if (!officerStatusData.isDirector) {
    return <AdminOnlyComponent />;
  }

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
        <h1 className="text-3xl text-white p-3">Add Participant</h1>
      </div>
      <input
        placeholder="Start off by looking for someone by their name or netid"
        className="bg-transparent border border-2-gray rounded-2xl w-full lg:w-3/5 text-white"
        type="text"
        onChange={debouncedResults}
      />
      {filteredProfiles.map((profile) => (
        <div key={profile.id} className="my-3 w-3/5">
          <MakeUserParticipantCard
            divisions={data!.me!.profile!.officer!.divisions}
            firstName={profile.firstName}
            lastName={profile.lastName}
            netid={profile.netid}
            profileId={profile.id}
          />
        </div>
      ))}
    </div>
  );
}
