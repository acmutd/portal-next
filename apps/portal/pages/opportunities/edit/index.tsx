import { PopupButton } from '@typeform/embed-react';
import Button from 'components/Button';
import AddNewApplicationCard from 'components/typeformApplicationSystem/AddNewApplicationCard';
import ApplicationCard from 'components/typeformApplicationSystem/ApplicationCard';
import { NextPage } from 'next';
import Link from 'next/link';
import { gql, useMutation, useQuery } from 'urql';
import CircularBlur from '../../../components/CircularBlur';

interface TypeformApplication {
  id: string;
  active: boolean;
  description: string;
  typeformId: string;
  typeformName: string;
  // division: string; in the future
}
interface ActiveApplicationsQuery {
  typeformApplications: TypeformApplication[];
  me: {
    isOfficer: boolean;
  };
}
const ApplicationsEditPage: NextPage = () => {
  const ACTIVE_APPLICATIONS_QUERY = gql`
    query GetActiveApplications($where: TypeformApplicationWhereInput) {
      typeformApplications(where: $where) {
        id
        active
        description
        typeformId
        typeformName
      }
      me {
        isOfficer
      }
    }
  `;

  const [{ data, fetching, error }, reexecuteQuery] = useQuery<ActiveApplicationsQuery>({
    query: ACTIVE_APPLICATIONS_QUERY,
    variables: {
      where: {
        active: {
          equals: true,
        },
      },
    },
  });

  if (fetching) return <p className="text-gray-100">loading...</p>;
  if (error) return <p className="text-gray-100">whoops... {error.message}</p>;

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
        {data.typeformApplications.map(({ id, typeformName, description, typeformId }) => (
          <ApplicationCard
            title={typeformName}
            description={description}
            buttons={[
              <Link href={`/opportunities/edit/${id}`}>
                <Button>edit</Button>
              </Link>,
            ]}
            division="development."
          />
        ))}
      </div>
    </div>
  );
};

export default ApplicationsEditPage;
