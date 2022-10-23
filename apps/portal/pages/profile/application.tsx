import { gql, useMutation, useQuery } from 'urql';
import GetActiveApplications from '../opportunities/get-applications';
import { GetCurrentApplication } from '../opportunities/get-applications';
import EditApplications from '../opportunities/officer-view';

export default function ApplicationPage() {
  const ACTIVE_APPLICATIONS_QUERY = gql`
    query Query($where: TypeformApplicationWhereInput) {
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

  const [activeTypeformApplicationResult, reexecuteQuery] = useQuery({
    query: ACTIVE_APPLICATIONS_QUERY,
    variables: {
      where: {
        active: {
          equals: true,
        },
      },
    },
  });

  const { data, fetching, error } = activeTypeformApplicationResult;
  if (fetching) return <p className="text-gray-100">loading...</p>;
  if (error) return <p className="text-gray-100">whoops... {error.message}</p>;

  console.log('Testing' + data.isOfficer);

  return (
    <div>
      <div className="py-8">
        <GetActiveApplications />
      </div>
      {data.me.isOfficer ? (
        <EditApplications
          typeformApplications={data.typeformApplications}
          isOfficer={data.me.isOfficer}
        />
      ) : (
        <></>
      )}
    </div>
  );
}
