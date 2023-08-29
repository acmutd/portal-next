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
  const [filterQueryName, setFilterQueryName] = useState('');
  const [filterQueryNetID, setFilterQueryNetID] = useState('');
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
      <div className="flex flex-row place-content-center">
        <h1 className="text-3xl font-semibold text-gray-100">View Applicant Responses</h1>
      </div>
      <Link href={`/opportunities/admin/`}>
        <button>
          <div className="text-3xl font-semibold text-gray-100">
            {/* TODO: replace arrow with svg */}
            {'< ' + data?.application!.name || 'Application Manager'}
          </div>
        </button>
      </Link>
      <div className="flex flex-col place-content-center">
        <div className="flex flex-row p-5 mt-5 place-content-center w-full">
          <div>
            {/* ^ Left Side*/}
            <div>
              {/* ^ Search Box*/}
              <p className="text-xl text-gray-100">Filter Applicants</p>
              {/* Search By name */}
              <input
                className="rounded-xl"
                type="text"
                id="name"
                placeholder="name"
                onChange={(e) => setFilterQueryName(e.target.value)}
              />
              {/* Search by netID */}
              <input
                className="rounded-xl"
                type="text"
                id="netid"
                placeholder="netid"
                onChange={(e) => setFilterQueryNetID(e.target.value)}
              />
              {/* <div>
                <span>
                  <select className="rounded-xl">
                    <option value="class"></option>
                  </select>
                  <select className="rounded-xl">
                    <option value="status"></option>
                  </select>
                  <select className="rounded-xl">
                    <option value="preference"></option>
                  </select>
                </span>
              </div> */}
              {/* List of applicants */}
              <p className="text-gray-100 text-xl mt-3">Matching Applicants</p>
              {isLoading ? (
                <LoadingComponent></LoadingComponent>
              ) : (
                <div className="text-gray-100 border border-gray-300 rounded-xl bg-transparent p-3">
                  {data.application.fillApplications
                    .filter(
                      (filledApp) =>
                        (filledApp.profile.firstName
                          .toLowerCase()
                          .includes(filterQueryName.toLowerCase()) ||
                          filledApp.profile.lastName
                            .toLowerCase()
                            .includes(filterQueryName.toLowerCase())) &&
                        filledApp.profile.netid.includes(filterQueryNetID),
                    )
                    .map((filledApp, i) => (
                      <div key={filledApp.id}>
                        <button onClick={() => setSelected(filledApp)}>
                          <p>{filledApp.profile.firstName + ' ' + filledApp.profile.lastName}</p>
                        </button>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>
          <div className="text-gray-100">
            {/* Right Side*/}
            <div className="flex flex-col px-5">
              <div className="text-xl">Applicant Details</div>
              <label>Notes</label>
              <div className="appearance-none block w-4/5 text-gray-100 rounded py-3 px-4 mb-3 leading-tight focus:outline-none bg-transparent border border-gray-600">
                {formEditMode ? (
                  <OfficerApplicationForm
                    applicantName={selected?.profile?.firstName + ' ' + selected?.profile?.lastName}
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
      {selected !== undefined ? (
        <div className="m-3 flex flex-row place-content-center">
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
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default EditApplicationPage;
