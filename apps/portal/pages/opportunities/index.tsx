import { PopupButton } from '@typeform/embed-react';
import Button from 'components/Button';
import CircularBlur from 'components/CircularBlur';
import EmailToast from 'components/EmailToast';
import ApplicationCard from 'components/typeformApplicationSystem/ApplicationCard';
import { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { gql, useQuery } from 'urql';
import { Profile } from '@generated/type-graphql';

interface TypeformApplication {
  id: string;
  active: boolean;
  description: string;
  typeformId: string;
  typeformName: string;
  division: string;
  externalResourceUrl: string;
}

interface ActiveApplicationsQuery {
  typeformApplications: TypeformApplication[];
  me: {
    isOfficer: boolean;
    profile: Profile;
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
        division
        externalResourceUrl
      }
      me {
        isOfficer
        profile {
          firstName
          email
          lastName
          major
          netid
          classStanding
        }
      }
    }
  `;

  const { status } = useSession({ required: true });
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

  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (sessionStorage.getItem('showToast') == '1') {
      setOpen(true);
      sessionStorage.removeItem('showToast');
    }
  }, []);

  if (fetching || status == 'loading') return <p className="text-gray-100">loading...</p>;
  if (error) return <p className="text-gray-100">whoops... {error.message}</p>;

  return (
    <div className="px-16 py-[65px] relative">
      <CircularBlur backgroundColor="rgba(129, 53, 218, 1)" top="20%" left="10%" />
      <CircularBlur backgroundColor="#daa635" bottom="20%" right="15%" />
      <header className="flex items-center justify-center relative mb-[30px]">
        <h1 className="text-[48px] font-Gilroy text-white font-semibold ml-auto">applications</h1>

        {data!.me.isOfficer && (
          <Link href="/opportunities/edit">
            <Button className="ml-auto">edit</Button>
          </Link>
        )}
      </header>
      <div className="w-full flex flex-wrap gap-[30px]">
        {data!.typeformApplications.map(
          ({ id, typeformName, description, typeformId, externalResourceUrl, division }) => (
            <ApplicationCard
              key={id}
              title={typeformName}
              description={description}
              buttons={[
                <PopupButton
                  id={typeformId}
                  hidden={{
                    email: data!.me.profile.email,
                    first_name: data!.me.profile.firstName,
                    last_name: data!.me.profile.lastName,
                    major: data!.me.profile.major,
                    net_id: data!.me.profile.netid,
                    classification: data!.me.profile.classStanding,
                  }}
                  className="my-button"
                >
                  <Button>apply</Button>
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
      </div>
      <EmailToast open={open} setOpen={setOpen}></EmailToast>
    </div>
  );
};

export default ApplicationsPage;
