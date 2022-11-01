import React from 'react';
import { TypeformApplication } from '@prisma/client';
import { PopupButton } from '@typeform/embed-react';
import {
  renderTypeformView,
  renderTypeformEdit,
  renderTypeformCreate,
} from './update-application-form';
import { gql, useMutation } from 'urql';
import Router from 'next/router';

export default function ApplicationCard({ application }) {
  return (
    <div className="bg-gray-200/10 rounded-3xl p-6 w-80 h-48 space-y-2">
      <div className="h-24 space-y-2">
        <p className="text-xl text-white font-bold">{application.typeformName}</p>
        <p className="text-white text-sm">{application.description}</p>
      </div>
      <div className="relative">
        <div className="bg-gradient-to-r from-pink-700 to-purple-700 text-center w-fit py-2 px-12 absolute right-0">
          <PopupButton id={application.typeformId} className="my-button">
            <p className="font-Gilroy text-white font-bold">apply</p>
          </PopupButton>
        </div>
      </div>
    </div>
  );
}

export function EditableApplicationCard({
  application,
  currentApplication,
  setCurrentApplication,
  setFormCreateMode,
}) {
  const DELETE_TYPEFORM_APPLICATION = gql`
    mutation DeleteTypeformApplication($where: TypeformApplicationWhereUniqueInput!) {
      deleteTypeformApplication(where: $where) {
        id
        typeformName
        description
      }
    }
  `;

  const [_, deleteTypeformApplication] = useMutation<any>(DELETE_TYPEFORM_APPLICATION);

  return (
    <div className="bg-gray-200/10 rounded-3xl p-6 w-80 h-48 space-y-2">
      <div className="h-24 space-y-2">
        <div className="flex flex-row">
          <p className="text-xl text-white font-bold basis-3/4">{application.typeformName}</p>
          <p
            className="text-white text-sm hover:text-bold basis-1/8 pr-4"
            onClick={(event) => {
              setCurrentApplication(application != currentApplication ? application : {});
              setFormCreateMode(false);
            }}
          >
            E
          </p>
          <p
            className="text-white text-sm basis-1/8"
            onClick={() => {
              console.log(application.id);
              deleteTypeformApplication({
                where: {
                  id: application.id,
                },
              }).then(() => {
                Router.push('/opportunities');
              });
            }}
          >
            D
          </p>
        </div>
        <p className="text-white text-sm">{application.description}</p>
      </div>
    </div>
  );
}
