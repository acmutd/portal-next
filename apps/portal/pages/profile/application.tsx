import { gql, useMutation, useQuery } from 'urql';
import GetActiveApplications from '../opportunities/get-active-applications';
import { GetCurrentApplication } from '../opportunities/get-active-applications';
import EditApplications from '../opportunities/update-application';

export default function ApplicationPage() {
  const ACTIVE_APPLICATIONS_QUERY = gql`
    query Query($where: TypeformApplicationWhereInput) {
      typeformApplications(where: $where) {
        id
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
  /*
  const UPDATE_TYPEFORM_APPLICATION = gql`
  mutation Mutation($data: TypeformApplicationUpdateInput!, $where: TypeformApplicationWhereUniqueInput!) {
    updateTypeformApplication(data: $data, where: $where) {
      active
    }
  }
`;

  const [_, updateTypeformApplication] = useMutation(UPDATE_TYPEFORM_APPLICATION);
  */

  console.log('Testing' + data.isOfficer);

  return (
    <div>
      {data.me.isOfficer ? (
        <p className="text-white">I'm an officer! </p>
      ) : (
        <p className="text-white">Not an officer</p>
      )}
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
