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
import Fuse from 'fuse.js';

export default function AddOfficerPage() {
  // Need to get logged in user profile
  const { status, data: signedInUserData } = useSession({ required: true });
  const officerStatusData = useContext(OfficerStatusContext);
  const router = useRouter();
  const { data, error, isLoading } = useQuery(
    ['addOfficerPage'],
    () => gqlQueries.getAddOfficerPageData(),
    { enabled: status === 'authenticated' && officerStatusData.isOfficer },
  );
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [profiles, setProfiles] = useState<GetAddOfficerPageDataQuery['officerEligibleProfiles']>(
    [],
  );
  let filteredProfiles = profiles;
  if (searchQuery !== '') {
    const fuse = new Fuse(profiles, {
      keys: ['firstName', 'lastName'],
    });
    const result = fuse.search(searchQuery);
    filteredProfiles = result.map((data) => data.item);
  } else {
    filteredProfiles = [];
  }

  const debouncedResults = useMemo(() => {
    return debounce((e) => setSearchQuery(e.target.value), 300);
  }, []);

  useEffect(() => {
    if (isLoading) return;
    if (data) setProfiles(data.officerEligibleProfiles);
  }, [data, isLoading]);

  useEffect(() => {
    return () => {
      debouncedResults.cancel();
    };
  });

  if (isLoading) return <LoadingComponent />;
  if (!officerStatusData.isOfficer) {
    return <AdminOnlyComponent />;
  }

  return (
    <div className="p-5">
      <h1 className="text-2xl text-white p-3">Add user to division as officer</h1>
      {/* Search Box (search by either name or netid) */}
      <input
        placeholder="Start off by looking for someone by their name or netid"
        className="bg-transparent border border-2-gray rounded-2xl w-full lg:w-3/5 text-white"
        type="text"
        onChange={debouncedResults}
      />

      {/* Data result (show all data that matches) */}
      {filteredProfiles.map((profile) => (
        <div key={profile.id} className="my-3 w-3/5">
          <MakeUserOfficerCard
            firstName={profile.firstName}
            lastName={profile.lastName}
            netid={profile.netid}
            divisions={
              data?.me.profile?.officer?.divisions.map(({ id, deptName }) => ({
                id,
                deptName,
              })) || []
            }
            profileId={profile.id}
          />
        </div>
      ))}
    </div>
  );
}
