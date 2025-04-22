import ErrorComponent from 'components/ErrorComponent';
import Loading from 'components/Loading_Apply';
import AdminOnlyComponent from 'components/admin/AdminOnly';
import AddDirectorForm from 'components/admin/director/add/AddDirectorForm';
import PageTitle from 'components/admin/director/add/PageTitle';
import { OfficerStatusContext } from 'components/context/OfficerStatus';
import { GraphQLError } from 'graphql';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { useQuery } from 'react-query';
import { gqlQueries } from 'src/api';

export default function AddDirectorPage() {
  const { status } = useSession({ required: true });
  const router = useRouter();
  const officerData = useContext(OfficerStatusContext);
  const isDevDirectorOrExecutive =
    officerData.directorOfDivisions.indexOf('Development') !== -1 ||
    officerData.directorOfDivisions.indexOf('Executive') !== -1;
  const { data, isLoading, error } = useQuery(
    ['addDirectorPageData'],
    () => gqlQueries.getAddDirectorPageInfo(),
    {
      enabled: status === 'authenticated' && officerData.isDirector,
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

  if (!officerData.isDirector) return <AdminOnlyComponent />;
  if (isLoading || status === 'loading') return <Loading />;

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
