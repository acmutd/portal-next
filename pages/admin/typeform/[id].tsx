import Button from 'components/Button';
import LoadingComponent from 'components/LoadingComponent';
import AdminOnlyComponent from 'components/admin/AdminOnly';
import { OfficerStatusContext } from 'components/context/OfficerStatus';
import { TypeformEditForm } from 'components/typeformApplicationSystem';
import { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { useQuery } from 'react-query';
import { gqlQueries } from 'src/api';


const EditApplicationPage: NextPage = () => {
  const router = useRouter();
  const isOfficer =  useContext(OfficerStatusContext);
  const { id } = router.query;
  const { status } = useSession({ required: true });
  const { data, isLoading, error } = useQuery(
    [`editSingleApp${id}`],
    () =>
      gqlQueries.findTypeformApplication({
        where: {
          id: {
            equals: id! as string,
          },
        },
      }),
    { enabled: status === 'authenticated' },
  );
  
  if (!isOfficer) {
    return <AdminOnlyComponent />;
  } 

  if (isLoading) {
    return <LoadingComponent />;
  }


  if (!data!.findFirstTypeformApplication) {
    return <div>No application exists</div>;
  }

  return (
    <div className="w-full p-20">
      <div className="w-full grid place-items-center">
        <div className="flex flex-col p-10 place-items-center">
          <div className="text-4xl font-semibold text-gray-100">Update Typeform Application</div>
        </div>
        <div className="w-full">
          {!isLoading ? (
            <TypeformEditForm
              currentApplicationData={data!.findFirstTypeformApplication}
              id={id as string}
            />
          ) : (
            <div>Loading..</div>
          )}
        </div>
      </div>
      <div className="grid grid-cols-3 gap-x-16 px-16">
        <button
          type="submit"
          className="bg-purple-600 text-gray-100 font-semibold p-2 rounded-lg"
          form="update-typeform"
        >
          save
        </button>
        <button className="text-gray-100 font-semibold p-2 rounded-lg" onClick={router.back}>
          cancel
        </button>
        <Button
          onClick={() => {
            gqlQueries
              .deleteTypeformApplication({
                where: {
                  id: id as string,
                },
              })
              .then(router.back);
          }}
        >
          delete application
        </Button>
      </div>
    </div>
  );
};

export default EditApplicationPage;
