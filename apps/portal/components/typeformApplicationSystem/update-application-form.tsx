import { useState } from 'react';
import ProfileField from '../ProfileField';
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
  console.log({ currentApplicationData });
  return (
    <div className="pb-16">
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
            Router.push('/opportunities');
          });
        })}
      >
        <div className="flex flex-wrap gap-8 -mx-3 mb-6">
          <div className="grid gap-y-4 w-full px-3">
            <label className="block text-2xl text-gray-200 font-semibold mb-2">status</label>
            <input
              className="appearance-none block w-full text-gray-100 rounded-2xl py-3 px-4 mb-3 leading-tight focus:outline-none bg-transparent border border-gray-300"
              type="checkbox"
              defaultChecked={currentApplicationData ? currentApplicationData.active : false}
              {...register('active')}
            />
          </div>
          <div className="grid gap-y-4 w-full px-3">
            <label className="block text-2xl text-gray-200 font-semibold mb-2">description</label>
            <input
              className="appearance-none block w-full text-gray-100 rounded-2xl py-3 px-4 mb-3 leading-tight focus:outline-none bg-transparent border border-gray-300"
              type="text"
              defaultValue={currentApplicationData ? currentApplicationData.description : ''}
              {...register('description')}
            />
          </div>
          <div className="grid gap-y-4 w-full px-3">
            <label className="block text-2xl text-gray-200 font-semibold mb-2">endpoint</label>
            <input
              className="appearance-none block w-full text-gray-100 rounded-2xl py-3 px-4 mb-3 leading-tight focus:outline-none bg-transparent border border-gray-300"
              type="text"
              defaultValue={currentApplicationData ? currentApplicationData.endpoint : ''}
              {...register('endpoint')}
            />
          </div>

          <div className="grid gap-y-4 w-full px-3">
            <label className="block text-2xl text-gray-200 font-semibold mb-2">external URL</label>
            <input
              className="appearance-none block w-full text-gray-100 rounded-2xl py-3 px-4 mb-3 leading-tight focus:outline-none bg-transparent border border-gray-300"
              type="text"
              defaultValue={
                currentApplicationData ? currentApplicationData.externalResourceUrl : ''
              }
              {...register('externalResourceUrl')}
            />
          </div>
          <div className="grid gap-y-4 w-full px-3">
            <label className="block text-2xl text-gray-200 font-semibold mb-2">typeform ID</label>
            <input
              className="appearance-none block w-full text-gray-100 rounded-2xl py-3 px-4 mb-3 leading-tight focus:outline-none bg-transparent border border-gray-300"
              type="text"
              defaultValue={currentApplicationData ? currentApplicationData.typeformId : ''}
              {...register('typeformId')}
            />
          </div>
          <div className="grid gap-y-4 w-full px-3">
            <label className="block text-2xl text-gray-200 font-semibold mb-2">typeform Name</label>
            <input
              className="appearance-none block w-full text-gray-100 rounded-2xl py-3 px-4 mb-3 leading-tight focus:outline-none bg-transparent border border-gray-300"
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

function renderTypeformCreate(handleSubmit, register, updateTypeformApplication): JSX.Element {
  return (
    <div className="flex justify-center md:flex-row-reverse w-full md:w-[50%]">
      <form
        id="create-typeform"
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
            Router.push('/opportunities');
          });
        })}
      >
        <div className="flex flex-wrap gap-8 -mx-3 mb-6">
          <div className="grid gap-y-4 w-full px-3">
            <label className="block text-gray-200 font-semibold mb-2">Status</label>
            <input
              className="appearance-none block w-full text-gray-100 rounded-2xl py-3 px-4 mb-3 leading-tight focus:outline-none bg-transparent border border-gray-300"
              type="checkbox"
              defaultChecked={false}
              {...register('active')}
            />
          </div>
          <div className="grid gap-y-4 w-full px-3">
            <label className="block text-2xl text-gray-200 font-semibold mb-2">Description</label>
            <input
              className="appearance-none block w-full text-gray-100 rounded-2xl py-3 px-4 mb-3 leading-tight focus:outline-none bg-transparent border border-gray-300"
              type="text"
              {...register('description')}
            />
          </div>
          <div className="grid gap-y-4 w-full px-3">
            <label className="block text-2xl text-gray-200 font-semibold mb-2">Endpoint</label>
            <input
              className="appearance-none block w-full text-gray-100 rounded-2xl py-3 px-4 mb-3 leading-tight focus:outline-none bg-transparent border border-gray-300"
              type="text"
              {...register('endpoint')}
            />
          </div>
          <div className="grid gap-y-4 w-full px-3">
            <label className="block text-2xl text-gray-200 font-semibold mb-2">External URL</label>
            <input
              className="appearance-none block w-full text-gray-100 rounded-2xl py-3 px-4 mb-3 leading-tight focus:outline-none bg-transparent border border-gray-300"
              type="text"
              {...register('externalResourceUrl')}
            />
          </div>
          <div className="grid gap-y-4 w-full px-3">
            <label className="block text-2xl text-gray-200 font-semibold mb-2">Typeform ID</label>
            <input
              className="appearance-none block w-full text-gray-100 rounded-2xl py-3 px-4 mb-3 leading-tight focus:outline-none bg-transparent border border-gray-300"
              type="text"
              {...register('typeformId')}
            />
          </div>
          <div className="grid gap-y-4 w-full px-3">
            <label className="block text-2xl text-gray-200 font-semibold mb-2">Typeform Name</label>
            <input
              className="appearance-none block w-full text-gray-100 rounded-2xl py-3 px-4 mb-3 leading-tight focus:outline-none bg-transparent border border-gray-300"
              type="text"
              {...register('typeformName')}
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export { renderTypeformView, renderTypeformEdit, renderTypeformCreate };
