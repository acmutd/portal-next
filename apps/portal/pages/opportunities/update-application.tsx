import { useState } from 'react';
import { ACMButton } from '@acmutd/acm-ui';
import { gql, useMutation, useQuery } from 'urql';
import { PopupButton } from '@typeform/embed-react';
import ProfileField from 'components/ProfileField';
import { TypeformApplication } from '@prisma/client';
import { useForm } from 'react-hook-form';
import Router from 'next/router';
import { GetCurrentApplication } from './get-active-applications';

export default function EditApplications({ typeformApplications, isOfficer }) {
  const [formEditMode, setFormEditMode] = useState(false);

  const UPDATE_TYPEFORM_APPLICATION = gql`
    mutation CreateTypeformApplication(
      $create: TypeformApplicationCreateInput!
      $update: TypeformApplicationUpdateInput!
      $where: TypeformApplicationWhereUniqueInput!
    ) {
      createTypeformApplication(data: $create) {
        id
        active
        description
        endpoint
        externalResourceUrl
        typeformId
        typeformName
      }
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

  const [_, updateTypeformApplication] = useMutation<any>(UPDATE_TYPEFORM_APPLICATION);

  type formInputs = {
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
  } = useForm<formInputs>();

  // const data = GetCurrentApplication('633a1ae4e398aaeb1cc48bcd');
  const id = '633a1ae4e398aaeb1cc48bcd';
  const CURRENT_APPLICATION = gql`
    query Query($where: TypeformApplicationWhereInput) {
      typeformApplications(where: $where) {
        id
        active
        typeformId
        typeformName
        description
        endpoint
        externalResourceUrl
      }
    }
  `;

  const [currentTypeformApplication, reexecuteQuery] = useQuery({
    query: CURRENT_APPLICATION,
    variables: {
      where: {
        id: {
          equals: id,
        },
      },
    },
  });

  const { data, fetching, error } = currentTypeformApplication;
  if (fetching) return <p className="text-gray-100">loading...</p>;
  if (error) return <p className="text-gray-100">whoops... {error.message}</p>;
  const currentApplicationData = data.typeformApplications[0];

  return (
    <div>
      <div className="w-full grid grid-cols-3 gap-y-16 place-items-center">
        {typeformApplications.map((application) => (
          <div className="bg-gray-200/10 rounded-3xl p-6 w-80 h-48 space-y-2">
            <div className="h-24 space-y-2">
              <div className="flex flex-row">
                <p className="text-xl text-white font-bold basis-3/4">{application.typeformName}</p>
                <p className="text-white text-sm hover:text-bold basis-1/8">E</p>
                <p className="text-white text-sm basis-1/8">D</p>
              </div>
              <p className="text-white text-sm">{application.description}</p>
            </div>
            <div className="relative">
              {isOfficer ? <p>Set active</p> : <p>Set as not active</p>}
            </div>
          </div>
        ))}
      </div>
      <div className="w-full grid place-items-center">
        <div className="flex flex-col p-10 place-items-center">
          <div className="text-3xl font-semibold text-gray-100">Typeform Application</div>
          <div className="m-3">
            <ACMButton
              theme="dark"
              onClick={() => {
                setFormEditMode(!formEditMode);
              }}
            >
              Edit
            </ACMButton>
          </div>
        </div>
        <div className="flex flex-col md:flex-row-reverse w-full md:w-[50%]">
          <div className="flex flex-col place-items-center">
            <img src="assets/acm/mrpeechi.png" alt="acm mascot" />
            {formEditMode && (
              <button
                type="submit"
                className="bg-purple-600 text-gray-100 font-semibold p-2 rounded-lg"
                form="update-typeform"
              >
                Save
              </button>
            )}
          </div>
          {formEditMode ? renderTypeformEdit() : renderTypeformView(data.typeformApplications[0])}
        </div>
      </div>
    </div>
  );

  function renderTypeformView(typeformApplication: TypeformApplication): JSX.Element {
    if (!typeformApplication) return <p className="text-gray-100">please select an application</p>;
    return (
      // view mode
      <div className="flex w-1/2 flex-wrap mb-6">
        <div className="w-full md:w-1/2 px-3">
          <label className="block text-gray-200 font-semibold mb-2">active</label>
          <div className="appearance-none block w-full text-gray-100 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white">
            {typeformApplication.active.toString()}
          </div>
        </div>
        <div className="w-full md:w-1/2 px-3">
          <ProfileField label="description" text={typeformApplication.description} />
        </div>
        <div className="w-full px-3">
          <ProfileField label="endpoint" text={typeformApplication.endpoint} />
        </div>
        <div className="w-full px-3">
          <ProfileField
            label="externalResourceUrl"
            text={typeformApplication.externalResourceUrl}
          />
        </div>
        <div className="w-full px-3">
          <ProfileField label="typeformId" text={typeformApplication.typeformId} />
        </div>
        <div className="w-full px-3">
          <ProfileField label="typeformName" text={typeformApplication.typeformName} />
        </div>
      </div>
    );
  }

  function renderTypeformEdit(): JSX.Element {
    return (
      <div className="">
        <form
          id="update-typeform"
          className="justify-between min-h-full h-full"
          onSubmit={handleSubmit((vals) => {
            updateTypeformApplication({
              where: {
                id: id,
              },
              create: {
                active: vals.active,
                description: vals.description,
                endpoint: vals.endpoint,
                externalResourceUrl: vals.externalResourceUrl,
                typeformId: vals.typeformId,
                typeformName: vals.typeformName,
              },
              update: {
                active: {
                  set: vals.active,
                },
                description: {
                  set: vals.description,
                },
                endpoint: {
                  set: vals.endpoint,
                },
                externalResourceUrl: {
                  set: vals.externalResourceUrl,
                },
                typeformId: {
                  set: vals.typeformId,
                },
                typeformName: {
                  set: vals.typeformName,
                },
              },
            }).then(() => {
              Router.push('/');
            });
          })}
        >
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block text-gray-200 font-semibold mb-2">Status</label>
              <input
                className="appearance-none block w-full text-gray-100 rounded py-3 px-4 mb-3 leading-tight focus:outline-none bg-transparent border border-gray-600"
                type="checkbox"
                defaultChecked={currentApplicationData ? currentApplicationData.active : false}
                {...register('active')}
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label className="block text-gray-200 font-semibold mb-2">Description</label>
              <input
                className="appearance-none block w-full text-gray-100 rounded py-3 px-4 mb-3 leading-tight focus:outline-none bg-transparent border border-gray-600"
                type="text"
                defaultValue={currentApplicationData ? currentApplicationData.description : ''}
                {...register('description')}
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label className="block text-gray-200 font-semibold mb-2">Endpoint</label>
              <input
                className="appearance-none block w-full text-gray-100 rounded py-3 px-4 mb-3 leading-tight focus:outline-none bg-transparent border border-gray-600"
                type="text"
                defaultValue={currentApplicationData ? currentApplicationData.endpoint : ''}
                {...register('endpoint')}
              />
            </div>

            <div className="w-full px-3">
              <label className="block text-gray-200 font-semibold mb-2">External URL</label>
              <input
                className="appearance-none block w-full text-gray-100 rounded py-3 px-4 mb-3 leading-tight focus:outline-none bg-transparent border border-gray-600"
                type="text"
                defaultValue={
                  currentApplicationData ? currentApplicationData.externalResourceUrl : ''
                }
                {...register('externalResourceUrl')}
              />
            </div>
            <div className="w-full px-3">
              <label className="block text-gray-200 font-semibold mb-2">Typeform ID</label>
              <input
                className="appearance-none block w-full text-gray-100 rounded py-3 px-4 mb-3 leading-tight focus:outline-none bg-transparent border border-gray-600"
                type="text"
                defaultValue={currentApplicationData ? currentApplicationData.typeformId : ''}
                {...register('typeformId')}
              />
            </div>
            <div className="w-full px-3">
              <label className="block text-gray-200 font-semibold mb-2">Typeform Name</label>
              <input
                className="appearance-none block w-full text-gray-100 rounded py-3 px-4 mb-3 leading-tight focus:outline-none bg-transparent border border-gray-600"
                type="text"
                defaultValue={currentApplicationData ? currentApplicationData.typeformName : ''}
                {...register('typeformName')}
              />
            </div>
          </div>
        </form>
      </div>
    );
  }
}
