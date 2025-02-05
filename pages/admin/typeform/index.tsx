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
import { OfficerStatusContext } from 'components/context/OfficerStatus';
import { useContext } from 'react';
import AdminOnlyComponent from 'components/admin/AdminOnly';
import Loading from 'components/Loading_Apply';

const ApplicationsEditPage: NextPage = () => {
  const { status } = useSession({ required: true });
  const isOfficer = useContext(OfficerStatusContext);

  const { data, isLoading, error } = useQuery(
    ['editAppData'],
    () => gqlQueries.getEditViewApplicationList({
      where: {
        active: {
          equals: true
        }
      }
    }),
    {
      enabled: status === 'authenticated',
      retry: false,
      refetchOnWindowFocus: true
    },
  );

  if (status === 'loading' || isLoading) return <Loading />;
  if (!isOfficer) return <AdminOnlyComponent />;
  if (error) {
    return (
      <ErrorComponent
        errorCode={(error instanceof GraphQLError ? error.extensions?.code?.toString() : 'UNKNOWN_ERROR')}
        errorMessage={error instanceof Error ? error.message : 'An unknown error occurred'}
      />
    );
  }
  if (!data) return null;

  return (
    <div className="min-h-screen w-full p-8">
      <div className="max-w-7xl mx-auto relative">
        <CircularBlur backgroundColor="rgba(129, 53, 218, 1)" top="20%" left="10%" />
        <CircularBlur backgroundColor="#daa635" bottom="20%" right="15%" />

        {/* Header */}
        <div className="flex items-center justify-between mb-8 relative z-10">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="group">
              <div className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 transform group-hover:-translate-x-1 transition-transform"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
                <span>Back to Admin</span>
              </div>
            </Link>
            <h1 className="text-3xl font-bold text-white">Applications</h1>
          </div>
        </div>

        {/* Applications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
          <Link href="/admin/typeform/create">
            <AddNewApplicationCard />
          </Link>
          
          {data.typeformApplications.map(({ id, typeformName, description, typeformId, division }) => (
            <ApplicationCard
              key={id}
              title={typeformName}
              description={description}
              buttons={[
                <Link key="edit" href={`/admin/typeform/${id}`}>
                  <Button className="w-full">Edit Application</Button>
                </Link>,
              ]}
              division={division}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ApplicationsEditPage;
