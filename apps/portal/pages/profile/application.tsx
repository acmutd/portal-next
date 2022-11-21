import { PopupButton } from '@typeform/embed-react';
import Button from 'components/Button';
import ApplicationCard from 'components/typeformApplicationSystem/ApplicationCard';
import { NextPage } from 'next';
import Link from 'next/link';
import { gql, useQuery } from 'urql';

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
const ApplicationsPage: NextPage = () => {
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
    <div className="px-16 py-[65px]">
      <header className="flex items-center justify-center relative mb-[30px]">
        <h1 className="text-[48px] font-Gilroy text-white font-semibold">applications</h1>

        {data.me.isOfficer && (
          <Link href="/opportunities/edit">
            <Button className="absolute right-0">edit</Button>
          </Link>
        )}
      </header>
      <div className="w-full flex flex-wrap gap-[30px]">
        {data.typeformApplications.map(({ id, typeformName, description, typeformId }) => (
          <ApplicationCard
            key={id}
            title={typeformName}
            description={description}
            button={
              <PopupButton id={typeformId} className="my-button">
                <Button>apply</Button>
              </PopupButton>
            }
            division="development."
          />
        ))}
      </div>
    </div>
  );
};

export default ApplicationsPage;
