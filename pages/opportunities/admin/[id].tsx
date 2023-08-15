import Button from 'components/Button';
import LoadingComponent from 'components/LoadingComponent';
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
  const [selected, setSelected] = useState(null);
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
    <div className="w-full p-20">
      <Link href={`/opportunities/admin/`}>
        <button>
          <div className="text-3xl font-semibold text-gray-100">
            {data?.findFirstApplication!.name || 'Application Manager'}
          </div>
        </button>
      </Link>
      <div className="w-full grid place-items-center">
        <div className="flex flex-col p-10 place-items-center">
          <div className="flex flex-row p-5 place-items-center">
            <div className="w-[50%]">
              <h2 className="text-2xl font-semibold text-gray-100">Information</h2>
              {/* Left Side*/}
              <div>
                {/* Search Box*/}
                <p className="text-sm font-semibold text-gray-100">Applicants</p>
                <input type="text" id="name" placeholder='name' />
                <input type="text" id="netid" placeholder='netid' />
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
              {isLoading ? (
                <LoadingComponent></LoadingComponent>
              ) : (
                <div className="text-gray-100">
                  {data!.filledApplications.map((filledApp) => {
                    <div className=" border-emerald-700 ">{filledApp.profileId}</div>;
                  })}
                </div>
              )}
            </div>
            <div>
              {/* Right Side*/}
              <div className="text-gray-100">Applicant Details</div>
              <div className="flex flex-col p-5 place-items-center">
                <div>
                  <label>Notes</label>
                  <div>
                    <p></p>
                    <button></button>
                    <button></button>
                  </div>
                </div>
                <div>
                  <label>Applicant Responses</label>
                  <div>
                    {selected ? (
                      <LoadingComponent></LoadingComponent>
                    ) : (
                      <div className="text-gray-100">
                        {/* {selected!.responses.map((response) => {
                          response;
                        })} */}
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
