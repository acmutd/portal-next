/* eslint-disable jsx-a11y/label-has-associated-control */
import { gql, useMutation } from '@apollo/client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { signOut, useSession } from 'next-auth/react';

const CREATE_USER = gql`
  mutation CreateProfile($profile: PartialProfile!) {
    createProfile(profile: $profile) {
      email
      firstName
      lastName
      graduation {
        semester
        year
      }
      classStanding
      _id
      major
      membershipStatus
    }
  }
`;

function Onboarding() {
  /**
   * Form for first time users of Portal.
   */

  // { errors }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [result, setResult] = useState<any>('');
  const { data: session } = useSession();

  // { data, loading, error }
  const [addUser] = useMutation(CREATE_USER, {
    variables: {
      profile: {
        email: session.user.email,
        firstName: result.firstName,
        graduation: {
          semester: result.semester,
          year: result.year,
        },
        lastName: result.lastName,
        classStanding: result.classStanding,
        major: result.major,
        netid: result.netid,
        user: session.id,
        utdStudent: result.utdStudent,
      },
    },
  });

  return (
    <>
      <button
        type="button"
        className="p-3 rounded-lg bg-green-400 absolute"
        onClick={() => signOut({ callbackUrl: `${window.location.origin}` })}
      >
        Sign out
      </button>
      <div className="w-screen h-screen grid place-items-center">
        <div className=" flex flex-col w-[45%] h-[450px]">
          <div className="text-xl">Create or Update Profile</div>

          <div className="flex flex-col">
            <form
              onSubmit={handleSubmit((vals) => {
                setResult(vals);
                addUser();
                window.location.href = '/';
              })}
              className="justify-between min-h-full h-full"
            >
              <input
                name="firstName"
                {...register('firstName', {
                  required: 'Enter your First Name.',
                  pattern: {
                    value: /\b[^0-9]+\b/gi,
                    message: 'Names should not contain numbers.',
                  },
                })}
                placeholder="First name"
              />
              <div className="text-xs text-red-600">
                {errors.firstName && errors.firstName.message}
              </div>

              <br />

              <input
                name="lastName"
                {...register('lastName', {
                  required: 'Enter your First Name.',
                  pattern: {
                    value: /\b[^0-9]+\b/gi,
                    message: 'Names should not contain numbers.',
                  },
                })}
                placeholder="Last name"
              />
              <div className="text-xs text-red-600">
                {errors.lastName && errors.lastName.message}
              </div>

              <br />

              <input
                name="netid"
                {...register('netid', {
                  required: 'Enter your netID.',
                  pattern: {
                    value: /[\D]{3}[\d]{6}/g,
                    message: 'Please enter a valid netID.',
                  },
                  maxLength: {
                    value: 9,
                    message: 'netID length is too long.',
                  },
                })}
                placeholder="NetID"
              />
              <div className="text-xs text-red-600">{errors.netid && errors.netid.message}</div>

              <br />

              <input
                name="major"
                {...register('major', {
                  required: 'What is your major?',
                })}
                placeholder="Major"
              />
              <div className="text-xs text-red-600">{errors.major && errors.major.message}</div>

              <br />

              <label htmlFor="classStanding" className="text-xs">
                Classification
                <br />
              </label>
              <select
                id="classStanding"
                name="classStanding"
                {...register('classStanding')}
                placeholder="classification"
              >
                <option value="Freshman">Freshman</option>
                <option value="Sophomore">Sophomore</option>
                <option value="Junior">Junior</option>
                <option value="Senior">Senior</option>
                <option value="Professor">Professor</option>
                <option value="Sponsor">Sponsor</option>
                <option value="Graduate">Graduate</option>
              </select>

              <br />
              <br />

              <input
                name="year"
                type="number"
                {...register('year', {
                  required: 'Enter the year of your graduation.',
                  maxLength: {
                    value: 4,
                    message: 'Please enter a valid year',
                  },
                })}
                placeholder="Graduation Year"
              />
              <div className="text-xs text-red-600">{errors.year && errors.year.message}</div>

              <br />

              <label htmlFor="semester" className="text-xs">
                Graduation Semester
                <br />
              </label>
              <select name="semester" id="semester" {...register('semester')}>
                <option value="Fall">Fall</option>
                <option value="Spring">Spring</option>
                <option value="Summer">Summer</option>
              </select>
              <div className="text-xs text-red-600">
                {errors.semester && errors.semester.message}
              </div>

              <br />

              <label htmlFor="studentcheck" className="text-xs">
                Are you a UTD Student?{' '}
              </label>
              <input
                id="studentcheck"
                name="utdStudent"
                type="checkbox"
                {...register('utdStudent')}
              />

              <br />

              <br />
              <input type="submit" className="cursor-pointer p-3 rounded-lg bg-green-400" />
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
export default Onboarding;
