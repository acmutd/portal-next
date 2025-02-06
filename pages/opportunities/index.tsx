import CircularBlur from 'components/CircularBlur';
import EmailToast from 'components/EmailToast';
import { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useQuery, dehydrate, QueryClient } from 'react-query';
import { gqlQueries } from 'src/api';
import { useRouter } from 'next/router';
import ErrorComponent from 'components/ErrorComponent';
import { GraphQLError } from 'graphql/error';
import { Tab } from '@headlessui/react';
import OpenApplicationsView from 'components/OpenApplicationsView';
import MyApplicationView from 'components/MyApplicationView';
import Loading from 'components/Loading_Apply';

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
      }),
    {
      enabled: status === 'authenticated',
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
      cacheTime: 1000 * 60 * 30,
    },
  );

  const [open, setOpen] = useState(false);
  const [tabIndex, setTabIndex] = useState<number>(1);

  useEffect(() => {
    if (sessionStorage.getItem('showToast') == '1') {
      setOpen(true);
      sessionStorage.removeItem('showToast');
    }
  }, []);

  if (isLoading || status == 'loading') return <Loading />;
  if (error)
    return (
      <ErrorComponent
        errorCode={(error as GraphQLError).extensions.code as string}
        errorMessage={(error as GraphQLError).message}
      />
    );
  if (!data!.me.profile) {
    router.push('/profile');
    return <Loading />;
  }

  return (
    <div className="min-h-screen w-full p-8 relative z-0">
      <div className="max-w-7xl mx-auto">
        <CircularBlur backgroundColor="rgba(129, 53, 218, 1)" top="20%" left="10%" />
        <CircularBlur backgroundColor="#daa635" bottom="20%" right="15%" />
        
        {/* Header Section */}
        <div className="flex flex-col gap-6 mb-8 relative z-10">
          <h1 className="text-4xl font-bold text-white text-center">Applications</h1>
          <Tab.Group selectedIndex={tabIndex} onChange={setTabIndex}>
            <Tab.List className="flex space-x-2 rounded-xl bg-gray-200/5 p-2 w-fit mx-auto">
              <Tab
                className={({ selected }) =>
                  `px-6 py-2 rounded-lg transition-colors ${
                    selected
                      ? 'bg-purple-600 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-gray-200/10'
                  }`
                }
              >
                My Applications
              </Tab>
              <Tab
                className={({ selected }) =>
                  `px-6 py-2 rounded-lg transition-colors ${
                    selected
                      ? 'bg-purple-600 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-gray-200/10'
                  }`
                }
              >
                Open Applications
              </Tab>
            </Tab.List>
          </Tab.Group>
        </div>

        {/* Content Section */}
        <div className="relative z-10">
          {tabIndex === 0 ? (
            <MyApplicationView
              typeformAppData={data!.me.profile?.typeformSubmissions || []}
              appData={[]}
            />
          ) : (
            <OpenApplicationsView
              applications={data!.returnAllOpenApp}
              typeformApplications={data!.typeformApplications}
              userData={{
                email: data!.me.profile!.email || '',
                firstName: data!.me.profile!.firstName || '',
                lastName: data!.me.profile!.lastName || '',
                major: data!.me.profile!.major || '',
                netid: data!.me.profile!.netid || '',
                classStanding: data!.me.profile!.classStanding || '',
              }}
            />
          )}
        </div>
      </div>

      <EmailToast open={open} setOpen={setOpen} />
    </div>
  );
};

export async function getStaticProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(['applicationData'], () =>
    gqlQueries.getApplicationData({
      where: {
        active: {
          equals: true,
        },
      },
    })
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 300,
  };
}

export default ApplicationsPage;
