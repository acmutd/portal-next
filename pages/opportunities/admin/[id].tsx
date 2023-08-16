import Button from 'components/Button';
import LoadingComponent from 'components/LoadingComponent';
import ACMButton from 'components/PortalButton';
import ApplicationForm from 'components/applications/ApplicationForm';
import OfficerApplicationForm from 'components/applications/OfficerApplicationForm';
import {
  FilledApplication,
  FilledApplicationScalarFieldEnum,
  FindFilledApplicationsDocument,
  FindFilledApplicationsQuery,
} from 'lib/generated/graphql';
import { GetServerSideProps, NextPage } from 'next';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { dehydrate, useQuery } from 'react-query';
import { gqlQueries, queryClient } from 'src/api';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  await queryClient.prefetchQuery(['manageSingleApp'], () =>
    gqlQueries.findFilledApplications({
      whereApp: {
        id: ctx.params!.id! as string,
      },
    }),
  );
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

const EditApplicationPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { status } = useSession({ required: true });
  const [formEditMode, setFormEditMode] = useState(false);
  type FilledAppData = {
    __typename?: 'FilledApplication';
    id: string;
    profileId: string;
    appId: string;
    responses: Array<string>;
    status: string;
    first: string;
    notes?: string | null;
    second: string;
    third: string;
    score?: number | null;
    interviewLink?: string | null;
    profile?: {
      __typename?: 'Profile';
      id: string;
      firstName: string;
      lastName: string;
    };
  };
  const [selected, setSelected] = useState<FilledAppData>();
  const { data, isLoading, error } = useQuery(
    ['manageSingleApp'],
    () =>
      gqlQueries.findFilledApplications({
        whereApp: {
          id: id! as string,
        },
      }),

    { enabled: status === 'authenticated' },
  );

  if (isLoading) {
    return <LoadingComponent></LoadingComponent>;
  }

  if (!data?.me.isOfficer) {
    return (
      <div>
        You are not authorized to view this page, please log in with your acm officer account
      </div>
    );
  }

  if (!data?.application?.fillApplications) {
    return <div>No applicants have submitted a response yet</div>;
  }

  return (
    <div className="w-full p-5 mt-5">
      <Link href={`/opportunities/admin/`}>
        <button>
          {/* TODO: replace arrow with svg */}
          <div className="text-3xl font-semibold text-gray-100">
            {'< ' + data?.application!.name || 'Application Manager'}
          </div>
        </button>
      </Link>
      <div className="m-3">
        <ACMButton
          theme="dark"
          onClick={() => {
            if (selected !== undefined) {
              setFormEditMode(!formEditMode);
            }
          }}
        >
          {formEditMode ? 'cancel' : 'edit'}
        </ACMButton>
      </div>
      <div className="w-full grid">
        <div className="flex flex-col">
          <div className="flex flex-row p-5 place-content-stretch w-full">
            <div>
              {/* Left Side*/}
              <h2 className="text-2xl font-semibold text-gray-100">Information</h2>
              <div>
                {/* Search Box*/}
                <p className="text-sm font-semibold text-gray-100">Filter Applicants</p>
                <input type="text" id="name" placeholder="name" />
                <input type="text" id="netid" placeholder="netid" />
                <div>
                  <span>
                    <select>
                      <option value=""></option>
                    </select>
                    <select>
                      <option value=""></option>
                    </select>
                    <select>
                      <option value=""></option>
                    </select>
                  </span>
                </div>
              </div>
              {/* List of applicants */}
              <p className="text-gray-100">Matching Applicants</p>
              {isLoading ? (
                <LoadingComponent></LoadingComponent>
              ) : (
                <div className="text-gray-100">
                  {data.application.fillApplications.map((filledApp, i) => (
                    <div>
                      <button onClick={() => setSelected(filledApp)}>
                        <p>{filledApp.profile.firstName}</p>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="text-gray-100">
              {/* Right Side*/}
              <div className="flex flex-col p-5">
              <div className="text-xl">Applicant Details</div>
                <label>Notes</label>
                <div className="appearance-none block w-4/5 text-gray-100 rounded py-3 px-4 mb-3 leading-tight focus:outline-none bg-transparent border border-gray-600">
                  {formEditMode ? (
                    <OfficerApplicationForm
                      applicantName={
                        selected?.profile?.firstName + ' ' + selected?.profile?.lastName
                      }
                      originalNotes={selected?.notes!}
                      originalStatus={selected?.status!}
                      originalScore={selected?.score!}
                      onSubmit={async (formData) => {
                        await gqlQueries.updateSingleApplication({
                          data: {
                            notes: { set: formData.notes },
                            status: { set: formData.status },
                            score: { set: formData.score },
                          },
                          where: {
                            id: selected?.id!,
                          },
                        });
                        alert('Your edit was successfully recorded.');
                        router.reload();
                      }}
                    />
                  ) : (
                    <div>
                      <p>{selected === undefined ? '' : String(selected.notes)} </p>
                      <button></button>
                    </div>
                  )}
                </div>
                <div>
                  <label className="text-xl">Applicant Responses</label>
                  <div>
                    {selected === undefined ? (
                      <p>No Applicant Selected</p>
                    ) : (
                      <div className="text-gray-100">
                        {selected.responses.map((response) => {
                          return (
                            <div className="appearance-none block w-4/5 text-gray-100 rounded py-3 px-4 mb-3 leading-tight focus:outline-none bg-transparent border border-gray-600">
                              <p>{response}</p>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditApplicationPage;
