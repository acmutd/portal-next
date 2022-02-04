import { gql, useMutation } from '@apollo/client';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

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
  // { errors }
  const { register, handleSubmit } = useForm();
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

  useEffect(() => {
    console.log(result);
    console.log(session);
  }, [result]);

  return (
    <div className="flex flex-col w-full">
      <form
        onSubmit={handleSubmit((vals) => {
          setResult(vals);
          addUser();
        })}
      >
        <input {...register('firstName', { required: true })} placeholder="First name" />
        <input {...register('lastName', { required: true })} placeholder="Last name" />
        <input {...register('netid', { required: true })} placeholder="NetId" />
        <input {...register('major', { required: true })} placeholder="major" />
        <select {...register('classStanding', { required: true })} placeholder="classification">
          <option value="Freshman">Freshman</option>
          <option value="Sophomore">Sophomore</option>
          <option value="Junior">Junior</option>
          <option value="Senior">Senior</option>
          <option value="Professor">Professor</option>
          <option value="Sponsor">Sponsor</option>
          <option value="Graduate5">Graduate</option>
        </select>
        <input {...register('year', { required: true })} placeholder="Graduation Year" />
        <input {...register('semester', { required: true })} placeholder="Graduation Semester" />
        <input id="are_u_utd" type="checkbox" {...register('utdStudent', { required: true })} />
        <input type="submit" />
      </form>
    </div>
  );
}
export default Onboarding;
