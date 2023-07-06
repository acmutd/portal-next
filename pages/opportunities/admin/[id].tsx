import Button from 'components/Button';
import LoadingComponent from 'components/LoadingComponent';
import { GetServerSideProps, NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { dehydrate, useQuery } from 'react-query';
import { gqlQueries, queryClient } from 'src/api';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  await queryClient.prefetchQuery(['manageSingleApp'], () =>
    gqlQueries.findFirstApplication({
      where: {
        expireDate: {
          lte: new Date(Date.now()).toISOString()
        },
      },
    }),
  );
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

const EditApplicationPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { status } = useSession({ required: true });
  const { data, isLoading, error } = useQuery(
    ['manageSingleApp'],
    () =>
      gqlQueries.findFirstApplication({
        where: {
          id: {
            equals: id! as string,
          },
        },
      }),
    { enabled: status === 'authenticated' },
  );

  if (!data!.findFirstApplication) {
    return <div>No application exists</div>;
  }

  return (
    <div className="w-full p-20">
      <div className="w-full grid place-items-center">
        <div className="flex flex-col p-10 place-items-center">
          <div className="text-4xl font-semibold text-gray-100">Applicant Manager</div>
        </div>
        {/* List of applicants */}
        <div className="w-[50%]">
          {isLoading ? (
            <LoadingComponent></LoadingComponent>
          ) : (
            <div className="text-gray-100">{data!.findFirstApplication.questions}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditApplicationPage;
