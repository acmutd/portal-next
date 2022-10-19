import { useForm, Controller } from 'react-hook-form';
import { gql, useMutation } from 'urql';
import { VanityLink, CreateVanityLinkArgs } from '@generated/type-graphql';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const CREATE_VANITY_LINK = gql`
  mutation CreateVanityLink($data: VanityLinkCreateInput!) {
    createVanityLink(data: $data) {
      originalUrl
      vanityDomain
      slashtag
    }
  }
`;

const vanityDomainOptions = ['content', 'survey', 'apply', 'rsvp', 'join'];

const ActiveOptionButton = styled(motion.button)`
  background: linear-gradient(90deg, transparent 0%, #3952d7 0%, #31d372 100%);
`;

const InactiveOptionButton = styled(motion.button)`
  border: solid 2px transparent;
  background-image: linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 0)),
    linear-gradient(101deg, #3952d7, #31d372);
  background-origin: border-box;
  background-clip: content-box, border-box;
  color: white;
  box-shadow: 2px 1000px 1px rgb(24 24 27) inset;
`;

export default function VanityForm() {
  const { register, handleSubmit, control, setValue } = useForm<Omit<VanityLink, 'id'>>({
    defaultValues: {
      vanityDomain: 'content',
    },
  });
  const [_, createVanityLink] = useMutation<{ createVanityLink: VanityLink }, CreateVanityLinkArgs>(
    CREATE_VANITY_LINK,
  );

  return (
    <div className="w-full grid place-items-center px-3">
      <div className="flex flex-col p-10 place-items-center">
        <div className="text-3xl font-semibold text-gray-100">create a vanity link</div>
      </div>
      <div className="flex flex-col md:flex-row-reverse w-full md:w-[50%]">
        <form
          className="w-full"
          onSubmit={handleSubmit(async (vals) => {
            try {
              const { error } = await createVanityLink({
                data: vals,
              });
              if (error) throw error;
              alert('Vanity Link Generated');
            } catch (error) {
              alert('Failed to generate vanity link!');
              console.error(error);
            }
          })}
        >
          <div className="flex flex-col gap-y-8">
            <div className="flex flex-col gap-y-2 w-full px-3 mb-6">
              <label className="text-2xl block text-gray-200 font-semibold mb-2">
                original link
              </label>
              <p className="text-gray-200">This could be a zoom link, drive shortcut, anything</p>
              <input
                className="appearance-none block w-full text-gray-100 rounded-2xl py-3 px-4 mb-3 leading-tight focus:outline-none bg-transparent border border-gray-600"
                placeholder="https://acmutd.co/"
                {...register('originalUrl')}
              />
            </div>
            <div className="flex flex-col gap-y-2 w-full px-3 mb-6">
              <label className="text-2xl block text-gray-200 font-semibold mb-2">
                vanity domain
              </label>
              <p className="text-gray-200">
                This is what goes at the beginning, eg. content.acmutd.co or survey.acmutd.co
              </p>
              <Controller
                name="vanityDomain"
                control={control}
                render={({ field }) => (
                  <div className="flex gap-x-3">
                    {vanityDomainOptions.map((option, idx) =>
                      option === field.value ? (
                        <ActiveOptionButton
                          onClick={() => {
                            setValue('vanityDomain', option);
                          }}
                          type="button"
                          key={idx}
                          className="rounded-lg p-2 text-white"
                          whileHover={{ scale: 1.1 }}
                        >
                          {option}
                        </ActiveOptionButton>
                      ) : (
                        <InactiveOptionButton
                          onClick={() => {
                            setValue('vanityDomain', option);
                          }}
                          type="button"
                          key={idx}
                          className="p-2 text-white rounded-lg"
                          whileHover={{ scale: 1.1 }}
                        >
                          {option}
                        </InactiveOptionButton>
                      ),
                    )}
                  </div>
                )}
              ></Controller>
            </div>
            <div className="flex flex-col gap-y-2 w-full px-3 mb-6">
              <label className="text-2xl block text-gray-200 font-semibold mb-2">slashtag</label>
              <div>
                <p className="text-gray-200">What appears after content.acmutd.co/</p>
                <p className="text-gray-200">
                  Eg. mentor, mentee, projects, dev, research, industry
                </p>
              </div>
              <input
                className="appearance-none block w-full text-gray-100 rounded-2xl py-3 px-4 mb-3 leading-tight focus:outline-none bg-transparent border border-gray-600"
                placeholder="cool-slashtag"
                {...register('slashtag')}
              />
            </div>

            <div className="flex gap-x-2 p-3">
              <button
                className="bg-gradient-to-r from-pink-700 to-purple-700 text-center py-2 px-6 font-bold text-white"
                type="submit"
              >
                save
              </button>
              <a className=" text-center py-2 px-6 font-bold text-white" href="/">
                cancel
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
