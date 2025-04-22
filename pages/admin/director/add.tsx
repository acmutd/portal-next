import ErrorComponent from 'components/ErrorComponent';
import Loading from 'components/Loading_Apply';
import AdminOnlyComponent from 'components/admin/AdminOnly';
import AddDirectorForm from 'components/admin/director/add/AddDirectorForm';
import PageTitle from 'components/admin/director/add/PageTitle';
import { OfficerStatusContext } from 'components/context/OfficerStatus';
import { GraphQLError } from 'graphql';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import { useQuery } from 'react-query';
import { gqlQueries } from 'src/api';

export default function AddDirectorPage() {
  const { status } = useSession({ required: true });
  const router = useRouter();
  const officerData = useContext(OfficerStatusContext);
  const isDevDirectorOrExecutive =
    officerData.directorOfDivisions.indexOf('Development') !== -1 ||
    officerData.directorOfDivisions.indexOf('Executive') !== -1;

  // Redirect non-officers from this page completely
  useEffect(() => {
    if (status === 'authenticated' && !officerData.isOfficer) {
      router.push('/dashboard');
    }
  }, [status, officerData.isOfficer, router]);

  const { data, isLoading, error } = useQuery(
    ['addDirectorPageData'],
    () => gqlQueries.getAddDirectorPageInfo(),
    {
      enabled: status === 'authenticated' && officerData.isDirector,
      retry: false,
      onError: (err) => {
        console.error('Error fetching add director data:', err);
        if ((err as GraphQLError).message === 'User is not director') {
          router.push('/admin');
        }
      }
    },
  );

  const addNewDirectorHandler = async (officerId: string, divisionId: string) => {
    try {
      await gqlQueries.addNewDirector({
        where: {
          officerId,
        },
        create: {
          officer: {
            connect: {
              id: officerId,
            },
          },
          divisions: {
            connect: [
              {
                id: divisionId,
              },
            ],
          },
        },
        update: {
          divisions: {
            connect: [
              {
                id: divisionId,
              },
            ],
          },
        },
      });
    } catch (error) {
      console.error(error);
      alert('Error adding new officer. Please try again later...');
    }
  };

  if (!officerData.isOfficer) return <AdminOnlyComponent />;
  if (isLoading || status === 'loading') return <Loading />;

  if (error) {
    console.error(error);
    return (
      <ErrorComponent
        errorCode={(error as GraphQLError).extensions?.code as string || 'ERROR'}
        errorMessage={(error as GraphQLError).message || 'An error occurred'}
      />
    );
  }

  return (
    <div className="p-5">
      <PageTitle handleGoBack={() => router.push('/admin/director/view')} />
      <AddDirectorForm
        availableDivisions={data!.divisions}
        eligibleOfficers={data!.officers}
        handleAddNewOfficer={(officerId, divisionId) =>
          addNewDirectorHandler(officerId, divisionId).then(() =>
            alert('Successfully added new officer'),
          )
        }
      />
    </div>
  );
}
