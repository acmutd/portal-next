import type { Profile, UpsertOneProfileArgs } from '@generated/type-graphql';
import type { ReactHookFormProps } from 'lib/types/form';
import type { MutationFunctionType } from 'lib/types/graphql';

type UpdateProfileMutationType = MutationFunctionType<UpsertOneProfileArgs | undefined, void>;

interface ProfileEditViewProps extends ReactHookFormProps<Profile> {
  profile?: Profile;
  updateProfile: UpdateProfileMutationType;
  userId: string;
  userEmail: string;
  onUpdateFormCompleted: (obj: Awaited<ReturnType<UpdateProfileMutationType>>) => void;
}

export default function ProfileEditView({
  handleSubmit,
  register,
  profile,
  updateProfile,
  userId,
  userEmail,
  onUpdateFormCompleted,
}: ProfileEditViewProps) {
  // TODO: Handle possibility of `profile` being undefined
  return (
    <>
      <div className="">
        <form
          id="profile-form"
          className="w-full max-w-lg"
          onSubmit={handleSubmit((vals) => {
            updateProfile({
              where: {
                netid: vals.netid || profile!.netid,
              },
              create: {
                user: {
                  connect: {
                    id: userId,
                  },
                },
                firstName: vals.firstName,
                lastName: vals.lastName,
                email: userEmail,
                netid: vals.netid,
                classStanding: vals.classStanding,
                major: vals.major,
                utdStudent: vals.utdStudent,
                membershipStatus: false,
                resume: false,
              },
              update: {
                firstName: {
                  set: vals.firstName || profile!.firstName,
                },
                lastName: {
                  set: vals.lastName || profile!.lastName,
                },
                netid: {
                  set: vals.netid || profile!.netid,
                },
                classStanding: {
                  set: vals.classStanding || profile!.classStanding,
                },
                major: {
                  set: vals.major || profile!.major,
                },
                utdStudent: {
                  set: vals.utdStudent || profile!.utdStudent,
                },
              },
            })
              .then((operationResult) => {
                onUpdateFormCompleted(operationResult);
              })
              .catch((err) => {
                alert(err);
              });
          })}
        >
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block text-gray-200 font-semibold mb-2">first name</label>
              <input
                className="appearance-none block w-full text-gray-100 rounded py-3 px-4 mb-3 leading-tight focus:outline-none bg-transparent border border-gray-600"
                id="grid-first-name"
                placeholder={profile?.firstName || ''}
                {...register('firstName')}
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label className="block text-gray-200 font-semibold mb-2">last name</label>
              <input
                className="appearance-none block w-full text-gray-100 rounded py-3 px-4 mb-3 leading-tight focus:outline-none bg-transparent border border-gray-600"
                id="grid-last-name"
                type="text"
                placeholder={profile?.lastName || ''}
                {...register('lastName')}
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label className="block text-gray-200 font-semibold mb-2">email</label>
              <input
                className="appearance-none block w-full text-gray-100 rounded py-3 px-4 mb-3 leading-tight focus:outline-none bg-transparent border border-gray-600"
                type="text"
                placeholder={profile?.email || ''}
                {...register('email')}
              />
            </div>

            <div className="w-full px-3">
              <label className="block text-gray-200 font-semibold mb-2">netID</label>
              <input
                className="appearance-none block w-full text-gray-100 rounded py-3 px-4 mb-3 leading-tight focus:outline-none bg-transparent border border-gray-600"
                type="text"
                placeholder={profile?.netid || ''}
                {...register('netid')}
              />
            </div>
            <div className="w-full px-3">
              <label className="block text-gray-200 font-semibold mb-2">class standing</label>
              <input
                className="appearance-none block w-full text-gray-100 rounded py-3 px-4 mb-3 leading-tight focus:outline-none bg-transparent border border-gray-600"
                type="text"
                placeholder={profile?.classStanding || ''}
                {...register('classStanding')}
              />
            </div>
            <div className="w-full px-3">
              <label className="block text-gray-200 font-semibold mb-2">major</label>
              <input
                className="appearance-none block w-full text-gray-100 rounded py-3 px-4 mb-3 leading-tight focus:outline-none bg-transparent border border-gray-600"
                type="text"
                placeholder={profile?.major || ''}
                {...register('major')}
              />
            </div>
          </div>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3"></div>
            <label className="md:w-2/3 block text-gray-500 font-bold">
              <input className="mr-2 leading-tight" type="checkbox" {...register('utdStudent')} />
              <span className="text-sm">utd student</span>
            </label>
          </div>
        </form>
      </div>
    </>
  );
}
