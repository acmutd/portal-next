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
import { Tab } from '@headlessui/react';
import OpenApplicationsView from 'components/OpenApplicationsView';
import MyApplicationView from 'components/MyApplicationView';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  await queryClient.prefetchQuery(['applicationPage'], () =>
    gqlQueries.getApplicationData({
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
  const { status, data: signedInUserData } = useSession({ required: true });
  const router = useRouter();
  const { data, error, isLoading } = useQuery(
    ['applicationData'],
    () =>
      gqlQueries.getApplicationData({
        where: {
          active: {
            equals: true,
          },
        },
        fillAppWhere: {
          profile: {
            is: {
              email: {
                equals: signedInUserData?.user?.email || ""
              }
            }
          }
        }
      }),
    {
      enabled: status === 'authenticated',
    },
    );
    
    const [open, setOpen] = useState(false);
    const [tabIndex, setTabIndex] = useState<number>(0); 
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
        <Tab.Group selectedIndex={tabIndex} onChange={setTabIndex}>
          <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
            <Tab className={({ selected }) => (
              selected ? 
              "rounded-xl bg-white p-3" : 
              "ring-white ring-opacity-60 ring-offset-2 focus:outline-none p-3 text-white"
            )}>My Application</Tab>
            <Tab className={({ selected }) => (
              selected ? 
              "rounded-xl bg-white p-3" : 
              "ring-white ring-opacity-60 ring-offset-2 focus:outline-none p-3 text-white"
            )}>Open Application</Tab>
          </Tab.List>
        </Tab.Group>
        <h1 className="text-[48px] font-Gilroy text-white font-semibold mx-auto">applications</h1>

        {data!.me.isOfficer && (
          <Link href="/opportunities/edit">
            <Button>edit</Button>
          </Link>
        )}
      </header>
      {tabIndex === 0 ? <MyApplicationView 
        appData={data!.filledApplications}
      /> : <OpenApplicationsView 
        applications={data!.openApplications}
        typeformApplications={data!.typeformApplications}
        userData={{
          email: data!.me.profile!.email || "",
          firstName: data!.me.profile!.firstName || "",
          lastName: data!.me.profile!.lastName || '',
          major: data!.me.profile!.major || '',
          netid: data!.me.profile!.netid || '',
          classStanding: data!.me.profile!.classStanding || '',
        }}
      />}
     
      <EmailToast open={open} setOpen={setOpen}></EmailToast>
    </div>
  );
};

export default ApplicationsPage;
