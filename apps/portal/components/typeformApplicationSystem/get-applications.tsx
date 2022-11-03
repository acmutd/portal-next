import React from 'react';
import { gql, useQuery } from 'urql';
import ApplicationCard from './application-card';
import { PopupButton } from '@typeform/embed-react';

export default function GetActiveApplications() {
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

  return (
    <div>
      <div className="w-full grid grid-cols-3 gap-y-16 place-items-center">
        {data.typeformApplications.map((application) => (
          <ApplicationCard application={application} />
        ))}
      </div>
    </div>
  );
}

function GetCurrentApplication(id: string) {
  const CURRENT_APPLICATION = gql`
    query Query($where: TypeformApplicationWhereInput) {
      typeformApplications(where: $where) {
        id
        active
        typeformId
        typeformName
        description
        endpoint
        externalResourceUrl
      }
    }
  `;

  const [currentTypeformApplication, reexecuteQuery] = useQuery({
    query: CURRENT_APPLICATION,
    variables: {
      where: {
        id: {
          equals: id,
        },
      },
    },
  });

  const { data, fetching, error } = currentTypeformApplication;
  if (fetching) return <p className="text-gray-100">loading...</p>;
  if (error) return <p className="text-gray-100">whoops... {error.message}</p>;
  return data;
}

export { GetActiveApplications, GetCurrentApplication };
