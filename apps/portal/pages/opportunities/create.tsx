import { TypeformCreateForm } from 'components/typeformApplicationSystem/update-application-form';
import { NextPage } from 'next';
import { useForm } from 'react-hook-form';
import { gql, useMutation } from 'urql';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { TypeformApplication, CreateOneTypeformApplicationArgs } from '@generated/type-graphql';

const CreateApplicationPage: NextPage = () => {
  const router = useRouter();

  useSession({ required: true });
  const CREATE_TYPEFORM_APPLICATION = gql`
    mutation CreateOneTypeformApplication($data: TypeformApplicationCreateInput!) {
      createOneTypeformApplication(data: $data) {
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

  const [__, createTypeformApplication] = useMutation<
    {
      createOneTypeformApplication: TypeformApplication;
    },
    CreateOneTypeformApplicationArgs
  >(CREATE_TYPEFORM_APPLICATION);

  const { register, handleSubmit } = useForm<Omit<TypeformApplication, 'id'>>();
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
          <TypeformCreateForm
            handleSubmit={handleSubmit}
            register={register}
            createTypeformApplication={createTypeformApplication}
          />
        </div>
        <div className="flex gap-20">
          <button
            type="submit"
            className="bg-purple-600 text-gray-100 font-semibold px-12 py-2 rounded-lg"
            form="create-typeform"
            onClick={() => {
              sessionStorage.setItem('showToast', '1');
            }}
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
