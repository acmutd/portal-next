/**
 * Profile Page
 *
 * Route: /profile
 *
 */

import ACMButton from '../../components/PortalButton';
import { useState, useEffect } from 'react';
import { setCookies } from 'cookies-next';
import ProfileEditView from 'components/profile/ProfileEditView';
import { useSession } from 'next-auth/react';
import Router from 'next/router';
import Link from 'next/link';
import EmailToast from 'components/EmailToast';
import { GetServerSideProps } from 'next';
import ProfileView from 'components/profile/ProfileView';
import { gqlQueries } from 'src/api';
import { useQuery } from 'react-query';
import { GraphQLError } from 'graphql/error';
import ErrorComponent from 'components/ErrorComponent';
import Loading from 'components/Loading_Profile';
import CameraIcon from '../../icons/CameraIcon';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { profileVisited } = ctx.req.cookies;
  return {
    props: {
      profileVisited: profileVisited ?? null,
      // dehydratedState: dehydrate(queryClient),
    },
  };
};

export default function ProfilePage({ profileVisited }: { profileVisited: boolean }) {
  const { data: session, status } = useSession({ required: true });
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState<GraphQLError | null>(null);
  const [formEditMode, setFormEditMode] = useState(false);

  useEffect(() => {
    if (!profileVisited) {
      // set visited cookie to true so that the user is not redirected to the profile page on login anymore
      setCookies('profileVisited', true);
    }
  }, []);

  const { data, error, isLoading, refetch } = useQuery(
    ['profileData'],
    () => gqlQueries.findProfile({
      where: { userId: session?.id || '' },
    }),
    { enabled: status === 'authenticated' },
  );

  if (isLoading || status == 'loading') return <Loading />;
  if (error) return <p className="text-gray-100">whoops... {error as any}</p>;

  return (
    <>
      {errors && (
        <ErrorComponent
          errorCode={errors.extensions.code as string}
          errorMessage={errors.message}
        />
      )}
      <div className="min-h-screen w-full p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-white">My Profile</h1>
            <div className="flex gap-4">
              <Link href="/resume">
                <ACMButton theme="dark">
                  Resume
                  <div className="inline-flex ml-4 text-white">
                    <CameraIcon height="15" width="20" fill={'#fff'} />
                  </div>
                </ACMButton>
              </Link>
              <ACMButton
                theme="dark"
                onClick={() => setFormEditMode(!formEditMode)}
              >
                {formEditMode ? 'Cancel' : 'Edit Profile'}
              </ACMButton>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-3/4">
              {formEditMode ? (
                <ProfileEditView
                  profile={data!.profile}
                  onErrorEncounter={setErrors}
                  onUpdateFormCompleted={() => {
                    setOpen(true);
                    setFormEditMode(false);
                    refetch();
                  }}
                />
              ) : (
                <ProfileView profile={data!.profile} />
              )}
            </div>
            <div className="lg:w-1/4">
              <img
                src="assets/acm/mrpeechi.png"
                alt="acm mascot"
                className={`${formEditMode ? 'hidden' : ''} w-full`}
              />
            </div>
          </div>
        </div>
      </div>
      <EmailToast open={open} setOpen={setOpen} />
    </>
  );
}
