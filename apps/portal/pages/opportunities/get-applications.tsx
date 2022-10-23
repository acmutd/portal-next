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
          <div className="bg-gray-200/10 rounded-3xl p-6 w-80 h-48 space-y-2">
            <div className="h-24 space-y-2">
              <p className="text-xl text-white font-bold">{application.typeformName}</p>
              <p className="text-white text-sm">{application.description}</p>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-r from-pink-700 to-purple-700 text-center w-fit py-2 px-12 absolute right-0">
                <PopupButton id={application.typeformId} className="my-button">
                  <p className="font-Gilroy text-white font-bold">apply</p>
                </PopupButton>
              </div>
            </div>
          </div>
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
