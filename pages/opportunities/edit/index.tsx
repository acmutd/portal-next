import Button from 'components/Button';
import AddNewApplicationCard from 'components/typeformApplicationSystem/AddNewApplicationCard';
import ApplicationCard from 'components/typeformApplicationSystem/ApplicationCard';
import { GetServerSideProps, NextPage } from 'next';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useQuery } from 'react-query';
import CircularBlur from '../../../components/CircularBlur';
import { gqlQueries, queryClient } from 'src/api';
import { dehydrate } from 'react-query';
import ErrorComponent from 'components/ErrorComponent';
import { GraphQLError } from 'graphql/error';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  await queryClient.prefetchQuery('editAppData', () =>
    gqlQueries.getEditViewApplicationList({
      where: {
        active: {
          equals: true,
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

const ApplicationsEditPage: NextPage = () => {
  const { status } = useSession({ required: true });
  const { data, isLoading, error } = useQuery(
    ['editAppData'],
    () =>
      gqlQueries.getEditViewApplicationList({
        where: {
          active: {
            equals: true,
          },
        },
      }),
    {
      enabled: status === 'authenticated',
    },
  );
  if (isLoading || status == 'loading') return <p className="text-gray-100">loading...</p>;
  if (error) return <ErrorComponent errorCode={(error as GraphQLError).extensions.code as string} errorMessage={(error as GraphQLError).message}/>;

  return (
    <div className="px-16 py-[65px] relative">
      <CircularBlur backgroundColor="rgba(129, 53, 218, 1)" top="20%" left="10%" />
      <CircularBlur backgroundColor="#daa635" bottom="20%" right="15%" />
      <header className="flex items-center justify-center relative mb-[30px]">
        <h1 className="text-[48px] font-Gilroy text-white font-semibold">applications</h1>
        <Link href="/opportunities">
          <Button className="absolute right-0">save</Button>
        </Link>
      </header>
      <div className="w-full flex flex-wrap gap-[30px]">
        <Link href="/opportunities/create">
          <AddNewApplicationCard />
        </Link>
        {data!.typeformApplications.map(
          ({ id, typeformName, description, typeformId, division }) => (
            <ApplicationCard
              title={typeformName}
              description={description}
              buttons={[
                <Link href={`/opportunities/edit/${id}`}>
                  <Button>edit</Button>
                </Link>,
              ]}
              division={division}
            />
          ),
        )}
      </div>
    </div>
  );
};

export default ApplicationsEditPage;
