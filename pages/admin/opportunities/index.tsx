import { Button } from '@mui/material';
import LoadingComponent from 'components/LoadingComponent';
import AdminOnlyComponent from 'components/admin/AdminOnly';
import { OfficerStatusContext } from 'components/context/OfficerStatus';
import ApplicationCard from 'components/typeformApplicationSystem/ApplicationCard';
import { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { useQuery } from 'react-query';
import { gqlQueries } from 'src/api';

const ViewApplicationsPage: NextPage = () => {
  const router = useRouter();
  const isOfficer = useContext(OfficerStatusContext);
  const { id } = router.query;
  const { status } = useSession({ required: true });
  const { data, isLoading, error } = useQuery(
    ['viewAllApps'],
    () => gqlQueries.getApplicationAdminPageData(),
    { enabled: status === 'authenticated' },
  );

  if (!isOfficer) {
    return <AdminOnlyComponent />;
  }

  if (isLoading) {
    return <LoadingComponent />;
  }

  if (!data || !data.returnAllOpenApp) {
    return <div>No application exists</div>;
  }
  const array = [];
  for (let i = 0; i < 20; i++) {
    array.push(
      <div className="flex items-center justify-between pt-4">
        <div>
          <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
          <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
        </div>
        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
      </div>,
    );
  }

  return (
    <div className="w-full p-20">
      <div className="w-full grid place-items-center">
        <div className="flex flex-col p-10 place-items-center">
          <div className="text-4xl font-semibold text-gray-100">Administrate Applications</div>
        </div>
        <div className="w-full">
          {!isLoading ? (
            data.returnAllOpenApp
              .filter((app) => data.me.profile!.officer!.divisionIds.includes(app.division.id))
              .map((application) => (
                <div className="mb-10">
                  <ApplicationCard
                    title={application.name}
                    description={application.description}
                    division={application.division.deptName}
                    key={application.id}
                    buttons={[
                      <Link href={`/admin/opportunities/${application.id}`}>
                        <Button>manage</Button>
                      </Link>,
                    ]}
                  />
                </div>
              ))
          ) : (
            <>
              <div
                role="status"
                className="w-full h-full p-4 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                    <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                  </div>
                  <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                </div>
                {array}
                <span className="sr-only">Loading...</span>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="grid grid-cols-3 gap-x-16 px-16">
        <button
          className="text-gray-100 font-semibold p-2 rounded-lg"
          onClick={(e) => {
            e.preventDefault();
            router.push('/admin');
          }}
        >
          go back to admin
        </button>
      </div>
    </div>
  );
};

export default ViewApplicationsPage;
