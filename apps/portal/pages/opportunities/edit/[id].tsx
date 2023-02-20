import {
  TypeformApplication,
  DeleteOneTypeformApplicationArgs,
  UpdateOneTypeformApplicationArgs,
} from '@generated/type-graphql';
import Button from 'components/Button';
import { TypeformEditForm } from 'components/typeformApplicationSystem';
import { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { gql, useMutation, useQuery } from 'urql';

const EditApplicationPage: NextPage = () => {
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

  const [{ data }] = useQuery<{
    findFirstTypeformApplication: TypeformApplication;
  }>({
    query: GET_TYPEFORM,
    variables: {
      where: {
        id: {
          equals: id,
        },
      },
    },
  });

  const UPDATE_TYPEFORM_APPLICATION = gql`
    mutation UpdateOneTypeformApplication(
      $data: TypeformApplicationUpdateInput!
      $where: TypeformApplicationWhereUniqueInput!
    ) {
      updateOneTypeformApplication(data: $data, where: $where) {
        id
        active
        description
        endpoint
        externalResourceUrl
        typeformId
        typeformName
      }
    }
  `;

  const DELETE_TYPEFORM_APPLICATION = gql`
    mutation DeleteOneTypeformApplication($where: TypeformApplicationWhereUniqueInput!) {
      deleteOneTypeformApplication(where: $where) {
        id
        typeformName
        description
      }
    }
  `;

  const [_, updateTypeformApplication] = useMutation<
    {
      updateTypeformApplication: TypeformApplication;
    },
    UpdateOneTypeformApplicationArgs
  >(UPDATE_TYPEFORM_APPLICATION);
  const [___, deleteTypeformApplication] = useMutation<
    {
      deleteTypeformApplication: TypeformApplication;
    },
    DeleteOneTypeformApplicationArgs
  >(DELETE_TYPEFORM_APPLICATION);

  const { register, handleSubmit } = useForm<Omit<TypeformApplication, 'id'>>();

  return (
    <div className="w-full p-20">
      <div className="w-full grid place-items-center">
        <div className="flex flex-col p-10 place-items-center">
          <div className="text-4xl font-semibold text-gray-100">Update Typeform Application</div>
        </div>
        <div className="w-full">
          {data ? (
            <TypeformEditForm
              currentApplicationData={data.findFirstTypeformApplication}
              updateTypeformApplication={updateTypeformApplication}
              id={id as string}
              register={register}
              handleSubmit={handleSubmit}
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
            deleteTypeformApplication({
              where: {
                id: id as string,
              },
            }).then(router.back);
          }}
        >
          delete application
        </Button>
      </div>
    </div>
  );
};

export default EditApplicationPage;
