import { Button } from '@mui/material';
import LoadingComponent from 'components/LoadingComponent';
import ApplicationCard from 'components/typeformApplicationSystem/ApplicationCard';
import { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { gqlQueries } from 'src/api';


const ViewApplicationsPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { status } = useSession({ required: true });
  const { data, isLoading, error } = useQuery(
    ['viewAllApps'],
    () => gqlQueries.getApplicationAdminPageData(),
    { enabled: status === 'authenticated' },
  );

  if (isLoading) {
    return <LoadingComponent />;
  }

  if (!data || !data.returnAllOpenApp) {
    return <div>No application exists</div>;
  }

  return (
    <div className="w-full p-20">
      <div className="w-full grid place-items-center">
        <div className="flex flex-col p-10 place-items-center">
          <div className="text-4xl font-semibold text-gray-100">Administrate Applications</div>
        </div>
        <div className="w-full">
          {!isLoading ? (
            data.returnAllOpenApp.filter((app) => data.me.profile!.officer!.divisionIds.includes(app.division.id)).map((application) => (
              <div className="mb-10">
                <ApplicationCard
                  title={application.name}
                  description={application.description}
                  division={application.division.deptName}
                  key={application.id}
                  buttons={[
                    <Link href={`/opportunities/admin/${application.id}`}>
                      <Button>manage</Button>
                    </Link>,
                  ]}
                />
              </div>
            ))
          ) : (
            <div>Loading..</div>
          )}
        </div>
      </div>
      <div className="grid grid-cols-3 gap-x-16 px-16">
        <button className="text-gray-100 font-semibold p-2 rounded-lg" onClick={(e) => {
          e.preventDefault();
          router.push('/admin');
        }}>
          go back to admin
        </button>
      </div>
    </div>
  );
};

export default ViewApplicationsPage;
