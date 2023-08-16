import Button from 'components/Button';
import LoadingComponent from 'components/LoadingComponent';
import { FilledApplication, FilledApplicationScalarFieldEnum, FindFilledApplicationsDocument } from 'lib/generated/graphql';
import { GetServerSideProps, NextPage } from 'next';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { dehydrate, useQuery } from 'react-query';
import { gqlQueries, queryClient } from 'src/api';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  await queryClient.prefetchQuery(['manageSingleApp'], () =>
    gqlQueries.findFilledApplications({
      whereFilled: {
        appId: {
          equals: ctx.params!.id! as string,
        },
      },
      whereApp: {
        id: {
          equals: ctx.params!.id! as string,
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

const EditApplicationPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { status } = useSession({ required: true });
  const [selected, setSelected] = useState<FilledApplication | undefined>(undefined);
  const { data, isLoading, error } = useQuery(
    ['manageSingleApp'],
    () =>
      gqlQueries.findFilledApplications({
        whereFilled: {
          appId: {
            equals: id! as string,
          },
        },
        whereApp: {
          id: {
            equals: id! as string,
          },
        },
      }),

    { enabled: status === 'authenticated' },
  );

  if (!data?.me.isOfficer) {
    return (
      <div>
        You are not authorized to view this page, please log in with your acm officer account
      </div>
    );
  }

  if (!data?.filledApplications) {
    return <div>No applicants have submitted a response yet</div>;
  }
  

  return (
    <div className="w-full p-5 mt-5">
      <Link href={`/opportunities/admin/`}>
        <button>
          {/* TODO: replace arrow with svg */}
          <div className="text-3xl font-semibold text-gray-100">
            {"< " + data?.findFirstApplication!.name || 'Application Manager'}
          </div>
        </button>
      </Link>
      <div className="w-full grid place-items-center">
        <div className="flex flex-col p-10 place-items-center">
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
              <p>Matching Applicants</p>
              {isLoading ? (
                <LoadingComponent></LoadingComponent>
              ) : (
                <div className="text-gray-100">
                  {data.filledApplications.map((filledApp) => <div>
                    <button onClick={()=>setSelected(filledApp)}>
                      <p>{filledApp.profileId}</p>
                    </button>
                  </div>)}
                </div>
              )}
            </div>
            <div className="text-gray-100">
              {/* Right Side*/}
              <div >Applicant Details</div>
              <div className="flex flex-col p-5">
                <div>
                  <label>Notes</label>
                  <div>
                    <p>{selected===undefined ? "" : selected.notes}</p>
                    <button></button>
                    <button></button>
                  </div>
                </div>
                <div>
                  <label>Applicant Responses</label>
                  <div>
                    {selected===undefined ? (
                      <p>No Applicant Selected</p>
                    ) : (
                        <div className="text-gray-100">
                          {selected!.responses.map((response) => {
                            return (
                              <div>
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
