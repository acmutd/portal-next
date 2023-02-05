import { TypeformApplication } from '@prisma/client';
import Button from 'components/Button';
import { TypeformEditForm } from 'components/typeformApplicationSystem/update-application-form';
import { NextPage } from 'next';
import { Router, useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { gql, useMutation, useQuery } from 'urql';

// interface TypeformApplication {
//   id: string;
//   active: boolean;
//   description: string;
//   typeformId: string;
//   typeformName: string;
//   // division: string; in the future
// }

const EditApplicationPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

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
    mutation UpdateTypeformApplication(
      $update: TypeformApplicationUpdateInput!
      $where: TypeformApplicationWhereUniqueInput!
    ) {
      updateTypeformApplication(data: $update, where: $where) {
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
    mutation DeleteTypeformApplication($where: TypeformApplicationWhereUniqueInput!) {
      deleteTypeformApplication(where: $where) {
        id
        typeformName
        description
      }
    }
  `;

  const [_, updateTypeformApplication] = useMutation<any>(UPDATE_TYPEFORM_APPLICATION);
  const [___, deleteTypeformApplication] = useMutation<any>(DELETE_TYPEFORM_APPLICATION);

  type FormInputs = {
    active: boolean;
    description: string;
    endpoint: string;
    externalResourceUrl: string;
    typeformId: string;
    typeformName: string;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();

  return (
    <div className="w-full p-20">
      <div className="w-full grid place-items-center">
        <div className="flex flex-col p-10 place-items-center">
          <div className="text-4xl font-semibold text-gray-100">Update Typeform Application</div>
        </div>
        <div className="w-full">
          {data ? (
            TypeformEditForm(
              handleSubmit,
              register,
              id,
              updateTypeformApplication,
              data.findFirstTypeformApplication,
            )
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
                id,
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
