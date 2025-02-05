// pages/admin/AddOfficerPage.tsx
import LoadingComponent from 'components/LoadingComponent';
import { GetAddOfficerPageDataQuery } from 'lib/generated/graphql';
import { useSession } from 'next-auth/react';
import { useContext, useEffect, useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import { gqlQueries } from 'src/api';
import debounce from 'lodash.debounce';
import MakeUserOfficerCard from 'components/admin/MakeUserOfficerCard';
import { OfficerStatusContext } from 'components/context/OfficerStatus';
import { useRouter } from 'next/router';
import AdminOnlyComponent from 'components/admin/AdminOnly';

export default function AddOfficerPage() {
  const { status } = useSession({ required: true });
  const officerStatusData = useContext(OfficerStatusContext);
  const router = useRouter();

  // Query to fetch eligible profiles (those that can become officers)
  const { data, isLoading } = useQuery(
    ['addOfficerPage'],
    () => gqlQueries.getAddOfficerPageData(),
    { enabled: status === 'authenticated' && officerStatusData.isOfficer }
  );

  // Query to fetch all available divisions
  const { data: divisionsData, isLoading: isDivisionsLoading } = useQuery(
    ['divisions'],
    () => gqlQueries.getDivisionData(),
    { enabled: status === 'authenticated' }
  );

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [profiles, setProfiles] = useState<GetAddOfficerPageDataQuery['officerEligibleProfiles']>([]);

  // Use substring search (case-insensitive)
  const lowerSearch = searchQuery.toLowerCase();
  const filteredProfiles =
    searchQuery === ''
      ? profiles
      : profiles.filter((profile) =>
          profile.netid.toLowerCase().includes(lowerSearch) ||
          (`${profile.firstName} ${profile.lastName}`).toLowerCase().includes(lowerSearch)
        );

  const debouncedResults = useMemo(
    () => debounce((e) => setSearchQuery(e.target.value), 300),
    []
  );

  useEffect(() => {
    if (!isLoading && data) {
      setProfiles(data.officerEligibleProfiles);
    }
  }, [data, isLoading]);

  useEffect(() => {
    return () => {
      debouncedResults.cancel();
    };
  }, [debouncedResults]);

  if (isLoading || isDivisionsLoading) return <LoadingComponent />;
  if (!officerStatusData.isOfficer) {
    return <AdminOnlyComponent />;
  }

  return (
    <div className="p-5">
      <h1 className="text-2xl text-white p-3">Make a User an Officer</h1>
      <input
        placeholder="Search by name or netid"
        className="bg-transparent border border-2-gray rounded-2xl w-full lg:w-3/5 text-white"
        type="text"
        onChange={debouncedResults}
      />
      {filteredProfiles.map((profile) => (
        <div key={profile.id} className="my-3 w-3/5">
          <MakeUserOfficerCard
            firstName={profile.firstName}
            lastName={profile.lastName}
            netid={profile.netid}
            availableDivisions={divisionsData?.divisions || []} // Pass the full list of divisions
            profileId={profile.id}
          />
        </div>
      ))}
    </div>
  );
}