import { Button } from '@mui/material';
import ApplicationCard from 'components/typeformApplicationSystem/ApplicationCard';
import { GetServerSideProps, NextPage } from 'next';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { dehydrate, useQuery } from 'react-query';
import { gqlQueries, queryClient } from 'src/api';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  await queryClient.prefetchQuery(['viewAllApps'], () =>
    gqlQueries.fetchAllOpenApplications({
      date: new Date(Date.now()).toISOString(),
    }),
  );
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

const ViewApplicationsPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { status } = useSession({ required: true });
  const { data, isLoading, error } = useQuery(
    ['viewAllApps'],
    () => gqlQueries.fetchAllOpenApplications({ date: new Date(Date.now()).toISOString() }),
    { enabled: status === 'authenticated' },
  );

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
            data.returnAllOpenApp.map((application) => (
              <ApplicationCard
                title={application.id}
                description={application.questions.concat().join(',\n ')}
                division={application.divisionId}
                key={application.id}
                buttons={[
                  <Link href={`/opportunities/admin/${application.id}`}>
                    <Button>details</Button>
                  </Link>,
                ]}
              />
            ))
          ) : (
            <div>Loading..</div>
          )}
        </div>
      </div>
      <div className="grid grid-cols-3 gap-x-16 px-16">
        <button className="text-gray-100 font-semibold p-2 rounded-lg" onClick={router.back}>
          cancel
        </button>
      </div>
    </div>
  );
};

export default ViewApplicationsPage;
