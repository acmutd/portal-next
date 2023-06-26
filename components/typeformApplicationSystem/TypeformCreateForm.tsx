import Router from 'next/router';
import type { TypeformApplication } from '@generated/type-graphql';
import { useForm } from 'react-hook-form';
import { gqlQueries } from 'src/api';

export default function TypeformCreateForm(): JSX.Element {
  const { register, handleSubmit } = useForm<Omit<TypeformApplication, 'id'>>();
  return (
    <div className="flex justify-center md:flex-row-reverse w-full md:w-[50%]">
      <form
        id="create-typeform"
        className="justify-between min-h-full h-full"
        onSubmit={handleSubmit((vals) => {
          gqlQueries
            .createTypeformApplication({
              data: {
                active: true, // new typeforms should always be visible
                description: vals.description,
                endpoint: vals.endpoint,
                externalResourceUrl: vals.externalResourceUrl,
                typeformId: vals.typeformId,
                typeformName: vals.typeformName,
                division: vals.division,
              },
            })
            .then(() => {
              Router.push('/opportunities');
            });
        })}
      >
        <div className="flex flex-wrap gap-8 -mx-3 mb-6 text-gray-200">
          <div className="grid gap-y-4 w-full px-3">
            <label className="block text-2xl font-semibold mb-2">Typeform Name</label>
            <p>
              Provide the name of the original Typeform you wish to link to the Portal. Please make
              sure that a Typeform with this exact name (case sensitive) already exists before you
              fill out this form. Example: Spring 2022 Officer Application
            </p>
            <input
              className="appearance-none block w-full rounded-2xl py-3 px-4 mb-3 leading-tight focus:outline-none bg-transparent border border-gray-300"
              type="text"
              {...register('typeformName')}
            />
          </div>
          <div className="grid gap-y-4 w-full px-3">
            <label className="block text-2xl font-semibold mb-2">Description</label>
            <p>
              Attach a description to be used alongside your form in Portal. We recommend about 50
              words or a sentence and a half maximum. Example: Join the organizing team of the
              largest hackathon in Texas! The HackUTD organizing team has roles for logistics,
              marketing and more.
            </p>
            <input
              className="appearance-none block w-full rounded-2xl py-3 px-4 mb-3 leading-tight focus:outline-none bg-transparent border border-gray-300"
              type="text"
              {...register('description')}
            />
          </div>
          <div className="grid gap-y-4 w-full px-3">
            <label className="block text-2xl font-semibold mb-2">Endpoint</label>
            <p>
              Please enter a preferred name for the link that will be generated to render this
              application. Make sure you enter a single word with no special characters. For example
              if you enter "member-app-s22" then the application will be rendered at
              https://portal.acmutd.co/forms/member-app-s22
            </p>
            <input
              className="appearance-none block w-full rounded-2xl py-3 px-4 mb-3 leading-tight focus:outline-none bg-transparent border border-gray-300"
              type="text"
              {...register('endpoint')}
            />
          </div>
          <div className="grid gap-y-4 w-full px-3">
            <label className="block text-2xl font-semibold mb-2">External URL</label>
            <p>
              If you would like the "Learn More" button to redirect to additional resources, please
              enter a valid link here.
            </p>
            <input
              className="appearance-none block w-full rounded-2xl py-3 px-4 mb-3 leading-tight focus:outline-none bg-transparent border border-gray-300"
              type="text"
              {...register('externalResourceUrl')}
            />
          </div>
          <div className="grid gap-y-4 w-full px-3">
            <label className="block text-2xl font-semibold mb-2">Typeform ID</label>
            <input
              className="appearance-none block w-full  rounded-2xl py-3 px-4 mb-3 leading-tight focus:outline-none bg-transparent border border-gray-300"
              type="text"
              {...register('typeformId')}
            />
          </div>
          <div className="grid gap-y-4 w-full px-3">
            <label className="block text-2xl text-gray-200 font-semibold mb-2">Division</label>
            <select
              className="appearance-none block w-full text-gray-100 rounded-2xl py-3 px-4 mb-3 leading-tight focus:outline-none bg-transparent border border-gray-300"
              {...register('division')}
            >
              <option value="Development">Development</option>
              <option value="Research">Research</option>
              <option value="Media">Media</option>
              <option value="Projects">Projects</option>
              <option value="Education">Education</option>
              <option value="Community">Community</option>
              <option value="Hackutd">Hackutd</option>
              <option value="Industry">Industry</option>
            </select>
          </div>
        </div>
      </form>
    </div>
  );
}
