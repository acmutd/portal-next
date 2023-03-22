import { NextPage } from 'next';
import { Router, useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { gql, useQuery } from 'urql';
import {
  TypeformApplication,
  DeleteOneTypeformApplicationArgs,
  UpdateOneTypeformApplicationArgs,
  FindFirstTypeformApplicationArgs,
} from '@generated/type-graphql';

// Get specific application by id (GraphQL query)

// Get application response by user

interface ViewApplicationsProps {
  id: string;
  title: string;
}

const ViewApplicationSubmissionsPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  useSession({ required: true });

  const GET_TYPEFORM = gql`
    query FindFirstTypeformApplication($where: TypeformApplicationWhereInput) {
      findFirstTypeformApplication(where: $where) {
        id
        typeformName
        description
        endpoint
        externalResourceUrl
        active
        typeformId
      }
    }
  `;

  const [{ data }] = useQuery<
    {
      findFirstTypeformApplication: TypeformApplication;
    },
    FindFirstTypeformApplicationArgs
  >({
    query: GET_TYPEFORM,
    variables: {
      where: {
        id: {
          equals: id as string,
        },
      },
    },
  });

  // Review Application Response - Better UI 
  // Write notes for application, not present in schema

  return (
    <div className="pb-16">
      <div className="my-16">
        <button className="text-gray-100 font-semibold p-2 rounded-lg" onClick={router.back}>
          --
        </button>
        <h1 className="text-[57px] font-Gilroy text-white font-medium">
          Hey
        </h1>
      </div>
      <div className="flex flex-col">
        <div>
          <h2 className="text-xl font-Gilroy text-white font-semibold">Information</h2>
          <h3 className="text-lg font-Gilroy text-white font-semibold">Applicants</h3>
        </div>
        <div>
          <div>
            <h3 className="text-sm font-Gilroy text-white font-semibold">Interview Notes</h3>
          </div>
          <div>
            <h3 className="text-sm font-Gilroy text-white font-semibold">Applicant Questions</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewApplicationSubmissionsPage;
