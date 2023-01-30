/**
 * Profile Page
 *
 * Route: /profile
 *
 */

import ACMButton from '../../components/PortalButton';
import { useState, useEffect } from 'react';
import type { UpsertProfileArgs } from '@generated/type-graphql';
import { setCookies } from 'cookies-next';
import { gql, useMutation, useQuery } from 'urql';
import ProfileField from 'components/ProfileField';
import { Profile } from '@prisma/client';
import { useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import Router from 'next/router';
import Link from 'next/link';

export const getServerSideProps = async (ctx) => {
  const { profileVisited } = ctx.req.cookies;
  return { props: { profileVisited: profileVisited ?? null } };
};

export default function ProfilePage({ profileVisited }) {
  const { data: session } = useSession({ required: true });

  let pageTheme: any = 'dark';
  useEffect(() => {
    if (!profileVisited) {
      // set visited cookie to true so that the user is not redirected to the profile page on login anymore
      setCookies('profileVisited', true);
    }
  }, []);

  const [formEditMode, setFormEditMode] = useState(false);

  const UPDATE_PROFILE = gql`
    mutation UpsertProfile(
      $where: ProfileWhereUniqueInput!
      $create: ProfileCreateInput!
      $update: ProfileUpdateInput!
    ) {
      upsertProfile(where: $where, create: $create, update: $update) {
        firstName
        lastName
        email
        netid
        classStanding
        major
        utdStudent
      }
    }
  `;

  const [_, updateProfile] = useMutation<any, UpsertProfileArgs>(UPDATE_PROFILE);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const PROFILE_QUERY = gql`
    query Query($where: ProfileWhereUniqueInput!) {
      profile(where: $where) {
        firstName
        lastName
        email
        netid
        classStanding
        major
        utdStudent
      }
    }
  `;

  const [profileResult, reexecuteQuery] = useQuery({
    query: PROFILE_QUERY,
    variables: {
      where: {
        userId: session ? session.id : '',
      },
    },
  });

  const { data, fetching, error } = profileResult;
  if (fetching) return <p className="text-gray-100">loading...</p>;
  if (error) return <p className="text-gray-100">whoops... {error.message}</p>;

  return (
    <>
      <div className="w-full grid place-items-center">
        <div className="flex flex-col p-10 place-items-center">
          <div className="text-[36px] font-semibold text-gray-100">my account</div>
          <div className="m-3">
            <ACMButton
              theme="dark"
              onClick={() => {
                setFormEditMode(!formEditMode);
              }}
            >
              {formEditMode ? 'cancel' : 'edit'}
            </ACMButton>
          </div>
        </div>
        <div className="flex flex-col md:flex-row-reverse w-full md:w-[50%]">
          <div className="flex flex-col place-items-center">
            <img src="assets/acm/mrpeechi.png" alt="acm mascot" />
            {formEditMode && (
              <button
                type="submit"
                className="bg-purple-600 text-gray-100 font-semibold p-2 rounded-lg"
                form="profile-form"
              >
                save
              </button>
            )}
          </div>
          {formEditMode ? renderFormEdit() : renderFormView(data.profile)}
        </div>
        {formEditMode && (
          <Link href="/auth/signin">
            <span className="bg-gray-600 text-gray-200 font-semibold p-2 rounded-lg cursor-pointer">
              connect another account
            </span>
          </Link>
        )}
      </div>
    </>
  );

  function renderFormView(profile: Profile): JSX.Element {
    if (!profile) return <p className="text-gray-100">please set up your profile</p>;
    return (
      // view mode
      <div className="flex w-1/2 flex-wrap mb-6">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <ProfileField label="first name" text={profile.firstName.toLowerCase()} />
        </div>
        <div className="w-full md:w-1/2 px-3">
          <ProfileField label="last name" text={profile.lastName.toLowerCase()} />
        </div>
        <div className="w-full px-3">
          <ProfileField label="email" text={profile.email.toLowerCase()} />
        </div>
        <div className="w-full px-3">
          <ProfileField label="netid" text={profile.netid.toLowerCase()} />
        </div>
        <div className="w-full px-3">
          <ProfileField label="class standing" text={profile.classStanding.toLowerCase()} />
        </div>
        <div className="w-full px-3">
          <ProfileField label="major" text={profile.major.toLowerCase()} />
        </div>
      </div>
    );
  }

  function renderFormEdit(): JSX.Element {
    return (
      <>
        <div className="">
          <form
            id="profile-form"
            className="w-full max-w-lg"
            onSubmit={handleSubmit((vals) => {
              updateProfile({
                where: {
                  userId: session.id as string,
                },
                create: {
                  user: {
                    connect: {
                      id: session.id as string,
                    },
                  },
                  firstName: vals.firstName,
                  lastName: vals.lastName,
                  email: session.user.email,
                  netid: vals.netid,
                  classStanding: vals.classStanding,
                  major: vals.major,
                  utdStudent: vals.utdStudent,
                  membershipStatus: false,
                  resume: false,
                },
                update: {
                  firstName: {
                    set: vals.firstName,
                  },
                  lastName: {
                    set: vals.lastName,
                  },
                  netid: {
                    set: vals.netid,
                  },
                  classStanding: {
                    set: vals.classStanding,
                  },
                  major: {
                    set: vals.major,
                  },
                  utdStudent: {
                    set: vals.utdStudent,
                  },
                },
              })
                .then(({ data, error }) => {
                  // TODO: add typed errors, see: check-netid.ts
                  if (error && error.message.includes('[VALIDATION_ERROR]')) {
                    alert('NetID has already been linked to an account');
                  }
                  setFormEditMode(false);
                  reexecuteQuery();
                  Router.push('/profile');
                })
                .catch((err) => {
                  alert(err);
                });
            })}
          >
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block text-gray-200 font-semibold mb-2">first name</label>
                <input
                  className="appearance-none block w-full text-gray-100 rounded py-3 px-4 mb-3 leading-tight focus:outline-none bg-transparent border border-gray-600"
                  id="grid-first-name"
                  placeholder={data.profile ? data.profile.firstName : ''}
                  {...register('firstName')}
                />
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label className="block text-gray-200 font-semibold mb-2">last name</label>
                <input
                  className="appearance-none block w-full text-gray-100 rounded py-3 px-4 mb-3 leading-tight focus:outline-none bg-transparent border border-gray-600"
                  id="grid-last-name"
                  type="text"
                  placeholder={data.profile ? data.profile.lastName : ''}
                  {...register('lastName')}
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label className="block text-gray-200 font-semibold mb-2">email</label>
                <input
                  className="appearance-none block w-full text-gray-100 rounded py-3 px-4 mb-3 leading-tight focus:outline-none bg-transparent border border-gray-600"
                  type="text"
                  placeholder={data.profile ? data.profile.email : ''}
                  {...register('email')}
                />
              </div>

              <div className="w-full px-3">
                <label className="block text-gray-200 font-semibold mb-2">netID</label>
                <input
                  className="appearance-none block w-full text-gray-100 rounded py-3 px-4 mb-3 leading-tight focus:outline-none bg-transparent border border-gray-600"
                  type="text"
                  placeholder={data.profile ? data.profile.netid : ''}
                  {...register('netid')}
                />
              </div>
              <div className="w-full px-3">
                <label className="block text-gray-200 font-semibold mb-2">class standing</label>
                <input
                  className="appearance-none block w-full text-gray-100 rounded py-3 px-4 mb-3 leading-tight focus:outline-none bg-transparent border border-gray-600"
                  type="text"
                  placeholder={data.profile ? data.profile.classStanding : ''}
                  {...register('classStanding')}
                />
              </div>
              <div className="w-full px-3">
                <label className="block text-gray-200 font-semibold mb-2">major</label>
                <input
                  className="appearance-none block w-full text-gray-100 rounded py-3 px-4 mb-3 leading-tight focus:outline-none bg-transparent border border-gray-600"
                  type="text"
                  placeholder={data.profile ? data.profile.major : ''}
                  {...register('major')}
                />
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3"></div>
              <label className="md:w-2/3 block text-gray-500 font-bold">
                <input className="mr-2 leading-tight" type="checkbox" {...register('utdStudent')} />
                <span className="text-sm">utd student</span>
              </label>
            </div>
          </form>
        </div>
      </>
    );
  }
}
