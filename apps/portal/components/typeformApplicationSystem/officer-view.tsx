import { useState } from 'react';
import Router from 'next/router';
import ACMButton from '../PortalButton';
import { gql, useMutation, useQuery } from 'urql';
import { useForm } from 'react-hook-form';
import {
  renderTypeformView,
  renderTypeformEdit,
  renderTypeformCreate,
} from './update-application-form';
import { EditableApplicationCard, CreateApplicationCard } from './application-card';
import { TypeformApplication } from '@prisma/client';

export default function OfficerView({ typeformApplications, isOfficer }) {
  const [formEditMode, setFormEditMode] = useState(false);
  const [formCreateMode, setFormCreateMode] = useState(false);
  const [currentApplicationData, setCurrentApplicationData] = useState<TypeformApplication>(
    {} as TypeformApplication,
  );

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
  const [__, createTypeformApplication] = useMutation<any>(CREATE_TYPEFORM_APPLICATION);
  const [___, deleteTypeformApplication] = useMutation<any>(DELETE_TYPEFORM_APPLICATION);

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

  return (
    <div>
      <div>
        <div>
          <div className="flex justify-start pt-4">
            <p className="text-white text-2xl font-light">Create Application</p>
          </div>
          <CreateApplicationCard
            setCurrentApplicationData={setCurrentApplicationData}
            setFormCreateMode={setFormCreateMode}
            formCreateMode={formCreateMode}
            setFormEditMode={setFormEditMode}
          />
        </div>
        {formCreateMode && (
          <div>
            <div className="w-full grid place-items-center">
              <div className="flex flex-col p-10 place-items-center">
                <div className="text-2xl font-semibold text-gray-100">
                  Create Typeform Application
                </div>
              </div>
              <div className="w-full">
                {renderTypeformCreate(
                  handleSubmit,
                  register,
                  createTypeformApplication,
                  currentApplicationData,
                )}
              </div>
            </div>
            <div className="grid grid-cols-3 gap-x-16 px-16">
              <button
                type="submit"
                className="bg-purple-600 text-gray-100 font-semibold p-2 rounded-lg"
                form="create-typeform"
              >
                save
              </button>
              <button
                className="text-gray-100 font-semibold p-2 rounded-lg"
                onClick={() => {
                  setFormEditMode(false);
                  setCurrentApplicationData({} as TypeformApplication);
                }}
              >
                cancel
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="flex justify-start pt-16">
        <p className="text-white text-2xl font-light">Edit Applications</p>
      </div>
      <div className="py-8">
        <div className="w-full grid grid-cols-3 gap-x-16 gap-y-16 place-items-center">
          {typeformApplications.map((application) => (
            <EditableApplicationCard
              application={application}
              currentApplication={currentApplicationData}
              setCurrentApplication={setCurrentApplicationData}
              setFormCreateMode={setFormCreateMode}
              setFormEditMode={setFormEditMode}
            />
          ))}
        </div>
      </div>
      {formEditMode && (
        <div>
          <div className="w-full grid place-items-center">
            <div className="flex flex-col p-10 place-items-center">
              <div className="text-4xl font-semibold text-gray-100">
                Update Typeform Application
              </div>
            </div>
            <div className="w-full">
              {renderTypeformEdit(
                handleSubmit,
                register,
                currentApplicationData.id,
                updateTypeformApplication,
                currentApplicationData,
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
            <button
              className="text-gray-100 font-semibold p-2 rounded-lg"
              onClick={() => {
                setFormEditMode(false);
                setCurrentApplicationData({} as TypeformApplication);
              }}
            >
              cancel
            </button>
            <button
              className="bg-purple-600 text-gray-100 font-semibold p-2 rounded-lg"
              onClick={() => {
                console.log(currentApplicationData.id);
                deleteTypeformApplication({
                  where: {
                    id: currentApplicationData.id,
                  },
                }).then(() => {
                  setFormEditMode(false);
                  setCurrentApplicationData({} as TypeformApplication);
                  Router.push('/opportunities');
                });
              }}
            >
              delete application
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
