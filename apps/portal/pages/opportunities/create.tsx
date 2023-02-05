import { TypeformCreateForm } from 'components/typeformApplicationSystem/update-application-form';
import { NextPage } from 'next';
import { useForm } from 'react-hook-form';
import { gql, useMutation } from 'urql';
import { TypeformApplication } from '@prisma/client';
import { useState } from 'react';
import { useRouter } from 'next/router';

const CreateApplicationPage: NextPage = () => {
  const router = useRouter();

  const CREATE_TYPEFORM_APPLICATION = gql`
    mutation CreateTypeformApplication($create: TypeformApplicationCreateInput!) {
      createTypeformApplication(data: $create) {
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

  const [__, createTypeformApplication] = useMutation<any>(CREATE_TYPEFORM_APPLICATION);

  type FormInputs = {
    active: boolean;
    description: string;
    endpoint: string;
    externalResourceUrl: string;
    typeformId: string;
    typeformName: string;
    division: string;
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();
  return (
    <div className="px-16 py-[65px] w-full">
      <header className="flex items-center justify-center relative mb-[30px]">
        <h1 className="text-[48px] font-Gilroy text-white font-semibold">applications</h1>
      </header>

      <div className="w-full grid place-items-center">
        <div className="flex flex-col p-10 place-items-center">
          <div className="text-2xl font-semibold text-gray-100">Create Typeform Application</div>
        </div>
        <div className="w-full flex justify-center">
          {TypeformCreateForm(handleSubmit, register, createTypeformApplication)}
        </div>
        <div className="flex gap-20">
          <button
            type="submit"
            className="bg-purple-600 text-gray-100 font-semibold px-12 py-2 rounded-lg"
            form="create-typeform"
          >
            save
          </button>
          <button className="text-gray-100 font-semibold p-2 rounded-lg" onClick={router.back}>
            cancel
          </button>
        </div>
      </div>
      <div className="flex gap-x-16 px-16 justify-center"></div>
    </div>
  );
};

export default CreateApplicationPage;
