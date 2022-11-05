import { gql, useMutation, useQuery } from 'urql';
import GetActiveApplications from '../../components/typeformApplicationSystem/get-applications';
import OfficerView from '../../components/typeformApplicationSystem/officer-view';

export default function ApplicationPage() {
  const ACTIVE_APPLICATIONS_QUERY = gql`
    query GetActiveApplications($where: TypeformApplicationWhereInput) {
      typeformApplications(where: $where) {
        id
        active
        description
        endpoint
        externalResourceUrl
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

  return (
    <div>
      <GetActiveApplications />
      {data.me.isOfficer ? (
        <OfficerView
          typeformApplications={data.typeformApplications}
          isOfficer={data.me.isOfficer}
        />
      ) : (
        <></>
      )}
    </div>
  );
}
