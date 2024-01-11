import { Application, GetApplicationDataQuery, TypeformApplication } from 'lib/generated/graphql';
import ApplicationCard from './typeformApplicationSystem/ApplicationCard';
import { PopupButton } from '@typeform/embed-react';
import Button from './Button';
import Link from 'next/link';

interface OpenApplicationsViewProps {
  applications: GetApplicationDataQuery['returnAllOpenApp'];
  typeformApplications: GetApplicationDataQuery['typeformApplications'];
  userData: {
    email: string;
    firstName: string;
    lastName: string;
    major: string;
    netid: string;
    classStanding: string;
  };
}

export default function OpenApplicationsView({
  applications,
  typeformApplications,
  userData,
}: OpenApplicationsViewProps) {
  console.log(applications);
  return typeformApplications.length !== 0 && applications.length !== 0 ? (
    <div className="w-full flex flex-col items-center lg:flex-row flex-wrap gap-[30px]">
      {typeformApplications.map(
        ({ id, typeformName, description, typeformId, externalResourceUrl, division }) => (
          <ApplicationCard
            key={id}
            title={typeformName}
            description={description}
            buttons={[
              <PopupButton
                id={typeformId}
                hidden={{
                  email: userData.email,
                  first_name: userData.firstName,
                  last_name: userData.lastName,
                  major: userData.major,
                  net_id: userData.netid,
                  classification: userData.classStanding,
                }}
                className="my-button"
              >
                <div className="text-center cursor-pointer transition-all duration-75 w-fit bg-gradient-to-r from-pink-700 to-purple-700 hover:opacity-80 text-white font-Gilroy font-bold py-2 px-8">
                  apply
                </div>
              </PopupButton>,
              // exclude 'learn more' button when external url is blank
              ...(externalResourceUrl && externalResourceUrl !== ''
                ? [
                    <Link href={externalResourceUrl} target="_blank">
                      <Button color="secondary">learn more</Button>
                    </Link>,
                  ]
                : []),
            ]}
            division={division}
          />
        ),
      )}
      {applications.map(({ id, name, externalResourceUrl, division, description }) => (
        <ApplicationCard
          buttons={[
            ...[
              <Link href={`/opportunities/${id}`}>
                <Button>apply</Button>
              </Link>,
            ],
            ...(externalResourceUrl && externalResourceUrl !== ''
              ? [
                  <Link href={externalResourceUrl} target="_blank">
                    <Button color="secondary">learn more</Button>
                  </Link>,
                ]
              : []),
          ]}
          key={id}
          title={name}
          description={description}
          division={division!.deptName}
        />
      ))}
    </div>
  ) : (
    <h3 className="px-4 text-xl text-left text-white mb-4">No applications found</h3>
  );
}
