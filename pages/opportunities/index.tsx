import { PopupButton } from '@typeform/embed-react';
import Button from 'components/Button';
import CircularBlur from 'components/CircularBlur';
import EmailToast from 'components/EmailToast';
import ApplicationCard from 'components/typeformApplicationSystem/ApplicationCard';
import { GetServerSideProps, NextPage } from 'next';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { gqlQueries, queryClient } from 'src/api';
import { dehydrate } from 'react-query';
import { useRouter } from 'next/router';
import ErrorComponent from 'components/ErrorComponent';
import { GraphQLError } from 'graphql/error';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  await queryClient.prefetchQuery(['applicationPage'], () =>
    gqlQueries.getTypeformApplicationsWithUserData({
      where: {
        active: {
          equals: true,
        },
      },
    }),
  );
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

const ApplicationsPage: NextPage = () => {
  const { status } = useSession({ required: true });
  const router = useRouter();
  const { data, error, isLoading } = useQuery(
    ['applicationData'],
    () =>
      gqlQueries.getTypeformApplicationsWithUserData({
        where: {
          active: {
            equals: true,
          },
        },
      }),
    {
      enabled: status === 'authenticated',
    },
  );

  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (sessionStorage.getItem('showToast') == '1') {
      setOpen(true);
      sessionStorage.removeItem('showToast');
    }
  }, []);

  if (isLoading || status == 'loading') return <p className="text-gray-100">loading...</p>;
  if (error) return <ErrorComponent errorCode={(error as GraphQLError).extensions.code as string} errorMessage={(error as GraphQLError).message}/>;
  if (!data!.me.profile) {
    router.push('/profile');
  }

  return (
    <div className="px-16 py-[65px] relative">
      <CircularBlur backgroundColor="rgba(129, 53, 218, 1)" top="20%" left="10%" />
      <CircularBlur backgroundColor="#daa635" bottom="20%" right="15%" />
      <header className="flex items-center relative mb-[30px]">
        <h1 className="text-[48px] font-Gilroy text-white font-semibold mx-auto">applications</h1>

        {data!.me.isOfficer && (
          <Link href="/opportunities/edit">
            <Button>edit</Button>
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
                    email: data!.me.profile!.email || '',
                    first_name: data!.me.profile!.firstName || '',
                    last_name: data!.me.profile!.lastName || '',
                    major: data!.me.profile!.major || '',
                    net_id: data!.me.profile!.netid || '',
                    classification: data!.me.profile!.classStanding || '',
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
