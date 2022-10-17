import { useState } from 'react';
import ProfileField from 'components/ProfileField';
import Router from 'next/router';
import { TypeformApplication } from '@prisma/client';

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
        <ProfileField label="externalResourceUrl" text={typeformApplication.externalResourceUrl} />
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

function renderTypeformEdit(
  handleSubmit,
  register,
  id,
  updateTypeformApplication,
  currentApplicationData,
): JSX.Element {
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

function renderTypeformCreate(
  handleSubmit,
  register,
  updateTypeformApplication,
  currentApplicationData,
): JSX.Element {
  return (
    <div className="">
      <form
        id="update-typeform"
        className="justify-between min-h-full h-full"
        onSubmit={handleSubmit((vals) => {
          updateTypeformApplication({
            create: {
              active: vals.active,
              description: vals.description,
              endpoint: vals.endpoint,
              externalResourceUrl: vals.externalResourceUrl,
              typeformId: vals.typeformId,
              typeformName: vals.typeformName,
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

export { renderTypeformView, renderTypeformEdit, renderTypeformCreate };
