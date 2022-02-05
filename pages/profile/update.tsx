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
    <div className=" flex flex-col justify-center items-center">
      <button
        type="button"
        className="p-3 rounded-lg bg-green-400"
        onClick={() => signOut({ callbackUrl: `${window.location.origin}` })}
      >
        Sign out
      </button>
      <div className="flex flex-col w-[20%]">
        <form
          onSubmit={handleSubmit((vals) => {
            setResult(vals);
            addUser();
            window.location.href = '/';
          })}
        >
          <input
            name="firstName"
            {...register('firstName', {
              required: 'Enter your First Name.',
              pattern: {
                // ok but this also matches symbols????
                value: /\b[^\d]+\b/gi,
                // message: "Unless you are Elon Musk"s child, names do not contain numbers."
                message: 'Names should not contain numbers.',
              },
            })}
            placeholder="First name"
          />
          <div className="text-xs text-red-600">{errors.firstName && errors.firstName.message}</div>

          <input
            name="lastName"
            {...register('lastName', {
              required: 'Enter your surname.',
            })}
            placeholder="Last name"
          />
          <div className="text-xs text-red-600">{errors.lastName && errors.lastName.message}</div>

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

          <input
            name="major"
            {...register('major', {
              required: 'What is your major?',
              pattern: /\b[\w]*\b/g,
            })}
            placeholder="Major"
          />
          <div className="text-xs text-red-600">{errors.major && errors.major.message}</div>

          <select name="classStanding" {...register('classStanding')} placeholder="classification">
            <option value="Freshman">Freshman</option>
            <option value="Sophomore">Sophomore</option>
            <option value="Junior">Junior</option>
            <option value="Senior">Senior</option>
            <option value="Professor">Professor</option>
            <option value="Sponsor">Sponsor</option>
            <option value="Graduate">Graduate</option>
          </select>

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

          <input
            name="semester"
            {...register('semester', {
              required: 'What semester are you graduating? (Spring / Summer / Fall)',
            })}
            placeholder="Graduation Semester"
          />
          <div className="text-xs text-red-600">{errors.semester && errors.semester.message}</div>

          <label htmlFor="studentcheck">Are you a UTD Student? </label>
          <input id="studentcheck" name="utdStudent" type="checkbox" {...register('utdStudent')} />

          <input type="submit" className="cursor-pointer bg-slate-200 rounded-sm" />
        </form>
      </div>
    </div>
  );
}
export default Onboarding;
