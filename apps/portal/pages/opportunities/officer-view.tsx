import { useState } from 'react';
import { ACMButton } from '@acmutd/acm-ui';
import { gql, useMutation, useQuery } from 'urql';
import { useForm } from 'react-hook-form';
import {
  renderTypeformView,
  renderTypeformEdit,
  renderTypeformCreate,
} from './update-application-form';
import { EditableApplicationCard } from './application-card';
import { GetCurrentApplication } from './get-applications';
import { TypeformApplication } from '@prisma/client';

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
          equals: '633a1ae4e398aaeb1cc48bcd',
        },
      },
    },
  });

  const { data, fetching, error } = currentTypeformApplication;
  if (fetching) return <p className="text-gray-100">loading...</p>;
  if (error) return <p className="text-gray-100">whoops... {error.message}</p>;

  const id = '633a1ae4e398aaeb1cc48bcd';
  //const currentApplicationData = GetCurrentApplication(id).typeformApplications[0];
  const currentApplicationData = data.typeformApplications[0];

  return (
    <div>
      <div className="w-full grid grid-cols-3 gap-y-16 place-items-center">
        {typeformApplications.map((application) => (
          <div className="bg-gray-200/10 rounded-3xl p-6 w-80 h-48 space-y-2">
            <div className="h-24 space-y-2">
              <div className="flex flex-row">
                <p className="text-xl text-white font-bold basis-3/4">{application.typeformName}</p>
                <p
                  className="text-white text-sm hover:text-bold basis-1/8 pr-4"
                  onClick={(event) => {
                    //renderTypeformView(data.typeformApplications[0])
                    alert(event.currentTarget.textContent);
                  }}
                >
                  E
                </p>
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
          {formEditMode
            ? renderTypeformEdit(
                handleSubmit,
                register,
                id,
                updateTypeformApplication,
                currentApplicationData,
              )
            : renderTypeformView(currentApplicationData)}
        </div>
      </div>
    </div>
  );
}
