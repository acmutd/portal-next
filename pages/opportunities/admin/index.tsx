import { Button1, Button2 } from 'components/Button1';
import { NewApplicationCard } from 'components/typeformApplicationSystem/ApplicationCard';
import { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { gql, useQuery } from 'urql';
import CircularBlur from '../../../components/CircularBlur';
import { TypeformApplication } from '@generated/type-graphql';

// Write GraphQL query to retrieve applications for the selected divisions

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
        division
      }
      me {
        isOfficer
      }
    }
  `;

  const [{ data, fetching, error }, _] = useQuery<ActiveApplicationsQuery>({
    query: ACTIVE_APPLICATIONS_QUERY,
    variables: {
      where: {
        active: {
          equals: true,
        },
      },
    },
  });

  const { status } = useSession({ required: true });
  if (fetching || status == 'loading') return <p className="text-gray-100">loading...</p>;
  if (error) return <p className="text-gray-100">whoops... {error.message}</p>;

  // Add divisions selector component (Multiselect with custom ui)
  // Change ApplicationCards to use new data (Applications Query by Division)

  return (
    <div className="px-16 py-[65px] relative">
      <CircularBlur backgroundColor="rgba(129, 53, 218, 1)" top="20%" left="10%" />
      <CircularBlur backgroundColor="#daa635" bottom="20%" right="15%" />
      <div className="flex items-start relative mb-[30px] gap-x-4">
        <h1 className="text-[57px] font-Gilroy text-white font-medium">Hello,</h1>
      </div>
      <div>
        <h2 className='text-3xl font-Gilroy text-white font-medium mb-4'>Divisions</h2>
        
      </div>
      <div>
        <h2 className='text-3xl font-Gilroy text-white font-medium mb-4'>Applications</h2>
        <div className="w-full flex flex-wrap gap-12 mb-8">
        {data!.typeformApplications.map(
          ({ id, typeformName, description, typeformId, externalResourceUrl, division }) => (
            <NewApplicationCard
              key={id}
              title={typeformName}
              description={description}
              button={
                <Link href={`/opportunities/admin/${id}`}>
                    <Button1>More Info</Button1>
                </Link>
              }
              division={division}
            />
          ),
        )}
      </div>
      </div>
      
    </div>
  );
};

export default ApplicationsEditPage;