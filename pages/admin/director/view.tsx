import ErrorComponent from 'components/ErrorComponent';
import Loading from 'components/Loading_Apply';
import AdminOnlyComponent from 'components/admin/AdminOnly';
import { OfficerStatusContext } from 'components/context/OfficerStatus';
import { GraphQLError } from 'graphql';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { useQuery } from 'react-query';
import { gqlQueries } from 'src/api';
import Button from 'components/Button';
import DirectorRemovalDialog from 'components/admin/director/manage/DirectorRemovalDialog';

export default function ViewDirectorsPage() {
  const { status } = useSession({ required: true });
  const router = useRouter();
  const officerData = useContext(OfficerStatusContext);

  const isDevDirectorOrExecutive =
    officerData.directorOfDivisions.includes('Development') ||
    officerData.directorOfDivisions.includes('Executive');

  console.log('Is Dev Director or Executive:', isDevDirectorOrExecutive);

  const { data, isLoading, error } = useQuery(
    ['directorData'],
    () => gqlQueries.getDirectorManagementPageInfo(),
    { enabled: status === 'authenticated' && officerData.isDirector },
  );

  const removeDirectorHandler = async (directorId: string) => {
    if (!isDevDirectorOrExecutive) {
      alert('Only Development or Executive directors can remove directors');
      return;
    }
    
    try {
      await gqlQueries.deleteDirector({
        where: {
          id: directorId,
        },
      });
      alert('Successfully removed director');
      // Refresh the page data
      router.reload();
    } catch (error) {
      console.error(error);
      alert('Error removing director. Please try again later...');
    }
  };

  if (!officerData.isDirector) return <AdminOnlyComponent />;
  if (isLoading || status === 'loading' || !data) return <Loading />;

  if (error) {
    console.error(error);
    return (
      <ErrorComponent
        errorCode={(error as GraphQLError).extensions.code as string}
        errorMessage={(error as GraphQLError).message}
      />
    );
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
        <h1 className="text-3xl text-white p-3">Current Directors</h1>
        <Button onClick={() => router.push('/admin/director/add')} className="ml-auto">
          Add New Director
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.directors.map((director) => (
          <div
            key={director.id}
            className="p-6 rounded-xl bg-gray-200/5 outline outline-gray-100/10"
          >
            <div className="flex justify-between items-start mb-2">
              <h2 className="text-xl text-white font-bold">
                {director.officer?.profile.firstName} {director.officer?.profile.lastName}
              </h2>
              {isDevDirectorOrExecutive && (
                <DirectorRemovalDialog
                  onDeleteConfirmed={async () => {
                    await removeDirectorHandler(director.id);
                  }}
                />
              )}
            </div>
            <div className="text-white/80">
              <h3 className="font-semibold mb-1">Divisions:</h3>
              <ul className="list-disc list-inside">
                {director.divisions.map((division) => (
                  <li key={division.deptName}>{division.deptName}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
