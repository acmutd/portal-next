import { useState } from 'react';
import ACMButton from '../PortalButton';
import { gql, useMutation, useQuery } from 'urql';
import { useForm } from 'react-hook-form';
import {
  renderTypeformView,
  renderTypeformEdit,
  renderTypeformCreate,
} from './update-application-form';
import { EditableApplicationCard } from './application-card';
import { TypeformApplication } from '@prisma/client';

export default function EditApplications({ typeformApplications, isOfficer }) {
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

  const [_, updateTypeformApplication] = useMutation<any>(UPDATE_TYPEFORM_APPLICATION);
  const [__, createTypeformApplication] = useMutation<any>(CREATE_TYPEFORM_APPLICATION);

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
        <div className="flex justify-end pr-16 py-4">
          <p
            className="text-white text-2xl font-light"
            onClick={() => {
              setCurrentApplicationData({} as TypeformApplication);
              setFormCreateMode(!formCreateMode);
              setFormEditMode(false);
            }}
          >
            Create
          </p>
        </div>
        {formCreateMode ? (
          <div className="w-full grid place-items-center">
            <div className="flex flex-col p-10 place-items-center">
              <div className="text-2xl font-semibold text-gray-100">
                Create Typeform Application
              </div>
            </div>
            <div className="flex flex-col md:flex-row-reverse w-full md:w-[50%]">
              <div className="flex flex-col place-items-center">
                <img src="assets/acm/mrpeechi.png" alt="acm mascot" />
                {formCreateMode && (
                  <button
                    type="submit"
                    className="bg-purple-600 text-gray-100 font-semibold p-2 rounded-lg"
                    form="create-typeform"
                  >
                    Save
                  </button>
                )}
              </div>
              {renderTypeformCreate(
                handleSubmit,
                register,
                createTypeformApplication,
                currentApplicationData,
              )}
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className="w-full grid grid-cols-3 gap-x-16 gap-y-16 py-8 place-items-center">
        {typeformApplications.map((application) => (
          <EditableApplicationCard
            application={application}
            currentApplication={currentApplicationData}
            setCurrentApplication={setCurrentApplicationData}
            setFormCreateMode={setFormCreateMode}
          />
        ))}
      </div>
      {Object.keys(currentApplicationData).length != 0 ? (
        <div className="w-full grid place-items-center">
          <div className="flex flex-col p-10 place-items-center">
            <div className="text-2xl font-semibold text-gray-100">Update Typeform Application</div>
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
            {formEditMode
              ? renderTypeformEdit(
                  handleSubmit,
                  register,
                  currentApplicationData.id,
                  updateTypeformApplication,
                  currentApplicationData,
                )
              : renderTypeformView(currentApplicationData)}
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
