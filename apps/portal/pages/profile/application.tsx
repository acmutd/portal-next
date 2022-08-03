import { gql, useMutation, useQuery } from 'urql';
import { Widget } from '@typeform/embed-react';

export default function ApplicationPage() {
  const ACTIVE_APPLICATIONS_QUERY = gql`
    query Query($where: TypeformApplicationnWhereInput) {
      typeformApplicationns(where: $where) {
        id
        description
        typeformId
        typeformName
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
    <div className="w-screen grid place-items-center gap-2">
      <h1>Testing Boundaries</h1>
      <Widget id="rZfmLZaS" width={800} height={800} opacity={80} className="my-form" />
    </div>
  );
}
