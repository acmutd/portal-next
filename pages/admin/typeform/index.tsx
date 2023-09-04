import Button from 'components/Button';
import AddNewApplicationCard from 'components/typeformApplicationSystem/AddNewApplicationCard';
import ApplicationCard from 'components/typeformApplicationSystem/ApplicationCard';
import { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useQuery } from 'react-query';
import CircularBlur from '../../../components/CircularBlur';
import { gqlQueries } from 'src/api';
import ErrorComponent from 'components/ErrorComponent';
import { GraphQLError } from 'graphql/error';

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
        <Link href="/admin" passHref>
          <button className="absolute left-0 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
            <p className="text-white text-lg">click to go back</p>
          </button>
        </Link>
        <h1 className="text-[48px] font-Gilroy text-white font-semibold">applications</h1>
      </header>
      <div className="w-full flex flex-wrap gap-[30px]">
        <Link href="/admin/typeform/create">
          <AddNewApplicationCard />
        </Link>
        {data!.typeformApplications.map(
          ({ id, typeformName, description, typeformId, division }) => (
            <ApplicationCard
              title={typeformName}
              description={description}
              buttons={[
                <Link href={`/admin/typeform/${id}`}>
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
